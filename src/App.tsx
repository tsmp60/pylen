import { useEffect, useMemo, useRef, useState } from 'react'
import Editor, { type OnMount } from '@monaco-editor/react'
import confetti from 'canvas-confetti'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Code2,
  Play,
  RotateCcw,
  Sparkles,
  Star,
  Target,
} from 'lucide-react'
import { allExercises } from './data/curriculum'
import { executePythonCode, validateExercise } from './lib/pyodide'
import { startPyodideWarmup, subscribeToPyodideStatus, resetPyodideWarmup } from './lib/pyodideManager'
import { Dashboard } from './components/Dashboard'
import { Terminal } from './components/Terminal'
import { useUserProgress } from './hooks/useUserProgress'
import './App.css'

const totalExercises = allExercises.length

function App() {
  const { progress, markActiveDay, completeExercise } = useUserProgress()
  const [view, setView] = useState<'dashboard' | 'workspace'>('workspace')
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [code, setCode] = useState(allExercises[0].starterCode)
  const [terminalOutput, setTerminalOutput] = useState('')
  const [runtimeReady, setRuntimeReady] = useState(false)
  const [runtimeLoading, setRuntimeLoading] = useState(true)
  const [runtimeStatusText, setRuntimeStatusText] = useState('Loading Python engine...')
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [hintOpen, setHintOpen] = useState(false)
  const [hintIndex, setHintIndex] = useState(0)
  const [toastVisible, setToastVisible] = useState(false)
  const [exercisePassed, setExercisePassed] = useState(false)
  const [waitingForInput, setWaitingForInput] = useState(false)
  const [inputPrompt, setInputPrompt] = useState('')
  const [terminalInput, setTerminalInput] = useState('')
  const terminalRef = useRef<HTMLPreElement | null>(null)
  const terminalInputRef = useRef<HTMLInputElement | null>(null)

  const currentExercise = allExercises[exerciseIndex]

  const completionPercent = useMemo(
    () => (totalExercises === 0 ? 0 : (progress.completedExerciseIds.length / totalExercises) * 100),
    [progress.completedExerciseIds.length],
  )

  useEffect(() => {
    markActiveDay()
  }, [markActiveDay])

  useEffect(() => {
    setCode(currentExercise.starterCode)
    setTerminalOutput('')
    setInputPrompt('')
    setStatus('idle')
    setHintOpen(false)
    setHintIndex(0)
    setToastVisible(false)
    setExercisePassed(false)
  }, [currentExercise])

  useEffect(() => {
    let active = true

    const onPyodideOutput = (event: Event) => {
      const { detail } = event as CustomEvent<string>
      const text = String(detail ?? '')
      setTerminalOutput((previous) => `${previous}${text}`)
    }

    const onInputRequest = (event: Event) => {
      const { detail } = event as CustomEvent<{ prompt: string }>
      const nextPrompt = detail?.prompt ?? 'Enter: '
      setInputPrompt(nextPrompt)
      setWaitingForInput(true)
      setTerminalInput('')
      window.setTimeout(() => terminalInputRef.current?.focus(), 0)
    }

    const unsubscribe = subscribeToPyodideStatus((status) => {
      if (!active) {
        return
      }

      setRuntimeReady(status.ready)
      setRuntimeLoading(status.isLoading)
      setRuntimeStatusText(status.message)

      if (status.isError) {
        setTerminalOutput('Failed to load Python engine. Click to retry.')
      }
    })

    window.addEventListener('pylen:stdout', onPyodideOutput)
    window.addEventListener('pylen:stderr', onPyodideOutput)
    window.addEventListener('pylen:input-request', onInputRequest)

    void startPyodideWarmup().catch(() => {
      if (active) {
        setRuntimeReady(false)
        setRuntimeLoading(false)
        setTerminalOutput('Failed to load Python engine. Click to retry.')
      }
    })

    return () => {
      active = false
      unsubscribe()
      window.removeEventListener('pylen:stdout', onPyodideOutput)
      window.removeEventListener('pylen:stderr', onPyodideOutput)
      window.removeEventListener('pylen:input-request', onInputRequest)
    }
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalOutput, waitingForInput])

  const appendTerminalOutput = (value: string) => {
    const text = value ?? ''
    if (!text) {
      return
    }

    setTerminalOutput((current) => {
      const next = current.length > 0 && !current.endsWith('\n') ? `${current}\n` : current
      return `${next}${text}`
    })
  }

  const clearTerminalOutput = () => {
    setTerminalOutput('')
    setInputPrompt('')
    setWaitingForInput(false)
    setTerminalInput('')
    setIsRunning(false)
    setIsSubmitting(false)
  }

  const handleEditorMount: OnMount = (editor) => {
    editor.updateOptions({
      minimap: { enabled: false },
      fontSize: 14,
      wordWrap: 'on',
      padding: { top: 12, bottom: 12 },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      insertSpaces: true,
    })
  }

  const handleRun = async () => {
    if (!runtimeReady) {
      setTerminalOutput('Initializing Python Engine...')
      return
    }

    setIsRunning(true)
    setStatus('idle')
    setToastVisible(false)
    setWaitingForInput(false)
    setTerminalInput('')
    setTerminalOutput('')

    try {
      resetPyodideWarmup()
      const runtime = await startPyodideWarmup()
      const result = await executePythonCode(code, runtime)

      if (!result?.stdout && !result?.output) {
        appendTerminalOutput('Code ran successfully. No output was printed.')
      }

      setStatus(result?.ok ? 'success' : 'error')
    } catch (error) {
      setStatus('error')
      appendTerminalOutput(error instanceof Error ? error.message : 'Execution failed.')
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmit = async () => {
    if (!runtimeReady) {
      setTerminalOutput('Initializing Python Engine...')
      return
    }

    setIsSubmitting(true)
    setStatus('idle')
    setToastVisible(false)
    setWaitingForInput(false)
    setTerminalInput('')
    setTerminalOutput('')

    try {
      resetPyodideWarmup()
      const runtime = await startPyodideWarmup()
      const execution = await executePythonCode(code, runtime)
      const executionOutput = (execution?.stdout || execution?.output || 'Code ran successfully. No output was printed.').trim()
      if (executionOutput) {
        appendTerminalOutput(executionOutput)
      }

      const result = await validateExercise(code, currentExercise, runtime)
      const validationOutput = (execution?.stdout || result?.output || 'Code ran successfully. No output was printed.').trim()
      if (validationOutput && validationOutput !== executionOutput) {
        appendTerminalOutput(validationOutput)
      }

      if (result.passed) {
        setStatus('success')
        setExercisePassed(true)
        setToastVisible(false)
        completeExercise(currentExercise.id, currentExercise.xpReward ?? 0)
        confetti({
          scalar: 0.8,
          particleCount: 35,
          spread: 50,
          origin: { y: 0.7 },
        })
        return
      }

      setStatus('error')
      setExercisePassed(false)
      setToastVisible(true)
    } catch (error) {
      setStatus('error')
      setExercisePassed(false)
      setToastVisible(true)
      setTerminalOutput(error instanceof Error ? error.message : 'Submission failed.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    resetPyodideWarmup()
    setRuntimeReady(false)
    setRuntimeLoading(false)
    setRuntimeStatusText('READY')
    clearTerminalOutput()
    setStatus('idle')
    setToastVisible(false)
    setExercisePassed(false)
  }

  const terminalStatus = runtimeReady
    ? waitingForInput
      ? 'WAITING FOR INPUT'
      : isRunning || isSubmitting
        ? 'RUNNING'
        : exercisePassed
          ? 'PASSED'
          : status === 'error'
            ? 'NEEDS WORK'
            : 'READY'
    : 'LOADING'

  const handleRetryEngine = async () => {
    resetPyodideWarmup()
    setRuntimeReady(false)
    setRuntimeLoading(true)
    setRuntimeStatusText('Loading Python engine...')
    setTerminalOutput('')

    try {
      await startPyodideWarmup()
    } catch {
      setTerminalOutput('Failed to load Python engine. Click to retry.')
    }
  }

  const handleTerminalInputSubmit = async () => {
    if (!waitingForInput) {
      return
    }

    try {
      const runtime = await startPyodideWarmup()
      runtime.provideInput(terminalInput)
    } catch (error) {
      setStatus('error')
      appendTerminalOutput(error instanceof Error ? error.message : 'Input could not be sent to the Python runtime.')
      return
    }

    setWaitingForInput(false)
    setTerminalInput('')
    setIsRunning(false)
    setIsSubmitting(false)
    setStatus('idle')
    appendTerminalOutput(terminalInput)
  }

  const handleHintToggle = () => {
    setHintOpen((prev) => !prev)
  }

  const handleHintCycle = () => {
    setHintIndex((prev) => (prev + 1) % currentExercise.hints.length)
  }

  const handlePrevious = () => {
    setExerciseIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleNext = () => {
    if (!exercisePassed) {
      return
    }

    setExerciseIndex((prev) => Math.min(prev + 1, totalExercises - 1))
  }

  const navLabel = useMemo(
    () => `Lvl ${Math.max(1, Math.floor(progress.totalXP / 150) + 1)}`,
    [progress.totalXP],
  )

  return (
    <div className="app-shell min-h-screen px-4 py-4 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <header className="neo-panel mb-5 flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center border-2 border-black bg-[#22C55E] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Code2 size={20} />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-600">pylen</div>
              <h1 className="mt-1 text-2xl font-black">Python / Basics</h1>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setView('dashboard')}
              className={`neo-button ${view === 'dashboard' ? 'neo-button-primary' : 'neo-button-secondary'}`}
            >
              Dashboard
            </button>
            <button
              type="button"
              onClick={() => setView('workspace')}
              className={`neo-button ${view === 'workspace' ? 'neo-button-primary' : 'neo-button-secondary'}`}
            >
              Workspace
            </button>
          </div>

          <div className="flex w-full max-w-[480px] items-center gap-3 lg:justify-end">
            <div className="flex-1">
              <div className="mb-2 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.18em] text-slate-700">
                <span>Progress</span>
                <span>{Math.round(completionPercent)}%</span>
              </div>
              <div className="neo-progress">
                <span style={{ width: `${completionPercent}%` }} />
              </div>
            </div>

            <div className="neo-badge flex items-center gap-2 px-3 py-2">
              <Sparkles size={14} className="text-[#16A34A]" />
              <span className="font-black">{progress.totalXP} XP</span>
            </div>

            <div className="neo-badge flex items-center gap-2 px-3 py-2">
              <Star size={14} className="text-[#F59E0B]" />
              <span className="font-black">{navLabel}</span>
            </div>
          </div>
        </header>

        {view === 'dashboard' ? (
          <Dashboard
            totalXp={progress.totalXP}
            completedCount={progress.completedExerciseIds.length}
            streak={progress.currentStreak}
            overallPercent={completionPercent}
            currentExerciseId={currentExercise.id}
            onSelectExercise={(index) => {
              setExerciseIndex(index)
              setView('workspace')
            }}
          />
        ) : (
          <>
            <main className="grid gap-5 xl:grid-cols-[420px_minmax(0,1fr)]">
              <aside className="neo-panel flex flex-col p-6">
                <div className="mb-5 flex items-center justify-between gap-2">
                  <div className="neo-badge px-2 py-1 text-[10px] font-black uppercase tracking-[0.18em]">
                    Lesson briefing
                  </div>
                  <div className="neo-badge success px-2 py-1 text-[10px] font-black uppercase tracking-[0.18em]">
                    Exercise {exerciseIndex + 1}/{totalExercises}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-1">
                  <div className="neo-card mb-5 p-5">
                    <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-slate-700">
                      <BookOpen size={16} />
                      Learn
                    </div>
                    <p className="text-[15px] leading-7 text-slate-800">
                      {currentExercise.conceptExplanation}
                    </p>
                  </div>

                  <div className="neo-card mb-5 p-5">
                    <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-slate-700">
                      <Target size={16} />
                      Instructions
                    </div>
                    <p className="text-[15px] leading-7 text-slate-800">
                      {currentExercise.storyChallenge}
                    </p>
                  </div>

                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={handleHintToggle}
                      className="neo-button neo-button-secondary px-4 py-2 text-[11px]"
                    >
                      {hintOpen ? 'Hide Hint' : 'Need a Hint?'}
                    </button>

                    {hintOpen && (
                      <div className="mt-3 space-y-3">
                        {currentExercise.hints.map((hint, index) => (
                          <button
                            type="button"
                            key={hint.level}
                            onClick={handleHintCycle}
                            className={`w-full rounded-none border-2 border-black bg-white p-3 text-left shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition active:translate-x-0.5 active:translate-y-0.5 ${
                              index === hintIndex ? 'bg-[#FFF3B0]' : 'bg-white'
                            }`}
                          >
                            <div className="mb-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-700">
                              {hint.level}
                            </div>
                            <div className="text-sm leading-6 text-slate-800">{hint.text}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </aside>

              <section className="neo-panel flex flex-col overflow-hidden p-0">
                <div className="flex flex-col gap-3 border-b-2 border-black bg-[#F3F4F6] p-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="border-2 border-black bg-[#F8FAFC] px-2 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-700">
                      main.py
                    </div>
                    <div className="neo-badge success px-2 py-1 text-[10px] font-black uppercase tracking-[0.18em]">
                      {runtimeReady ? 'READY' : runtimeStatusText}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleRun}
                      disabled={isRunning || runtimeLoading}
                      className="neo-button neo-button-primary px-4 py-2 text-sm"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Play size={16} />
                        Run Code
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting || runtimeLoading}
                      className="neo-button flex items-center gap-2 bg-[#22C55E] px-4 py-2 text-sm"
                    >
                      <Check size={16} />
                      {toastVisible ? 'Try Again' : 'Submit Code'}
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="neo-button neo-button-secondary px-3 py-2 text-sm"
                    >
                      <span className="inline-flex items-center gap-2">
                        <RotateCcw size={16} />
                        Reset Terminal
                      </span>
                    </button>
                  </div>
                </div>

                <div className="relative flex-1 overflow-hidden bg-[#FBFBF8]">
                  <Editor
                    height="100%"
                    defaultLanguage="python"
                    value={code}
                    theme="vs-light"
                    onMount={handleEditorMount}
                    onChange={(value) => setCode(value ?? '')}
                    options={{
                      fontFamily: 'JetBrains Mono, monospace',
                      wordWrap: 'on',
                      minimap: { enabled: false },
                      overviewRulerLanes: 0,
                      padding: { top: 18, bottom: 18 },
                      lineNumbersMinChars: 3,
                    }}
                  />

                  {runtimeLoading && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#F8F9FA]/80 backdrop-blur-[1px]">
                      <div className="flex items-center gap-3 border-2 border-black bg-white px-4 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                        <span className="text-sm font-black uppercase tracking-[0.18em]">Initializing Python Engine...</span>
                      </div>
                    </div>
                  )}
                </div>

                <Terminal
                  output={terminalOutput}
                  waitingForInput={waitingForInput}
                  inputPrompt={inputPrompt}
                  terminalInput={terminalInput}
                  status={terminalStatus}
                  onInputChange={setTerminalInput}
                  onInputSubmit={() => {
                    void handleTerminalInputSubmit()
                  }}
                />

                {!runtimeReady && (
                  <div className="mt-3 space-y-2 px-3 pb-3">
                    <button
                      type="button"
                      onClick={handleRetryEngine}
                      className="neo-button neo-button-primary px-3 py-2 text-sm"
                    >
                      Retry Loading Engine
                    </button>
                  </div>
                )}
              </section>
            </main>

            <footer className="neo-panel mt-5 flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="neo-badge px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em]">
                  Exercise {exerciseIndex + 1}/{totalExercises}
                </div>
                <div className="neo-badge success px-3 py-2 text-sm font-black">
                  +{currentExercise.xpReward} XP
                </div>
              </div>

              <div className="relative flex items-center gap-3">
                {toastVisible && (
                  <div className="absolute bottom-[52px] left-0 right-0 mx-auto w-[260px] border-2 border-black bg-[#FEE2E2] px-3 py-2 text-center text-sm font-black text-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    Code didn't match the expected output. Try again!
                  </div>
                )}

                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={exerciseIndex === 0}
                  className="neo-button neo-button-secondary inline-flex items-center gap-2 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!exercisePassed || exerciseIndex === totalExercises - 1}
                  className="neo-button inline-flex items-center gap-2 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {exerciseIndex === totalExercises - 1 ? 'Course Complete' : 'Next Exercise'}
                  <ArrowRight size={16} />
                </button>
              </div>
            </footer>
          </>
        )}
      </div>
    </div>
  )
}

export default App
