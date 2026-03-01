'use client'

import { TrackCard, TrackCardSkeleton } from '@/components/TrackCard'
import { usePlayerStore } from '@/store/usePlayerStore'
import type { Track } from '@/lib/api'
import { motion, type Variants } from 'framer-motion'

const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
}

const itemVars: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', bounce: 0.4 } }
}

export function TrackGrid({ tracks }: { tracks: Track[] }) {
    const { playTrack } = usePlayerStore()

    if (!tracks || tracks.length === 0) {
        return (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {Array.from({ length: 12 }).map((_, i) => (
                    <TrackCardSkeleton key={i} />
                ))}
            </div>
        )
    }

    return (
        <motion.div
            variants={containerVars}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
        >
            {tracks.map((track) => (
                <motion.div key={track.videoId || track.url} variants={itemVars}>
                    <TrackCard
                        track={track}
                        onClick={(t) => playTrack(t, tracks)}
                    />
                </motion.div>
            ))}
        </motion.div>
    )
}
