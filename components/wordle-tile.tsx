'use client'

import * as React from 'react'

export type TileState = 'empty' | 'filled' | 'correct' | 'present' | 'absent'

interface WordleTileProps {
  letter?: string
  state: TileState
  isFlipping?: boolean
  delayMs?: number
}

export function WordleTile({
  letter,
  state,
  isFlipping = false,
  delayMs = 0,
}: WordleTileProps) {
  const baseStyles =
    'w-full aspect-square flex items-center justify-center text-2xl md:text-4xl font-bold rounded-lg border-2 transition-all duration-300'

  let stateStyles = ''
  let targetColor = ''

  if (isFlipping) {
    stateStyles = `bg-transparent border-[var(--wordle-filled-border)] text-foreground animate-flip-reveal`
    // Map state to CSS variable values
    switch (state) {
      case 'correct': targetColor = 'var(--wordle-correct)'; break;
      case 'present': targetColor = 'var(--wordle-present)'; break;
      case 'absent': targetColor = 'var(--wordle-absent)'; break;
      default: targetColor = 'transparent'; // Should not happen for flipping
    }
  } else {
    // Static styles (already revealed or typing)
    switch (state) {
      case 'correct':
        stateStyles = `bg-[var(--wordle-correct)] border-[var(--wordle-correct)] text-white`
        break
      case 'present':
        stateStyles = `bg-[var(--wordle-present)] border-[var(--wordle-present)] text-white`
        break
      case 'absent':
        stateStyles = `bg-[var(--wordle-absent)] border-[var(--wordle-absent)] text-white`
        break
      case 'filled':
        stateStyles = `bg-transparent border-[var(--wordle-filled-border)] text-foreground animate-pop`
        break
      default:
        stateStyles = `bg-transparent border-[var(--wordle-empty-border)] text-foreground`
        break
    }
  }

  return (
    <div
      className={`${baseStyles} ${stateStyles}`}
      style={
        {
          animationDelay: isFlipping ? `${delayMs}ms` : '0ms',
          '--target-color': targetColor,
        } as React.CSSProperties
      }
    >
      {letter && <span className="uppercase">{letter}</span>}
    </div>
  )
}
