import { useCallback, useEffect, useState } from 'react'

export type UserProgress = {
  completedExerciseIds: string[]
  totalXP: number
  currentStreak: number
  lastActiveDate: string
}

const STORAGE_KEY = 'pylen:user-progress'

const formatDateKey = (date: Date) => date.toISOString().slice(0, 10)

const calculateStreak = (lastActiveDate: string | null): number => {
  if (!lastActiveDate) {
    return 0
  }

  const today = new Date()
  const todayKey = formatDateKey(today)
  const lastDate = new Date(`${lastActiveDate}T12:00:00`)
  const diffDays = Math.round((today.getTime() - lastDate.getTime()) / 86400000)

  if (todayKey === lastActiveDate || diffDays === 0) {
    return 1
  }

  if (diffDays === 1) {
    return 1
  }

  return 0
}

const readInitialState = (): UserProgress => {
  if (typeof window === 'undefined') {
    return {
      completedExerciseIds: [],
      totalXP: 0,
      currentStreak: 0,
      lastActiveDate: formatDateKey(new Date()),
    }
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      return {
        completedExerciseIds: [],
        totalXP: 0,
        currentStreak: 0,
        lastActiveDate: formatDateKey(new Date()),
      }
    }

    const parsed = JSON.parse(saved) as Partial<UserProgress>
    const normalized: UserProgress = {
      completedExerciseIds: Array.isArray(parsed.completedExerciseIds) ? parsed.completedExerciseIds : [],
      totalXP: typeof parsed.totalXP === 'number' ? parsed.totalXP : 0,
      currentStreak: 0,
      lastActiveDate: typeof parsed.lastActiveDate === 'string' ? parsed.lastActiveDate : formatDateKey(new Date()),
    }

    normalized.currentStreak = calculateStreak(normalized.lastActiveDate)
    return normalized
  } catch {
    return {
      completedExerciseIds: [],
      totalXP: 0,
      currentStreak: 0,
      lastActiveDate: formatDateKey(new Date()),
    }
  }
}

export function useUserProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => readInitialState())

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    }
  }, [progress])

  const markActiveDay = useCallback(() => {
    setProgress((previous) => {
      const todayKey = formatDateKey(new Date())
      const lastDate = previous.lastActiveDate
      const sameDay = lastDate === todayKey

      if (sameDay) {
        return {
          ...previous,
          currentStreak: Math.max(previous.currentStreak, 1),
          lastActiveDate: todayKey,
        }
      }

      return {
        ...previous,
        currentStreak: 1,
        lastActiveDate: todayKey,
      }
    })
  }, [])

  const completeExercise = useCallback((exerciseId: string | number, xp: number) => {
    const normalizedId = String(exerciseId)

    setProgress((previous) => {
      if (previous.completedExerciseIds.includes(normalizedId)) {
        return previous
      }

      return {
        ...previous,
        completedExerciseIds: [...previous.completedExerciseIds, normalizedId],
        totalXP: previous.totalXP + xp,
      }
    })
  }, [])

  return {
    progress,
    markActiveDay,
    completeExercise,
  }
}
