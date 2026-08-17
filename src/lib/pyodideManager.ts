import { ensurePyodide, resetPyodideRuntime, type PyodideRuntime } from './pyodide'

export type RuntimeStatus = {
  ready: boolean
  isLoading: boolean
  isError: boolean
  message: string
}

let runtimePromise: Promise<PyodideRuntime> | null = null
let runtime: PyodideRuntime | null = null
let status: RuntimeStatus = {
  ready: false,
  isLoading: true,
  isError: false,
  message: 'Loading Python engine...',
}

const listeners = new Set<(nextStatus: RuntimeStatus) => void>()

function notifyListeners(nextStatus: RuntimeStatus) {
  status = nextStatus
  listeners.forEach((listener) => listener({ ...nextStatus }))
}

export async function startPyodideWarmup(): Promise<PyodideRuntime> {
  if (runtime) {
    return runtime
  }

  if (!runtimePromise) {
    runtimePromise = (async () => {
      notifyListeners({
        ready: false,
        isLoading: true,
        isError: false,
        message: 'Loading Python engine...',
      })

      try {
        runtime = await ensurePyodide()
        notifyListeners({
          ready: true,
          isLoading: false,
          isError: false,
          message: 'READY',
        })
        return runtime
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load Python engine.'
        notifyListeners({
          ready: false,
          isLoading: false,
          isError: true,
          message: 'Failed to load Python engine. Click to retry.',
        })
        throw new Error(message)
      }
    })()
  }

  return runtimePromise
}

export function resetPyodideWarmup() {
  runtime = null
  runtimePromise = null
  resetPyodideRuntime()
}

export function subscribeToPyodideStatus(listener: (nextStatus: RuntimeStatus) => void) {
  listeners.add(listener)
  listener({ ...status })

  return () => {
    listeners.delete(listener)
  }
}

export async function resetPythonRuntimeState(runtime: PyodideRuntime) {
  if (typeof runtime.runPythonAsync === 'function') {
    await runtime.runPythonAsync('globals().clear()')
    return
  }

  if (typeof runtime.executeCode === 'function') {
    await runtime.executeCode('globals().clear()')
    return
  }

  throw new Error('Execution engine not ready')
}
