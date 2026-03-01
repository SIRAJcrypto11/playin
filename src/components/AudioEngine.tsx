'use client'

import ReactPlayer from 'react-player'
import { usePlayerStore } from '@/store/usePlayerStore'
import { useEffect, useRef, useState } from 'react'

const Player: any = ReactPlayer

export function AudioEngine() {
    const { currentTrack, isPlaying, volume, next, setProgress, setDuration } = usePlayerStore()
    const [hasWindow, setHasWindow] = useState(false)
    const playerRef = useRef<any>(null)
    const [errorCount, setErrorCount] = useState(0)

    useEffect(() => {
        setHasWindow(true)
    }, [])

    // Reset error count when track changes
    useEffect(() => {
        setErrorCount(0)
    }, [currentTrack?.videoId])

    if (!hasWindow || !currentTrack) return null

    const handlePlayerError = (e: any) => {
        console.error("Playback error:", e)
        // If error persists for the same track, skip to next
        if (errorCount > 2) {
            console.warn("Too many errors, skipping to next track.")
            next()
        } else {
            setErrorCount(prev => prev + 1)
        }
    }

    return (
        <div className="hidden">
            <Player
                ref={playerRef}
                url={`https://www.youtube.com/watch?v=${currentTrack.videoId}`}
                playing={isPlaying}
                volume={volume}
                onEnded={next}
                onError={handlePlayerError}
                onProgress={(state: any) => setProgress(state.playedSeconds)}
                onDuration={(duration: any) => setDuration(duration)}
                width="0"
                height="0"
                config={{
                    youtube: {
                        playerVars: {
                            showinfo: 0,
                            autoPlay: 1,
                            controls: 0,
                            origin: typeof window !== 'undefined' ? window.location.origin : '',
                            modestbranding: 1,
                            rel: 0
                        }
                    } as any
                }}
            />
        </div>
    )
}
