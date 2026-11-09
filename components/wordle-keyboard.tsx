'use client'

import { KeyboardKey } from './keyboard-key'

interface WordleKeyboardProps {
  onKeyPress?: (key: string) => void
  disabledLetters?: Set<string>
  presentLetters?: Set<string>
  correctLetters?: Set<string>
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
]

export function WordleKeyboard({
  onKeyPress,
  disabledLetters = new Set(),
  presentLetters = new Set(),
  correctLetters = new Set(),
}: WordleKeyboardProps) {
  const getKeyState = (letter: string) => {
    if (correctLetters.has(letter)) return 'correct'
    if (presentLetters.has(letter)) return 'present'
    if (disabledLetters.has(letter)) return 'absent'
    return 'default'
  }

  return (
    <div className="flex flex-col gap-2 px-2 md:px-0">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-1 justify-center flex-wrap md:flex-nowrap"
        >
          {rowIndex === 2 && (
            <KeyboardKey
              label="Enter"
              onClick={() => onKeyPress?.('Enter')}
              isWide
              aria-label="Submit word"
            />
          )}
          {row.map((letter) => (
            <KeyboardKey
              key={letter}
              label={letter}
              onClick={() => onKeyPress?.(letter)}
              state={getKeyState(letter)}
            />
          ))}
          {rowIndex === 2 && (
            <KeyboardKey
              label="Delete"
              onClick={() => onKeyPress?.('Backspace')}
              isWide
              aria-label="Delete letter"
            />
          )}
        </div>
      ))}
    </div>
  )
}
