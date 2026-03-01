import { create } from 'zustand'
import type { Track } from '@/lib/api'

interface PlayerState {
    currentTrack: Track | null
    queue: Track[]
    isPlaying: boolean
    volume: number
    progress: number // in seconds
    duration: number

    // Actions
    playTrack: (track: Track, queue?: Track[]) => void
    togglePlay: () => void
    pause: () => void
    play: () => void
    next: () => void
    prev: () => void
    setVolume: (volume: number) => void
    setProgress: (progress: number) => void
    setDuration: (duration: number) => void
    addToQueue: (track: Track) => void
    removeFromQueue: (index: number) => void
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
    currentTrack: null,
    queue: [],
    isPlaying: false,
    volume: 0.8,
    progress: 0,
    duration: 0,

    playTrack: (track, queue) => {
        set({
            currentTrack: track,
            isPlaying: true,
            progress: 0,
            duration: track.duration,
            queue: queue ?? get().queue,
        })
    },

    togglePlay: () => {
        const { currentTrack, isPlaying } = get()
        if (!currentTrack) return
        set({ isPlaying: !isPlaying })
    },

    pause: () => set({ isPlaying: false }),
    play: () => {
        if (get().currentTrack) set({ isPlaying: true })
    },

    next: () => {
        const { currentTrack, queue } = get()
        if (!currentTrack || queue.length === 0) return

        const currentIndex = queue.findIndex(t => t.videoId === currentTrack.videoId)
        if (currentIndex !== -1 && currentIndex < queue.length - 1) {
            const nextTrack = queue[currentIndex + 1]
            set({ currentTrack: nextTrack, progress: 0, isPlaying: true, duration: nextTrack.duration })
        }
    },

    prev: () => {
        const { currentTrack, queue, progress } = get()
        if (!currentTrack || queue.length === 0) return

        // If played more than 3 seconds, rewind to start
        if (progress > 3) {
            set({ progress: 0 })
            return
        }

        const currentIndex = queue.findIndex(t => t.videoId === currentTrack.videoId)
        if (currentIndex > 0) {
            const prevTrack = queue[currentIndex - 1]
            set({ currentTrack: prevTrack, progress: 0, isPlaying: true, duration: prevTrack.duration })
        }
    },

    setVolume: (volume) => set({ volume }),
    setProgress: (progress) => set({ progress }),
    setDuration: (duration) => set({ duration }),

    addToQueue: (track) => set((state) => ({ queue: [...state.queue, track] })),
    removeFromQueue: (index) => set((state) => ({
        queue: state.queue.filter((_, i) => i !== index)
    })),
}))
