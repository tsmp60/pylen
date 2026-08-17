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

export function outputMatches(expected: string, actual: string): boolean {
  const expectedNormalized = normalizeOutput(expected)
  const actualNormalized = normalizeOutput(actual)

  if (!expectedNormalized || !actualNormalized) {
    return expectedNormalized === actualNormalized
  }

  if (actualNormalized === expectedNormalized) {
    return true
  }

  const expectedWords = expectedNormalized.split(/\s+/).filter(Boolean)
  const actualWords = actualNormalized.split(/\s+/).filter(Boolean)

  if (expectedWords.length > 0) {
    const matchedWordCount = expectedWords.filter((word) => actualWords.includes(word)).length
    if (matchedWordCount >= Math.max(1, Math.min(expectedWords.length, 2))) {
      return true
    }
  }

  const expectedNumbers = Array.from(expectedNormalized.matchAll(/\d+(?:\.\d+)?/g), (match) => match[0])
  const actualNumbers = Array.from(actualNormalized.matchAll(/\d+(?:\.\d+)?/g), (match) => match[0])

  if (expectedNumbers.length > 0) {
    const numberMatches = expectedNumbers.filter((number) => actualNumbers.includes(number)).length
    if (numberMatches === expectedNumbers.length) {
      return true
    }
  }

  const expectedTokens = expectedNormalized
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)

  const actualTokens = actualNormalized
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)

  if (expectedTokens.length > 0 && actualTokens.length > 0) {
    const tokenMatches = expectedTokens.filter((token) => actualTokens.includes(token)).length
    if (tokenMatches >= Math.max(1, Math.min(expectedTokens.length, 3))) {
      return true
    }
  }

  return actualNormalized.includes(expectedNormalized) || expectedNormalized.includes(actualNormalized)
}
