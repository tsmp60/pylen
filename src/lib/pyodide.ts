export type Exercise = {
  id: string | number
  title: string
  unit?: string
  objective?: string
  concept?: string
  story?: string
  task?: string[]
  requiredOutput?: string[]
  conceptExplanation?: string
  storyChallenge?: string
  starterCode: string
  expectedOutputPattern?: string
  hints?: Array<{ level: string; text: string }>
  hintLevels?: string[]
  xpReward?: number
  assertions?: Array<{ type: string; expected?: string; name?: string }>
}

export type PythonExecutionResult = {
  ok: boolean
  stdout: string
  stderr: string
  output: string
}

export type ValidationResult = {
  passed: boolean
  output: string
}

type PendingExecution = {
  resolve: (result: PythonExecutionResult) => void
  reject: (error: Error) => void
}

function normalizePythonExecutionResult(
  value: PythonExecutionResult | string | undefined,
  fallbackOutput = 'Code ran successfully. No output was printed.',
): PythonExecutionResult {
  if (typeof value === 'string') {
    return {
      ok: true,
      stdout: value,
      stderr: '',
      output: value,
    }
  }

  if (value && typeof value === 'object') {
    return {
      ok: value.ok ?? true,
      stdout: value.stdout ?? '',
      stderr: value.stderr ?? '',
      output: value.output ?? value.stdout ?? fallbackOutput,
    }
  }

  return {
    ok: true,
    stdout: '',
    stderr: '',
    output: fallbackOutput,
  }
}

export class PyodideRuntime {
  public worker: Worker
  private pendingExecution: PendingExecution | null = null
  private executionTimeoutHandle: number | null = null
  private readonly executionTimeoutMs = 30000

  constructor(worker: Worker) {
    this.worker = worker

    this.worker.addEventListener('message', (event) => {
      const message = event.data as {
        type?: string
        text?: string
        prompt?: string
        ok?: boolean
        stdout?: string
        stderr?: string
        output?: string
        message?: string
      }

      if (message.type === 'stdout') {
        window.dispatchEvent(new CustomEvent('pylen:stdout', { detail: message.text ?? '' }))
        return
      }

      if (message.type === 'stderr') {
        window.dispatchEvent(new CustomEvent('pylen:stderr', { detail: message.text ?? '' }))
        return
      }

      if (message.type === 'input-request') {
        if (this.executionTimeoutHandle) {
          window.clearTimeout(this.executionTimeoutHandle)
          this.executionTimeoutHandle = null
        }

        window.dispatchEvent(
          new CustomEvent('pylen:input-request', {
            detail: { prompt: message.prompt ?? 'Input required:' },
          }),
        )
        return
      }

      if (message.type === 'result') {
        this.clearExecutionTimeout()

        const result: PythonExecutionResult = {
          ok: message.ok ?? true,
          stdout: message.stdout ?? '',
          stderr: message.stderr ?? '',
          output: message.output ?? '',
        }

        this.pendingExecution?.resolve(result)
        this.pendingExecution = null
        return
      }

      if (message.type === 'error') {
        this.clearExecutionTimeout()

        const error = new Error(message.message ?? 'Execution failed.')
        this.pendingExecution?.reject(error)
        this.pendingExecution = null
      }
    })
  }

  private clearExecutionTimeout() {
    if (this.executionTimeoutHandle) {
      window.clearTimeout(this.executionTimeoutHandle)
      this.executionTimeoutHandle = null
    }
  }

  private startExecutionTimeout() {
    this.clearExecutionTimeout()
    this.executionTimeoutHandle = window.setTimeout(() => {
      this.terminate()
      this.pendingExecution?.resolve({
        ok: false,
        stdout: '',
        stderr: 'Time Limit Exceeded: Execution terminated.',
        output: 'Time Limit Exceeded: Execution terminated.',
      })
      this.pendingExecution = null
      this.executionTimeoutHandle = null
    }, this.executionTimeoutMs)
  }

  async executeCode(code: string): Promise<PythonExecutionResult> {
    return new Promise((resolve, reject) => {
      this.pendingExecution = { resolve, reject }
      this.startExecutionTimeout()

      this.worker.postMessage({ type: 'run', code: code && code.trim() ? code : 'print("")' })
    })
  }

  async runPythonAsync(code: string): Promise<string> {
    const result = await this.executeCode(code)
    return result.output
  }

  provideInput(value: string): void {
    this.startExecutionTimeout()
    this.worker.postMessage({ type: 'stdin', value })
  }

  terminate(): void {
    this.clearExecutionTimeout()
    this.pendingExecution = null
    this.worker.terminate()
  }
}

let pyodideInstance: PyodideRuntime | null = null

export function resetPyodideRuntime(): void {
  if (pyodideInstance) {
    pyodideInstance.terminate()
  }

  pyodideInstance = null
}

export async function ensurePyodide(): Promise<PyodideRuntime> {
  if (pyodideInstance) {
    return pyodideInstance
  }

  try {
    const worker = new Worker(new URL('../workers/pyodideWorker.ts', import.meta.url), {
      type: 'module',
    })

    const stdinBuffer = new SharedArrayBuffer(4096)
    const stdinState = new SharedArrayBuffer(8)
    const state = new Int32Array(stdinState)
    Atomics.store(state, 0, 0)
    Atomics.store(state, 1, 0)

    worker.postMessage({ type: 'init', stdinBuffer, stdinState })

    pyodideInstance = new PyodideRuntime(worker)
    return pyodideInstance
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load Pyodide worker.'
    throw new Error(`Pyodide failed to initialize: ${message}`)
  }
}

export async function executePythonCode(
  code: string,
  runtime: Partial<PyodideRuntime> & { runPythonAsync?: (code: string) => Promise<string | PythonExecutionResult>; executeCode?: (code: string) => Promise<PythonExecutionResult | string> },
): Promise<PythonExecutionResult> {
  const safeCode = code && code.trim() ? code : 'print("")'

  if (typeof runtime.runPythonAsync === 'function') {
    const value = await runtime.runPythonAsync(safeCode)
    return normalizePythonExecutionResult(value)
  }

  if (typeof runtime.executeCode === 'function') {
    const value = await runtime.executeCode(safeCode)
    return normalizePythonExecutionResult(value)
  }

  throw new Error('Execution engine not ready')
}

export async function validateExercise(
  code: string,
  exercise: { expectedOutputPattern: string },
  runtime: PyodideRuntime,
): Promise<ValidationResult> {
  const execution = await executePythonCode(code, runtime)

  if (!execution.ok) {
    return {
      passed: false,
      output: execution.output,
    }
  }

  const { outputMatches } = await import('./validateOutput')
  const actual = execution.stdout
  const expected = exercise.expectedOutputPattern

  const passed = outputMatches(expected, actual)

  return {
    passed,
    output: passed
      ? 'Nice work. Your output matches the expected result.'
      : 'Code did not match the expected output. Try again!',
  }
}
