import { SOLUTION_WORDS, VALID_WORDS } from './words'

const solutionWords = SOLUTION_WORDS.map(w => w.toUpperCase())
const validWordsSet = new Set([...SOLUTION_WORDS, ...VALID_WORDS].map(w => w.toUpperCase()))

/**
 * Get a random solution word
 */
export function getRandomSolutionWord(): string {
  const randomIndex = Math.floor(Math.random() * solutionWords.length)
  return solutionWords[randomIndex]
}

/**
 * Check if a word is valid (can be used as a guess)
 */
export function isValidWord(word: string): boolean {
  return validWordsSet.has(word.toUpperCase())
}

export type TileState = 'correct' | 'present' | 'absent' | 'empty' | 'filled'

/**
 * Compute the states of the letters in a guess compared to the target word.
 * Handles duplicate letters correctly (Wordle logic).
 */
export function computeGuessStates(guess: string, target: string): TileState[] {
  const guessChars = guess.toUpperCase().split('')
  const targetChars = target.toUpperCase().split('')
  const result: TileState[] = Array(5).fill('absent')

  // Frequency map for target word letters (to handle duplicates)
  const targetFreq: Record<string, number> = {}
  targetChars.forEach(char => {
    targetFreq[char] = (targetFreq[char] || 0) + 1
  })

  // Pass 1: Find Greens (Correct position)
  guessChars.forEach((char, i) => {
    if (char === targetChars[i]) {
      result[i] = 'correct'
      targetFreq[char]--
    }
  })

  // Pass 2: Find Yellows (Present but wrong position)
  guessChars.forEach((char, i) => {
    if (result[i] === 'absent' && targetFreq[char] > 0) {
      result[i] = 'present'
      targetFreq[char]--
    }
  })

  return result
}
