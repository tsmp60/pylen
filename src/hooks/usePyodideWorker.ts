import { useCallback, useEffect, useRef, useState } from 'react'

type WorkerMessage =
  | { type: 'stdout'; text?: string }
  | { type: 'stderr'; text?: string }
  | { type: 'input-request'; prompt?: string }
  | { type: 'result'; ok?: boolean; stdout?: string; stderr?: string; output?: string; message?: string }
  | { type: 'error'; message?: string }

export function usePyodideWorker() {
  const workerRef = useRef<Worker | null>(null)
  const stdinBufferRef = useRef<SharedArrayBuffer | null>(null)
  const stdinStateRef = useRef<Int32Array | null>(null)
  const [terminalOutput, setTerminalOutput] = useState('')
  const [waitingForInput, setWaitingForInput] = useState(false)
  const [inputPrompt, setInputPrompt] = useState('Input required:')
  const [terminalInput, setTerminalInput] = useState('')

  useEffect(() => {
    const worker = new Worker(new URL('../workers/pyodideWorker.ts', import.meta.url), { type: 'module' })
    workerRef.current = worker

    const stdinBuffer = new SharedArrayBuffer(4096)
    const stdinState = new Int32Array(stdinBuffer, 0, 2)
    stdinState[0] = 0
    stdinState[1] = 0

    stdinBufferRef.current = stdinBuffer
    stdinStateRef.current = stdinState

    worker.postMessage({ type: 'init', stdinBuffer, stdinState })

    const handleMessage = (event: MessageEvent<WorkerMessage>) => {
      const message = event.data

      if (message.type === 'stdout') {
        setTerminalOutput((current) => `${current}${message.text ?? ''}`)
        return
      }

      if (message.type === 'stderr') {
        setTerminalOutput((current) => `${current}${message.text ?? ''}`)
        return
      }

      if (message.type === 'input-request') {
        setInputPrompt(message.prompt ?? 'Input required:')
        setWaitingForInput(true)
        setTerminalInput('')
        return
      }
    }

    worker.addEventListener('message', handleMessage)

    return () => {
      worker.removeEventListener('message', handleMessage)
      worker.terminate()
      workerRef.current = null
      stdinBufferRef.current = null
      stdinStateRef.current = null
    }
  }, [])

  const submitInput = useCallback(() => {
    if (!stdinBufferRef.current || !stdinStateRef.current) {
      setWaitingForInput(false)
      return
    }

    const value = terminalInput
    const bytes = new TextEncoder().encode(value)
    const buffer = new Uint8Array(stdinBufferRef.current)
    buffer.fill(0)
    buffer.set(bytes.slice(0, 1023))

    const state = stdinStateRef.current
    Atomics.store(state, 1, bytes.length)
    Atomics.store(state, 0, 1)
    Atomics.notify(state, 0)

    setTerminalInput('')
    setWaitingForInput(false)
    setTerminalOutput((current) => `${current}${value}\n`)
  }, [terminalInput])

  return {
    terminalOutput,
    waitingForInput,
    inputPrompt,
    terminalInput,
    setTerminalInput,
    submitInput,
    worker: workerRef.current,
  }
}
