import Image from 'next/image'
import { Play } from 'lucide-react'
import type { Track } from '@/lib/api'

interface TrackCardProps {
    track: Track
    onClick?: (track: Track) => void
}

export function TrackCard({ track, onClick }: TrackCardProps) {
    function formatDuration(seconds: number) {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m}:${s < 10 ? '0' : ''}${s}`
    }

    return (
        <div
            onClick={() => onClick?.(track)}
            className="group flex cursor-pointer min-w-0 flex-col gap-3 rounded-xl p-3 transition-colors hover:bg-neutral-800/50"
        >
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-800 shadow-md">
                <Image
                    src={track.thumbnail}
                    alt={track.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 20vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-xl transition-transform hover:scale-105">
                        <Play className="h-6 w-6 ml-1 fill-current" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col px-1">
                <h3 className="truncate text-sm font-semibold text-white drop-shadow-sm" title={track.title}>
                    {track.title}
                </h3>
                <p className="truncate text-xs text-neutral-400 mt-1" title={track.uploaderName}>
                    {track.uploaderName}
                </p>
            </div>
        </div>
    )
}

export function TrackCardSkeleton() {
    return (
        <div className="flex min-w-0 flex-col gap-3 rounded-xl p-3">
            <div className="aspect-square w-full animate-pulse rounded-lg bg-neutral-800" />
            <div className="flex flex-col gap-2 px-1">
                <div className="h-4 w-11/12 animate-pulse rounded bg-neutral-800" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-neutral-800" />
            </div>
        </div>
    )
}
