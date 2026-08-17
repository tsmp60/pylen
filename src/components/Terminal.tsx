import { useEffect, useRef } from 'react'

type TerminalStatus = 'READY' | 'RUNNING' | 'WAITING FOR INPUT' | 'PASSED' | 'NEEDS WORK' | 'LOADING' | string

type TerminalProps = {
  output: string
  waitingForInput: boolean
  inputPrompt: string
  terminalInput: string
  status: TerminalStatus
  onInputChange: (value: string) => void
  onInputSubmit: () => void | Promise<void>
}

export function Terminal({
  output,
  waitingForInput,
  inputPrompt,
  terminalInput,
  status,
  onInputChange,
  onInputSubmit,
}: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!terminalRef.current) {
      return
    }

    const container = terminalRef.current
    container.scrollTop = container.scrollHeight
  }, [output, waitingForInput, terminalInput])

  useEffect(() => {
    if (waitingForInput) {
      inputRef.current?.focus()
    }
  }, [waitingForInput])

  const lines = output.split(/\r?\n/)

  return (
    <div className="border-t-2 border-black bg-[#F3F4F6] p-3">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-700">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
          Terminal
        </div>
        <div className="neo-badge px-2 py-1 text-[10px] font-black uppercase tracking-[0.18em]">
          {status}
        </div>
      </div>

      <div
        ref={terminalRef}
        className="min-h-[110px] max-h-[240px] overflow-y-auto rounded-none border-2 border-black bg-black p-4 font-mono text-sm leading-6 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        {lines.length > 0 ? (
          lines.map((line, index) => (
            <div key={`${line}-${index}`} className="whitespace-pre-wrap break-words text-white">
              {line || ' '}
            </div>
          ))
        ) : (
          <div className="flex min-h-[70px] items-center justify-center text-center text-[14px] font-semibold text-slate-300">
            Click Run Code to view your result
          </div>
        )}

        {waitingForInput && (
          <div className="mt-2 flex items-center gap-2 text-white">
            <span className="font-bold text-white">{inputPrompt || 'Enter:'}</span>
            <input
              ref={inputRef}
              autoFocus
              value={terminalInput}
              onChange={(event) => onInputChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  void onInputSubmit()
                }
              }}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
              placeholder="Type input and press Enter"
            />
          </div>
        )}
      </div>
    </div>
  )
}
