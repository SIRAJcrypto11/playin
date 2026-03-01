import Image from 'next/image'
import { Play, MoreHorizontal, Plus } from 'lucide-react'
import type { Track } from '@/lib/api'

interface TrackListProps {
    tracks: Track[]
    onPlay?: (track: Track) => void
}

export function TrackList({ tracks, onPlay }: TrackListProps) {
    function formatDuration(seconds: number) {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m}:${s < 10 ? '0' : ''}${s}`
    }

    return (
        <div className="flex flex-col w-full">
            {tracks.map((track, index) => (
                <div
                    key={track.videoId + index}
                    className="group flex items-center justify-between rounded-md p-2 transition-colors hover:bg-neutral-800/50"
                >
                    <div className="flex items-center gap-4 min-w-0 pr-4">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-neutral-800">
                            <Image
                                src={track.thumbnail}
                                alt={track.title}
                                fill
                                className="object-cover"
                                sizes="48px"
                            />
                            <div
                                className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
                                onClick={() => onPlay?.(track)}
                            >
                                <Play className="h-5 w-5 fill-current text-white" />
                            </div>
                        </div>

                        <div className="flex flex-col min-w-0">
                            <span className="truncate text-sm font-medium text-white" title={track.title}>
                                {track.title}
                            </span>
                            <span className="truncate text-xs text-neutral-400" title={track.uploaderName}>
                                {track.uploaderName}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-neutral-400">
                        <span className="hidden text-xs md:block">{formatDuration(track.duration)}</span>
                        <button className="opacity-0 transition-opacity group-hover:opacity-100 hover:text-white" title="Add to Playlist">
                            <Plus className="h-5 w-5" />
                        </button>
                        <button className="opacity-0 transition-opacity group-hover:opacity-100 hover:text-white">
                            <MoreHorizontal className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
