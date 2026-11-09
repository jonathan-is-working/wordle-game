'use client'

import { X, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

interface SettingsModalProps {
    isOpen: boolean
    onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const { theme, setTheme } = useTheme()

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-card w-full max-w-md rounded-2xl shadow-2xl border-2 animate-in zoom-in-95 duration-200 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b bg-muted/30">
                    <h2 className="text-2xl font-bold">Options</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-muted rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Theme Toggle */}
                    <div className="flex items-center justify-between">
                        <div className="flex gap-3 items-center">
                            <div className="p-2 bg-muted rounded-lg text-foreground">
                                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                            </div>
                            <div>
                                <p className="font-semibold text-lg">Theme</p>
                                <p className="text-sm text-muted-foreground">{theme === 'dark' ? 'Dark' : 'Light'} Mode</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className={`w-14 h-8 rounded-full transition-colors relative focus:outline-hidden focus:ring-2 focus:ring-primary ${theme === 'dark' ? 'bg-primary' : 'bg-muted'
                                }`}
                        >
                            <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                                }`} />
                        </button>
                    </div>

                </div>

                <div className="p-4 bg-muted/30 text-center">
                    <p className="text-xs text-muted-foreground">Changes are saved automatically</p>
                </div>
            </div>
        </div>
    )
}
