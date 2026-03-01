'use client'

import ReactPlayer from 'react-player'
import { usePlayerStore } from '@/store/usePlayerStore'
import { useEffect, useRef, useState } from 'react'
import type { ReactPlayerProps } from 'react-player/types/lib'

export function AudioEngine() {
    const { currentTrack, isPlaying, volume, next, setProgress, setDuration } = usePlayerStore()
    const [hasWindow, setHasWindow] = useState(false)
    const playerRef = useRef<ReactPlayer>(null)

    useEffect(() => {
        setHasWindow(true)
    }, [])

    if (!hasWindow || !currentTrack) return null

    return (
        <div className="hidden">
            <ReactPlayer
                ref={playerRef}
                url={`https://www.youtube.com/watch?v=${currentTrack.videoId}`}
                playing={isPlaying}
                volume={volume}
                onEnded={next}
                onProgress={(state: { playedSeconds: number }) => setProgress(state.playedSeconds)}
                onDuration={(duration: number) => setDuration(duration)}
                width="0"
                height="0"
                config={{
                    youtube: {
                        playerVars: { showinfo: 0, autoPlay: 1, controls: 0 }
                    }
                }}
            />
        </div>
    )
}
