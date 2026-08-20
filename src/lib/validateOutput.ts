export function normalizeOutput(value: string): string {
  return value
    .replace(/\r\n/g, '\n')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\n +/g, '\n')
    .trim()
    .toLowerCase()
}

const codeWords = (code: string): string => code.replace(/#.*$/gm, '').toLowerCase()

function hasRequiredConstruct(code: string, instructions: string): boolean {
  const source = codeWords(code)
  const lesson = instructions.toLowerCase()
  const requirements: Array<[RegExp, RegExp]> = [
    [/\binput\s*\(/, /\binput\b/],
    [/\bprint\s*\(/, /\bprint\b|\boutput\b/],
    [/\bif\b/, /\bif\b|condition/],
    [/\b(?:else|elif)\b/, /\belse\b|\belif\b/],
    [/\bfor\b|\bwhile\b/, /\bfor\s+(?:each|every)\b|\bwhile\b|\b(?:for|while)\s+loop\b/],
    [/\bdef\s+[a-z_]\w*\s*\(/, /\bfunction\b|\bdef\b/],
    [/\.append\s*\(/, /\.append\s*\(|\bappend\b/],
    [/\.pop\s*\(/, /\.pop\s*\(|\bpop\b/],
    [/\bsorted\s*\(/, /\bsorted\b|\border/],
    [/\bopen\s*\(/, /\bfile\b|\bwrite\b|\bread\b/],
    [/\bimport\s+\w+|\bfrom\s+\w+\s+import\b/, /\bimport\b|module|library/],
    [/^\s*#.+/m, /\bcomment\b/],
    [/%/, /`%`|remainder|modulo/],
    [/\/\//, /`\/\/`|floor division/],
    [/\*\*/, /`\*\*`|power|squared/],
    [/\.lower\s*\(|\.strip\s*\(/, /\.lower\(\)|\.strip\(\)|lowercase|stripped/],
    [/\[::-1\]/, /reverse|reversed/],
    [/.+\bfor\b.+\bin\b.+/, /comprehension/],
    [/\blambda\b/, /\blambda\b/],
    [/\bclass\s+[a-z_]\w*/, /\bclass\b/],
    [/\b(?:try|except)\b/, /\btry\b|\bexcept\b|error handling/],
    [/\braise\s+[a-z_]\w*/, /\braise\b/],
    [/\basync\s+def\b|\bawait\b/, /\basync\b|\bawait\b/],
  ]

  return requirements.every(([sourcePattern, lessonPattern]) => !lessonPattern.test(lesson) || sourcePattern.test(source))
}

function hasRequiredNames(code: string, instructions: string): boolean {
  const source = codeWords(code)
  const ignored = new Set(['input', 'print', 'true', 'false', 'none', 'if', 'else', 'elif', 'for', 'while'])
  const names = Array.from(instructions.matchAll(/`([a-z_]\w*)`/gi), (match) => match[1].toLowerCase())
    .filter((name) => !ignored.has(name))

  return names.every((name) => new RegExp(`\\b${name}\\b`).test(source))
}

function hasRequiredFormula(code: string, instructions: string): boolean {
  const source = codeWords(code).replace(/\s+/g, '')
  const lesson = instructions.replace(/\s+/g, '').toLowerCase()
  const formulas = [
    ['9/5+32', /9\/5\+32|9\*?\/5\+32/],
    ['*365', /(?:\*365|365\*)/],
  ] as const

  return formulas.every(([marker, pattern]) => !lesson.includes(marker) || pattern.test(source))
}

function matchesExerciseRequirements(code: string, actual: string, instructions = ''): boolean {
  if (!code.trim()) {
    return false
  }

  const requiresOutput = /\b(?:print|output|display|show)\b/i.test(instructions)
  if (requiresOutput && !normalizeOutput(actual)) {
    return false
  }

  return hasRequiredConstruct(code, instructions) && hasRequiredNames(code, instructions) && hasRequiredFormula(code, instructions)
}

export function outputMatchesValidation(
  code: string,
  actual: string,
  instructions?: string,
): boolean {
  return matchesExerciseRequirements(code, actual, instructions)
}
