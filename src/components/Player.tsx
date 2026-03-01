'use client'

import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'
import Image from 'next/image'
import { usePlayerStore } from '@/store/usePlayerStore'
import { useState, useRef } from 'react'

export function Player() {
    const { currentTrack, isPlaying, progress, duration, togglePlay, next, prev, volume, setVolume, setProgress } = usePlayerStore()

    function formatTime(seconds: number) {
        if (!seconds || isNaN(seconds)) return '0:00'
        const m = Math.floor(seconds / 60)
        const s = Math.floor(seconds % 60)
        return `${m}:${s < 10 ? '0' : ''}${s}`
    }

    const toggleMute = () => {
        if (volume > 0) setVolume(0)
        else setVolume(0.8)
    }

    // Handle Seek functionality (Visual Only, real seek requires refs to react-player not just setProgress)
    // For standard usage, since we can't easily seek a youtube video without the instance ref,
    // we could pass an event up or expose seekTo from AudioEngine.
    // We'll keep it simple for now as progress display.

    if (!currentTrack) {
        return (
            <div className="flex h-20 w-full items-center justify-between border-t border-neutral-800 bg-[#030303] px-4 opacity-50 pointer-events-none">
                <div className="flex w-1/4 items-center gap-4">
                    <div className="h-12 w-12 rounded-md bg-neutral-800" />
                    <div className="flex flex-col py-2">
                        <div className="h-4 w-32 rounded bg-neutral-800" />
                    </div>
                </div>
                <div className="flex flex-1 flex-col items-center justify-center gap-2">
                    <div className="flex items-center gap-6">
                        <SkipBack className="h-5 w-5 text-neutral-600" />
                        <Play className="h-5 w-5 text-neutral-600" />
                        <SkipForward className="h-5 w-5 text-neutral-600" />
                    </div>
                </div>
                <div className="w-1/4" />
            </div>
        )
    }

    const progressPercent = duration > 0 ? (progress / duration) * 100 : 0

    return (
        <div className="flex h-20 w-full items-center justify-between border-t border-neutral-800 bg-[#030303] px-4 transition-all duration-200">
            <div className="flex w-1/4 min-w-0 items-center gap-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-neutral-800">
                    <Image src={currentTrack.thumbnail} alt={currentTrack.title} fill className="object-cover" sizes="48px" />
                </div>
                <div className="flex min-w-0 flex-col py-2">
                    <div className="truncate text-sm font-semibold text-white" title={currentTrack.title}>
                        {currentTrack.title}
                    </div>
                    <div className="truncate text-xs text-neutral-400 mt-0.5" title={currentTrack.uploaderName}>
                        {currentTrack.uploaderName}
                    </div>
                </div>
            </div>

            <div className="flex max-w-xl flex-1 flex-col items-center justify-center gap-1.5">
                <div className="flex items-center gap-6">
                    <button onClick={prev} className="text-neutral-400 transition-colors hover:text-white active:scale-95">
                        <SkipBack className="h-5 w-5 fill-current" />
                    </button>
                    <button
                        onClick={togglePlay}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 active:scale-95"
                    >
                        {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current translate-x-0.5" />}
                    </button>
                    <button onClick={next} className="text-neutral-400 transition-colors hover:text-white active:scale-95">
                        <SkipForward className="h-5 w-5 fill-current" />
                    </button>
                </div>

                <div className="flex w-full items-center gap-2 text-xs text-neutral-400">
                    <span className="w-8 text-right font-variant-numeric">{formatTime(progress)}</span>
                    <div className="relative h-1 flex-1 rounded-full bg-neutral-800 overflow-hidden">
                        <div
                            className="absolute left-0 top-0 h-full bg-white transition-all"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <span className="w-8 font-variant-numeric">{formatTime(duration)}</span>
                </div>
            </div>

            <div className="flex w-1/4 items-center justify-end gap-3 text-neutral-400">
                <button onClick={toggleMute} className="transition-colors hover:text-white">
                    {volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
                <div
                    className="group relative h-1 w-24 cursor-pointer rounded-full bg-neutral-800"
                    onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        const percent = (e.clientX - rect.left) / rect.width
                        setVolume(Math.max(0, Math.min(1, percent)))
                    }}
                >
                    <div
                        className="absolute left-0 top-0 h-full bg-white transition-all group-hover:bg-red-500"
                        style={{ width: `${volume * 100}%` }}
                    />
                </div>
            </div>
        </div>
    )
}
