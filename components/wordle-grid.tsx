'use client'

import { WordleTile, type TileState } from './wordle-tile'

interface GridRow {
  letters: string[]
  states: TileState[]
  isFlipping?: boolean[]
  isShaking?: boolean
}

interface WordleGridProps {
  rows: GridRow[]
}

export function WordleGrid({ rows }: WordleGridProps) {
  return (
    <div className="w-full max-w-[350px] md:max-w-[400px] aspect-[5/6] max-h-full flex flex-col gap-1 md:gap-2 mx-auto">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`grid grid-cols-5 gap-1 md:gap-2 ${row.isShaking ? 'animate-shake' : ''
            }`}
        >
          {row.letters.map((letter, colIndex) => (
            <WordleTile
              key={`${rowIndex}-${colIndex}`}
              letter={letter}
              state={row.states[colIndex]}
              isFlipping={row.isFlipping?.[colIndex]}
              delayMs={row.isFlipping?.[colIndex] ? colIndex * 300 : 0}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
