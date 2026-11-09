'use client'

import { Play } from 'lucide-react'
import { useState } from 'react'

import { motion } from 'framer-motion'

interface MainMenuProps {
    onStartGame: () => void
    onOpenSettings: () => void
    onOpenHowToPlay: () => void
}

export function MainMenu({ onStartGame, onOpenSettings, onOpenHowToPlay }: MainMenuProps) {
    const [isHoveringPlay, setIsHoveringPlay] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-start pt-[15vh] w-full h-full flex-1 text-center space-y-12"
        >
            <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-2 drop-shadow-[var(--wordle-correct)]">
                    <motion.span
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-[var(--wordle-correct)] inline-block"
                    >W</motion.span>
                    <motion.span
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-[var(--wordle-present)] inline-block"
                    >O</motion.span>
                    <motion.span
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-[var(--wordle-absent)] inline-block"
                    >R</motion.span>
                    <motion.span
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-[var(--wordle-correct)] inline-block"
                    >D</motion.span>
                    <motion.span
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-[var(--wordle-present)] inline-block"
                    >L</motion.span>
                    <motion.span
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-[var(--wordle-absent)] inline-block"
                    >E</motion.span>
                </h1>
                <p className="text-2xl text-muted-foreground font-medium tracking-wide">
                    Can you guess the word?
                </p>
            </div>

            <div className="flex flex-col gap-6 w-full max-w-xs">
                <button
                    onClick={onStartGame}
                    onMouseEnter={() => setIsHoveringPlay(true)}
                    onMouseLeave={() => setIsHoveringPlay(false)}
                    className="group relative flex items-center justify-center gap-3 px-8 py-5 bg-[var(--wordle-correct)] text-white text-2xl font-black rounded-3xl shadow-[0_8px_0_oklch(0.55_0.2_145)] hover:shadow-[0_4px_0_oklch(0.55_0.2_145)] hover:translate-y-1 active:shadow-none active:translate-y-2 transition-all duration-150 overflow-hidden outline-none"
                >
                    <Play className="w-8 h-8 fill-current" />
                    PLAY NOW
                </button>

                <div className="flex gap-4 justify-center">
                    <button
                        onClick={onOpenHowToPlay}
                        className="flex-1 py-4 bg-[var(--wordle-present)] text-white font-bold text-lg rounded-2xl shadow-[0_6px_0_oklch(0.65_0.18_85)] hover:shadow-[0_3px_0_oklch(0.65_0.18_85)] hover:translate-y-[3px] active:shadow-none active:translate-y-[6px] transition-all outline-none uppercase"
                    >
                        How to Play
                    </button>

                    <button
                        onClick={onOpenSettings}
                        className="flex-1 py-4 bg-[var(--wordle-absent)] text-white font-bold text-lg rounded-2xl shadow-[0_6px_0_oklch(0.35_0.02_260)] hover:shadow-[0_3px_0_oklch(0.35_0.02_260)] hover:translate-y-[3px] active:shadow-none active:translate-y-[6px] transition-all outline-none uppercase"
                    >
                        Options
                    </button>
                </div>
            </div>

            <div className="absolute bottom-4 text-sm text-muted-foreground/50 font-mono">
                v1.0 • jojorequiem
            </div>
        </motion.div>
    )
}
