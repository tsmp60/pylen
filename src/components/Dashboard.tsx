import { Check, Lock, Sparkles, Star } from 'lucide-react'
import { allExercises, curriculumPath } from '../data/curriculum'

type DashboardProps = {
  totalXp: number
  completedCount: number
  streak: number
  overallPercent: number
  currentExerciseId: string | number
  onSelectExercise: (exerciseIndex: number) => void
}

export function Dashboard({
  totalXp,
  completedCount,
  streak,
  overallPercent,
  currentExerciseId,
  onSelectExercise,
}: DashboardProps) {
  const flattened = allExercises
  const currentIndex = flattened.findIndex((exercise) => String(exercise.id) === String(currentExerciseId))

  return (
    <div className="dashboard-shell">
      <section className="neo-panel p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-700">Overview</div>
            <h2 className="mt-1 text-2xl font-black">Learning path</h2>
          </div>
          <div className="neo-badge px-3 py-2 text-sm font-black">{Math.round(overallPercent)}% complete</div>
        </div>

        <div className="mb-4 neo-progress">
          <span style={{ width: `${overallPercent}%` }} />
        </div>

        <div className="dashboard-grid">
          <div className="neo-card p-4">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-700">Total XP</div>
            <div className="mt-2 flex items-center gap-2 text-3xl font-black">
              <Sparkles size={20} className="text-[#16A34A]" />
              {totalXp}
            </div>
          </div>

          <div className="neo-card p-4">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-700">Completed</div>
            <div className="mt-2 flex items-center gap-2 text-3xl font-black">
              <Check size={20} className="text-[#16A34A]" />
              {completedCount}
            </div>
          </div>

          <div className="neo-card p-4">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-700">Current streak</div>
            <div className="mt-2 flex items-center gap-2 text-3xl font-black">
              <Star size={20} className="text-[#F59E0B]" />
              {streak} days
            </div>
          </div>
        </div>
      </section>

      <section className="neo-panel p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-700">Course map</div>
          <div className="neo-badge px-2 py-1 text-[10px] font-black uppercase tracking-[0.18em]">{curriculumPath.length} levels</div>
        </div>

        <div className="course-path">
          {flattened.map((exercise, index) => {
            const isCompleted = completedCount > 0 && flattened.slice(0, index).some((item) => item.id === exercise.id)
            const isCurrent = index === currentIndex
            const isUnlocked = index <= currentIndex + 1
            const isLocked = !isCompleted && !isCurrent && !isUnlocked

            return (
              <div key={exercise.id} className="path-row">
                <div className="path-connector" />
                <button
                  type="button"
                  onClick={() => isUnlocked && onSelectExercise(index)}
                  disabled={!isUnlocked}
                  className={`path-node ${
                    isCompleted ? 'completed' : isCurrent ? 'current' : isLocked ? 'locked' : 'unlocked'
                  }`}
                >
                  {isCompleted ? <Check size={14} /> : isLocked ? <Lock size={12} /> : index + 1}
                </button>

                <button
                  type="button"
                  onClick={() => isUnlocked && onSelectExercise(index)}
                  disabled={!isUnlocked}
                  className="path-label"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-700">
                    {curriculumPath.flatMap((level) => level.units).find((unit) =>
                      unit.exercises.some((item) => item.id === exercise.id),
                    )?.title ?? 'Lesson'}
                  </span>
                  <span className="text-base font-black text-slate-900">{exercise.title}</span>
                </button>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
