'use client'

import { Play, SkipBack, SkipForward, Volume2 } from 'lucide-react'

export function Player() {
    return (
        <div className="flex h-20 w-full items-center justify-between border-t border-neutral-800 bg-[#030303] px-4">
            {/* Track Info */}
            <div className="flex w-1/4 min-w-0 items-center gap-4">
                <div className="h-12 w-12 shrink-0 animate-pulse rounded-md bg-neutral-800" />
                <div className="flex min-w-0 flex-col py-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-neutral-800" />
                    <div className="mt-2 h-3 w-24 animate-pulse rounded bg-neutral-800" />
                </div>
            </div>

            {/* Controls */}
            <div className="flex max-w-xl flex-1 flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-6">
                    <button className="text-neutral-400 transition-colors hover:text-white">
                        <SkipBack className="h-5 w-5 fill-current" />
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 active:scale-95">
                        <Play className="h-5 w-5 fill-current" />
                    </button>
                    <button className="text-neutral-400 transition-colors hover:text-white">
                        <SkipForward className="h-5 w-5 fill-current" />
                    </button>
                </div>

                {/* Progress Bar (Skeleton) */}
                <div className="flex w-full items-center gap-2 text-xs text-neutral-400">
                    <span>0:00</span>
                    <div className="h-1 flex-1 rounded-full bg-neutral-800">
                        <div className="h-full w-1/3 rounded-full bg-white" />
                    </div>
                    <span>0:00</span>
                </div>
            </div>

            {/* Additional Controls */}
            <div className="flex w-1/4 items-center justify-end gap-2 text-neutral-400">
                <Volume2 className="h-5 w-5" />
                <div className="h-1 w-24 rounded-full bg-neutral-800">
                    <div className="h-full w-2/3 rounded-full bg-white" />
                </div>
            </div>
        </div>
    )
}
