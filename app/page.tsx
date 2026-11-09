'use client'

import { useState, useEffect, useCallback } from 'react'
import { WordleGrid } from '@/components/wordle-grid'
import { WordleKeyboard } from '@/components/wordle-keyboard'
import { GameTimer } from '@/components/game-timer'
import { MainMenu } from '@/components/main-menu'
import { SettingsModal } from '@/components/settings-modal'
import { HowToPlayModal } from '@/components/how-to-play-modal'
import { getRandomSolutionWord, isValidWord, computeGuessStates } from '@/lib/word-utils'
import { Toaster, toast } from 'sonner'
import { HelpCircle, Settings as SettingsIcon, RotateCcw, ArrowLeft } from 'lucide-react'
import confetti from 'canvas-confetti'
import { motion, AnimatePresence } from 'framer-motion'

type GameState = 'menu' | 'playing' | 'won' | 'lost'

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('menu')
  const [targetWord, setTargetWord] = useState('')
  const [currentWord, setCurrentWord] = useState('')
  const [guessedWords, setGuessedWords] = useState<
    Array<{
      word: string
      states: ('correct' | 'present' | 'absent' | 'empty' | 'filled')[]
    }>
  >([])
  const [disabledLetters, setDisabledLetters] = useState<Set<string>>(new Set())
  const [presentLetters, setPresentLetters] = useState<Set<string>>(new Set())
  const [correctLetters, setCorrectLetters] = useState<Set<string>>(new Set())
  const [isShaking, setIsShaking] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false) // Block input during animation

  // Timer State
  const [startTime, setStartTime] = useState<number>(0)
  const [gameDuration, setGameDuration] = useState<string>('00:00')

  // Initialize game on load if needed or just wait for menu
  useEffect(() => {
    // Optional: Auto-load settings here
  }, [])

  const formatTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60)
    const minutes = Math.floor((ms / 1000 / 60))
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const startGame = useCallback((isReset = false) => {
    const newTarget = getRandomSolutionWord()
    setTargetWord(newTarget)
    setGameState('playing')
    setCurrentWord('')
    setGuessedWords([])
    setDisabledLetters(new Set())
    setPresentLetters(new Set())
    setCorrectLetters(new Set())
    setIsProcessing(false)
    setStartTime(Date.now())

    if (isReset) {
      toast.info('Game Reset', { id: 'game-status', duration: 2000 })
    }
  }, [])

  const handleShare = () => {
    const url = window.location.href
    navigator.clipboard.writeText(`I scored on Wordle (${gameDuration})! ${url}`)
      .then(() => toast.success('Link copied to clipboard!', { id: 'share' }))
      .catch(() => toast.error('Failed to copy', { id: 'share' }))
  }

  const handleWin = useCallback(() => {
    const duration = Date.now() - startTime
    setGameDuration(formatTime(duration))

    // Delay win state slightly to let the last tile flip
    setTimeout(() => {
      setGameState('won')
      toast.success('Excellent!', { duration: 5000, id: 'game-over' })

      // Confetti explosion "sugar candy"
      const duration = 3000
      const end = Date.now() + duration

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#10b981', '#f59e0b', '#3b82f6'] // Wordle colors
        })
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#10b981', '#f59e0b', '#3b82f6']
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }
      frame()
    }, 2000) // Sync with reveal animation
  }, [startTime])

  const handleKeyPress = useCallback((key: string) => {
    if (gameState !== 'playing' || isProcessing) return

    if (key === 'Enter') {
      if (currentWord.length !== 5) {
        setIsShaking(true)
        setTimeout(() => setIsShaking(false), 500)
        return
      }

      if (!isValidWord(currentWord)) {
        setIsShaking(true)
        setTimeout(() => setIsShaking(false), 500)
        return
      }

      setIsProcessing(true) // Block input start

      // Calculate states using the new helper
      const newStates = computeGuessStates(currentWord, targetWord)

      // 1. Update Grid Immediately (Starts visual flip)
      const newGuesses = [
        ...guessedWords,
        { word: currentWord, states: newStates },
      ]
      setGuessedWords(newGuesses)
      setCurrentWord('')

      // 2. Calculate Delay for Keyboard Update & Game State logic
      // Tile 5 finishes flipping around 1200ms (start) + 600ms (duration) = 1800ms
      // We set delay to 2000ms to be safe and ensure it happens AFTER visual confirmation
      const REVEAL_DELAY = 2000;

      if (currentWord === targetWord) {
        handleWin() // handleWin has its own delay now
      } else if (newGuesses.length === 6) {
        const duration = Date.now() - startTime
        setGameDuration(formatTime(duration))
        setTimeout(() => {
          setGameState('lost')
          toast.error(`Game Over! The word was ${targetWord}`, { duration: 5000, id: 'game-over' })
          setIsProcessing(false)
        }, REVEAL_DELAY)
      } else {
        // Release processing lock if game continues
        setTimeout(() => {
          setIsProcessing(false)
        }, REVEAL_DELAY)
      }

      // 3. Delayed Keyboard Update
      // We use the recently calculated newStates to batch update the Sets
      setTimeout(() => {
        const letters = currentWord.split('')

        // Helper to update sets cleanly
        setDisabledLetters(prev => {
          const next = new Set(prev)
          letters.forEach((letter, idx) => {
            if (newStates[idx] === 'absent' && !correctLetters.has(letter) && !presentLetters.has(letter)) {
              next.add(letter)
            }
          })
          return next
        })

        setPresentLetters(prev => {
          const next = new Set(prev)
          letters.forEach((letter, idx) => {
            if (newStates[idx] === 'present' && !correctLetters.has(letter)) {
              next.add(letter)
            } else if (newStates[idx] === 'correct') {
              next.delete(letter)
            }
          })
          return next
        })

        setCorrectLetters(prev => {
          const next = new Set(prev)
          letters.forEach((letter, idx) => {
            if (newStates[idx] === 'correct') {
              next.add(letter)
            }
          })
          return next
        })

      }, REVEAL_DELAY)

    } else if (key === 'Backspace') {
      setCurrentWord((prev) => prev.slice(0, -1))
    } else if (currentWord.length < 5 && /^[A-Z]$/.test(key)) {
      setCurrentWord((prev) => prev + key)
    }
  }, [gameState, currentWord, targetWord, guessedWords, presentLetters, correctLetters, handleWin, isProcessing, startTime])

  useEffect(() => {
    const handlePhysicalKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const key = e.key.toUpperCase()
      if (/^[A-Z]$/.test(key) || key === 'ENTER' || key === 'BACKSPACE') {
        e.preventDefault()
        handleKeyPress(
          key === 'ENTER' ? 'Enter' : key === 'BACKSPACE' ? 'Backspace' : key
        )
      }
    }

    if (gameState === 'playing') {
      window.addEventListener('keydown', handlePhysicalKeyPress)
    }
    return () => window.removeEventListener('keydown', handlePhysicalKeyPress)
  }, [handleKeyPress, gameState])

  // Grid Construction Logic
  const gridRows = Array.from({ length: 6 }, (_, rowIndex) => {
    if (rowIndex < guessedWords.length) {
      return {
        letters: guessedWords[rowIndex].word.split(''),
        states: guessedWords[rowIndex].states,
        isFlipping: Array(5).fill(true) // Trigger flip animation for past guesses if rebuilt, or just new ones
      }
    } else if (rowIndex === guessedWords.length) {
      const letters = currentWord
        .split('')
        .concat(Array(5 - currentWord.length).fill(''))
      const states: ('empty' | 'filled')[] = Array(5)
        .fill(null)
        .map((_, i) => (i < currentWord.length ? 'filled' : 'empty'))
      return {
        letters,
        states,
        isShaking,
        isFlipping: Array(5).fill(false)
      }
    } else {
      return {
        letters: Array(5).fill(''),
        states: Array(5).fill('empty') as ('empty' | 'filled')[],
      }
    }
  })

  // Determine if we should show the "flip" for the LATEST guess only
  const latestGuessIndex = guessedWords.length - 1

  const optimizedGridRows = gridRows.map((row, index) => ({
    ...row,
    isFlipping: index === latestGuessIndex ? Array(5).fill(true) : undefined
  }))


  return (
    <main className="h-[100svh] bg-background flex flex-col items-center py-4 px-4 overflow-hidden relative transition-colors duration-500">
      <Toaster
        position="top-center"
        expand={false}
        theme="system"
        className="font-sans"
        toastOptions={{
          className: 'bg-card text-card-foreground border-border rounded-2xl border-2 shadow-xl',
          style: {
            padding: '16px',
            fontSize: '16px',
            fontWeight: '600',
            backgroundColor: 'var(--background)',
            color: 'var(--foreground)',
            borderColor: 'var(--border)',
          },
        }}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
      />

      <AnimatePresence mode="wait">
        {gameState === 'menu' ? (
          <MainMenu
            key="main-menu"
            onStartGame={() => startGame(false)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
          />
        ) : (
          <motion.div
            key="game-board"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex-1 flex flex-col w-full max-w-lg"
          >
            {/* Header */}
            <header className="w-full flex items-center justify-between border-b pb-2 mb-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setGameState('menu')}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                  title="Back to Menu"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase relative group cursor-default">
                Wordle
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[var(--wordle-correct)] transition-all group-hover:w-full" />
              </h1>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsHowToPlayOpen(true)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                  title="How To Play"
                >
                  <HelpCircle className="w-6 h-6" />
                </button>
                <button
                  onClick={() => startGame(true)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                  title="Reset Game"
                >
                  <RotateCcw className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <SettingsIcon className="w-6 h-6" />
                </button>
              </div>
            </header>

            {/* Live Timer */}
            {(gameState === 'playing' || gameState === 'won' || gameState === 'lost') && (
              <div className="flex-none mt-15">
                <GameTimer startTime={startTime} gameState={gameState} />
              </div>
            )}

            {/* Game Grid */}
            <div className="flex-1 min-h-0 flex items-center justify-center w-full mb-2">
              <WordleGrid rows={optimizedGridRows} />
            </div>

            {/* Keyboard */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "backOut" }}
              className="w-full max-w-2xl mt-auto pb-4"
            >
              <WordleKeyboard
                onKeyPress={handleKeyPress}
                disabledLetters={disabledLetters}
                presentLetters={presentLetters}
                correctLetters={correctLetters}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Result Modal/Overlay */}
      <AnimatePresence>
        {(gameState === 'won' || gameState === 'lost') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-card border-2 shadow-2xl p-8 rounded-2xl max-w-sm w-full text-center space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-4xl font-bold">
                  {gameState === 'won' ? 'Winner!' : 'Game Over'}
                </h2>
                <div className="text-muted-foreground text-lg">
                  {gameState === 'won' ? (
                    <>
                      <p>You found it in {guessedWords.length} tries!</p>
                      <p className="font-mono text-xl text-primary font-bold mt-2">{gameDuration}</p>
                    </>
                  ) : (
                    <>
                      <p>The word was <span className="font-bold text-foreground">{targetWord}</span></p>
                      <p className="font-mono text-xl text-muted-foreground mt-2">{gameDuration}</p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => startGame(false)}
                  className="w-full py-4 bg-primary text-primary-foreground font-bold text-xl rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
                >
                  Play Again
                </button>
                <button
                  onClick={handleShare}
                  className="w-full py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-secondary/80 transition-all border-2 border-border"
                >
                  Share Score
                </button>
                <button
                  onClick={() => setGameState('menu')}
                  className="w-full py-3 bg-muted text-foreground font-semibold rounded-xl hover:bg-muted/80 transition-all"
                >
                  Main Menu
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
