'use client'

import { X } from 'lucide-react'

interface HowToPlayModalProps {
    isOpen: boolean
    onClose: () => void
}

export function HowToPlayModal({ isOpen, onClose }: HowToPlayModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-card w-full max-w-lg rounded-2xl shadow-2xl border-2 animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b bg-muted/30">
                    <h2 className="text-2xl font-bold">How To Play</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-muted rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 space-y-6 overflow-y-auto">
                    <p className="text-lg">
                        Guess the <span className="font-bold">WORDLE</span> in 6 tries.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Each guess must be a valid 5-letter word.</li>
                        <li>The color of the tiles will change to show how close your guess was to the word.</li>
                    </ul>

                    <div className="space-y-4">
                        <h3 className="font-bold">Examples</h3>

                        {/* Correct */}
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <div className="w-10 h-10 flex items-center justify-center bg-[var(--wordle-correct)] text-white font-bold text-xl rounded shadow-sm">W</div>
                                <div className="w-10 h-10 flex items-center justify-center border-2 border-[var(--wordle-empty-border)] font-bold text-xl rounded">E</div>
                                <div className="w-10 h-10 flex items-center justify-center border-2 border-[var(--wordle-empty-border)] font-bold text-xl rounded">A</div>
                                <div className="w-10 h-10 flex items-center justify-center border-2 border-[var(--wordle-empty-border)] font-bold text-xl rounded">R</div>
                                <div className="w-10 h-10 flex items-center justify-center border-2 border-[var(--wordle-empty-border)] font-bold text-xl rounded">Y</div>
                            </div>
                            <p className="text-sm"><span className="font-bold">W</span> is in the word and in the correct spot.</p>
                        </div>

                        {/* Present */}
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <div className="w-10 h-10 flex items-center justify-center border-2 border-[var(--wordle-empty-border)] font-bold text-xl rounded">P</div>
                                <div className="w-10 h-10 flex items-center justify-center bg-[var(--wordle-present)] text-white font-bold text-xl rounded shadow-sm">I</div>
                                <div className="w-10 h-10 flex items-center justify-center border-2 border-[var(--wordle-empty-border)] font-bold text-xl rounded">L</div>
                                <div className="w-10 h-10 flex items-center justify-center border-2 border-[var(--wordle-empty-border)] font-bold text-xl rounded">L</div>
                                <div className="w-10 h-10 flex items-center justify-center border-2 border-[var(--wordle-empty-border)] font-bold text-xl rounded">S</div>
                            </div>
                            <p className="text-sm"><span className="font-bold">I</span> is in the word but in the wrong spot.</p>
                        </div>

                        {/* Absent */}
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <div className="w-10 h-10 flex items-center justify-center border-2 border-[var(--wordle-empty-border)] font-bold text-xl rounded">V</div>
                                <div className="w-10 h-10 flex items-center justify-center border-2 border-[var(--wordle-empty-border)] font-bold text-xl rounded">A</div>
                                <div className="w-10 h-10 flex items-center justify-center border-2 border-[var(--wordle-empty-border)] font-bold text-xl rounded">G</div>
                                <div className="w-10 h-10 flex items-center justify-center bg-[var(--wordle-absent)] text-white/90 font-bold text-xl rounded shadow-sm">U</div>
                                <div className="w-10 h-10 flex items-center justify-center border-2 border-[var(--wordle-empty-border)] font-bold text-xl rounded">E</div>
                            </div>
                            <p className="text-sm"><span className="font-bold">U</span> is not in the word in any spot.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
