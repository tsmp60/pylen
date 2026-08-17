type WorkerInitMessage = {
  type: 'init'
  stdinBuffer: ArrayBuffer
  stdinState: ArrayBuffer
}

type WorkerExecutionMessage = {
  type: 'run'
  code: string
}

type WorkerInputMessage = {
  type: 'stdin'
  value: string
}

let pyodide: any = null
let stdinBuffer: Uint8Array | null = null
let stdinState: Int32Array | null = null
let pendingInputPrompt = 'Enter: '

function extractInputPrompt(code: string): string {
  const match = code.match(/input\s*\(\s*(?:"([^"]*)"|'([^']*)'|`([^`]*)`)/s)
  if (!match) {
    return 'Enter: '
  }

  const value = match[1] ?? match[2] ?? match[3] ?? 'Enter: '
  return value || 'Enter: '
}

function postMessageToMain(type: string, payload: Record<string, unknown> = {}) {
  self.postMessage({ type, ...payload })
}

function queueTerminalInput(value: string) {
  if (!stdinState || !stdinBuffer) {
    return
  }

  const bytes = new TextEncoder().encode(value ?? '')
  stdinBuffer.fill(0)
  stdinBuffer.set(bytes.slice(0, 1023))
  Atomics.store(stdinState, 1, bytes.length)
  Atomics.store(stdinState, 0, 1)
  Atomics.notify(stdinState, 0)
}

async function initPyodide() {
  if (pyodide) {
    return pyodide
  }

  try {
    const dynamicImport = new Function('url', 'return import(url)') as (url: string) => Promise<any>
    const pyodideModule = await dynamicImport('https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.mjs')
    pyodide = await pyodideModule.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
      stdin: () => {
        if (!stdinState || !stdinBuffer) {
          return ''
        }

        const state = stdinState
        const buffer = stdinBuffer

        postMessageToMain('input-request', { prompt: pendingInputPrompt || 'Enter: ' })

        while (Atomics.load(state, 0) === 0) {
          Atomics.wait(state, 0, 0)
        }

        const length = Atomics.load(state, 1)
        const value = new TextDecoder().decode(buffer.slice(0, length))

        Atomics.store(state, 0, 0)
        Atomics.store(state, 1, 0)
        buffer.fill(0)

        return `${value}\n`
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    postMessageToMain('error', {
      message: `Pyodide failed to load in the sandbox: ${message}`,
    })
    throw new Error(`Pyodide failed to load in the sandbox: ${message}`)
  }

  pyodide.setStdout({
    batched: (text: string) => {
      postMessageToMain('stdout', { text })
    },
  })

  pyodide.setStderr({
    batched: (text: string) => {
      postMessageToMain('stderr', { text })
    },
  })

  pyodide.setStdin({
    isatty: true,
    stdin: () => {
      if (!stdinState || !stdinBuffer) {
        return ''
      }

      const state = stdinState
      const buffer = stdinBuffer

      postMessageToMain('input-request', { prompt: pendingInputPrompt || 'Enter: ' })

      while (Atomics.load(state, 0) === 0) {
        Atomics.wait(state, 0, 0)
      }

      const length = Atomics.load(state, 1)
      const value = new TextDecoder().decode(buffer.slice(0, length))

      Atomics.store(state, 0, 0)
      Atomics.store(state, 1, 0)
      buffer.fill(0)

      return `${value}\n`
    },
  })

  return pyodide
}

self.onmessage = async (event: MessageEvent<WorkerInitMessage | WorkerExecutionMessage | WorkerInputMessage>) => {
  const message = event.data

  if (message.type === 'init') {
    stdinBuffer = new Uint8Array(message.stdinBuffer)
    stdinState = new Int32Array(message.stdinState)
    return
  }

  if (message.type === 'stdin') {
    queueTerminalInput(message.value ?? '')
    return
  }

  if (message.type === 'run') {
    try {
      pendingInputPrompt = extractInputPrompt(message.code ?? '')
      const runtime = await initPyodide()
      let stdout = ''
      let stderr = ''

      runtime.setStdout({
        batched: (text: string) => {
          stdout += text
          postMessageToMain('stdout', { text })
        },
      })

      runtime.setStderr({
        batched: (text: string) => {
          stderr += text
          postMessageToMain('stderr', { text })
        },
      })

      const code = message.code && message.code.trim() ? message.code : 'print("")'
      await runtime.runPythonAsync(code)

      postMessageToMain('result', {
        ok: true,
        stdout,
        stderr,
        output: stdout.trim() || 'Code ran successfully. No output was printed.',
      })
    } catch (error) {
      const messageText = error instanceof Error ? error.message : String(error)
      postMessageToMain('error', { message: messageText })
    }
  }
}
