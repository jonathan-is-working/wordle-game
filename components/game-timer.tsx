'use client'

import { useState, useEffect } from 'react'

interface GameTimerProps {
  startTime: number
  gameState: 'menu' | 'playing' | 'won' | 'lost'
}

export function GameTimer({ startTime, gameState }: GameTimerProps) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (gameState !== 'playing' || startTime === 0) return

    const intervalId = setInterval(() => {
      setNow(Date.now())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [startTime, gameState])

  if (gameState === 'menu' || startTime === 0) return null

  const elapsed = Math.max(0, now - startTime)
  const seconds = Math.floor((elapsed / 1000) % 60)
  const minutes = Math.floor(elapsed / 1000 / 60)
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  return (
    <div className="w-full flex justify-center">
      <div className="bg-muted/50 px-4 py-2 rounded-xl border border-border/50 backdrop-blur-md shadow-sm">
        <span className="font-mono font-bold text-2xl tabular-nums text-foreground/90">
          {formattedTime}
        </span>
      </div>
    </div>
  )
}

