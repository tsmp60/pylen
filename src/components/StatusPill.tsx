type StatusPillProps = {
  label: string
  tone?: 'success' | 'neutral' | 'warning'
}

const tones = {
  success: 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/30',
  neutral: 'bg-slate-700/60 text-slate-200 border border-slate-600/70',
  warning: 'bg-amber-500/15 text-amber-200 border border-amber-400/30',
}

export function StatusPill({ label, tone = 'neutral' }: StatusPillProps) {
  return <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${tones[tone]}`}>{label}</span>
}
