import curriculumMarkdown from '../../curriculum.md?raw'

export type ExerciseType = 'LESSON' | 'BOSS_CHALLENGE'
export type ValidationType = 'EXACT_VALUE' | 'NUMBER_MATCH' | 'CONTAINS_VALUE'

export interface Hint {
  level: 'Nudge' | 'Syntax' | 'Solution'
  text: string
}

export interface Exercise {
  id: number
  unitId: number
  exerciseNumber: number
  title: string
  type: ExerciseType
  learn: string
  instructions: string
  validationType: ValidationType
  expectedValue: string
  expectedOutputPattern: string
  starterCode: string
  conceptExplanation: string
  storyChallenge: string
  hints: Hint[]
  xpReward: number
}

export interface Unit {
  id: number
  title: string
  exercises: Exercise[]
}

export interface Level {
  level: number
  title: string
  summary: string
  units: Unit[]
}

const normalizeMarkdownValue = (value: string): string =>
  value.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim()

const buildHints = (title: string, learn: string, expectedValue: string, starterCode: string): Hint[] => [
  { level: 'Nudge', text: `Try to solve ${title.toLowerCase()} using the idea described in the lesson.` },
  { level: 'Syntax', text: starterCode || learn },
  { level: 'Solution', text: expectedValue || learn },
]

const parseExerciseSection = (section: string, unitId: number, exerciseNumber: number, globalId: number): Exercise => {
  const titleMatch = section.match(/^## Exercise\s+\d+\.\d+:\s*(.+)$/m)
  const typeMatch = section.match(/- \*\*Type:\*\*\s*(LESSON|BOSS_CHALLENGE)/)
  const validationMatch = section.match(
    /- \*\*Validation Type:\*\*\s*(EXACT_VALUE|NUMBER_MATCH|CONTAINS_VALUE)/,
  )
  const learnMatch = section.match(/- \*\*Learn:\*\*\s*([\s\S]*?)(?=\n- \*\*Instructions:\*\*|\n```)/)
  const instructionsMatch = section.match(
    /- \*\*Instructions:\*\*\s*([\s\S]*?)(?=\n- \*\*Validation Type:\*\*)/,
  )
  const expectedValueMatch = section.match(
    /- \*\*Expected Value:\*\*\s*([\s\S]*?)(?=\n- \*\*Starter Code:\*\*)/,
  )
  const starterMatch = section.match(/- \*\*Starter Code:\*\*\s*\n```(?:python)?\n([\s\S]*?)\n```/)

  if (!titleMatch || !typeMatch || !validationMatch || !learnMatch || !instructionsMatch || !expectedValueMatch || !starterMatch) {
    throw new Error(`Unable to parse exercise in unit ${unitId}`)
  }

  const learn = normalizeMarkdownValue(learnMatch[1])
  const instructions = normalizeMarkdownValue(instructionsMatch[1])
  const expectedValue = normalizeMarkdownValue(expectedValueMatch[1])
  const starterCode = starterMatch[1].replace(/\r\n/g, '\n')

  const hintSet = buildHints(titleMatch[1].trim(), learn, expectedValue, starterCode)

  return {
    id: globalId,
    unitId,
    exerciseNumber,
    title: titleMatch[1].trim(),
    type: typeMatch[1] as ExerciseType,
    learn,
    instructions,
    validationType: validationMatch[1] as ValidationType,
    expectedValue,
    expectedOutputPattern: expectedValue,
    starterCode,
    conceptExplanation: learn,
    storyChallenge: instructions,
    hints: hintSet,
    xpReward: Math.min(100, 25 + unitId * 4 + exerciseNumber * 3),
  }
}

const parseCurriculumMarkdown = (source: string): Unit[] => {
  const normalized = source.replace(/\r\n/g, '\n')
  const unitHeaders = Array.from(normalized.matchAll(/^# Unit (\d+):\s*(.+)$/gm))

  let globalExerciseId = 1

  return unitHeaders.map((unitMatch, unitIndex) => {
    const unitId = Number(unitMatch[1])
    const nextUnitStart = unitHeaders[unitIndex + 1]?.index ?? normalized.length
    const unitSection = normalized.slice(unitMatch.index ?? 0, nextUnitStart)
    const exerciseHeaders = Array.from(unitSection.matchAll(/^## Exercise (\d+)\.(\d+):\s*(.+)$/gm))

    const exercises = exerciseHeaders.map((exerciseMatch, exerciseIndex) => {
      const exerciseNumber = Number(exerciseMatch[2])
      const nextExerciseStart = exerciseHeaders[exerciseIndex + 1]?.index ?? unitSection.length
      const exerciseSection = unitSection.slice(exerciseMatch.index ?? 0, nextExerciseStart)
      const exercise = parseExerciseSection(exerciseSection, unitId, exerciseNumber, globalExerciseId)
      globalExerciseId += 1
      return exercise
    })

    return {
      id: unitId,
      title: (unitMatch[2] ?? '').trim(),
      exercises,
    }
  })
}

export const curriculum: Unit[] = parseCurriculumMarkdown(curriculumMarkdown)
export const allExercises: Exercise[] = curriculum.flatMap((unit) => unit.exercises)

export const curriculumPath: Level[] = curriculum.map((unit) => ({
  level: unit.id,
  title: `Unit ${unit.id}`,
  summary: unit.title,
  units: [unit],
}))

export const getUnitById = (id: number): Unit | undefined => curriculum.find((unit) => unit.id === id)

export const getExerciseById = (unitId: number, exerciseId: number): Exercise | undefined =>
  getUnitById(unitId)?.exercises.find((exercise) => exercise.exerciseNumber === exerciseId || exercise.id === exerciseId)

export const getUnitExercises = (unitId: number): Exercise[] => getUnitById(unitId)?.exercises ?? []

export const totalUnits = curriculum.length
export const totalExercises = allExercises.length
