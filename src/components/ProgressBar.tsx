type ProgressBarProps = {
  value: number
  className?: string
}

export function ProgressBar({ value, className = '' }: ProgressBarProps) {
  return (
    <div className={`h-2.5 w-full overflow-hidden rounded-full bg-slate-800/80 ${className}`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-lime-400 to-emerald-300 shadow-[0_0_12px_rgba(74,222,128,0.75)] transition-all duration-500"
        style={{ width: `${Math.max(8, Math.min(100, value))}%` }}
      />
    </div>
  )
}
