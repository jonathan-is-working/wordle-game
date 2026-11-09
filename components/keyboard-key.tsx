'use client'

import { ButtonHTMLAttributes } from 'react'

interface KeyboardKeyProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  isWide?: boolean
  state?: 'default' | 'correct' | 'present' | 'absent'
}

export function KeyboardKey({
  label,
  isWide = false,
  state = 'default',
  onClick,
  ...props
}: KeyboardKeyProps) {
  const getStateStyles = () => {
    const baseStyles =
      'font-bold text-xl md:text-2xl rounded-md transition-all duration-200 flex items-center justify-center text-sm md:text-base h-12 md:h-16 active:scale-95 shadow-sm uppercase'

    switch (state) {
      case 'correct':
        return `${baseStyles} bg-[var(--wordle-correct)] text-white hover:opacity-90`
      case 'present':
        return `${baseStyles} bg-[var(--wordle-present)] text-white hover:opacity-90`
      case 'absent':
        return `${baseStyles} bg-[var(--wordle-absent)] text-white/50 cursor-default opacity-80`
      default:
        return `${baseStyles} bg-muted text-foreground hover:bg-muted/80 border`
    }
  }

  const widthClass = isWide ? 'px-3 md:px-4 flex-1 md:flex-initial' : 'w-8 md:w-10'

  return (
    <button
      onClick={onClick}
      className={`${getStateStyles()} ${widthClass}`}
      disabled={state === 'absent'}
      {...props}
    >
      {label}
    </button>
  )
}
