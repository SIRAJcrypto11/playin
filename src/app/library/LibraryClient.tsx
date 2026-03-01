'use client'

import { useState } from 'react'
import { PlaylistModal } from '@/components/PlaylistModal'
import { Plus, Disc3 } from 'lucide-react'

export function LibraryClient({ playlists }: { playlists: any[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mb-8">
                {/* Create Playlist Card Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="group flex flex-col items-center justify-center gap-3 rounded-xl bg-neutral-900 border border-neutral-800 border-dashed p-6 transition-colors hover:bg-neutral-800 hover:border-neutral-700 min-h-[220px]"
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800 group-hover:bg-neutral-700 transition-colors">
                        <Plus className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-white">New Playlist</span>
                </button>

                {/* Existing Playlists */}
                {playlists.map((pl) => (
                    <div key={pl.id} className="group flex cursor-pointer flex-col gap-3 rounded-xl p-3 transition-colors hover:bg-neutral-800/50">
                        <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-neutral-800 shadow-md">
                            <Disc3 className="h-12 w-12 text-neutral-600" />
                        </div>
                        <div className="flex flex-col px-1">
                            <h3 className="truncate text-sm font-semibold text-white">{pl.name}</h3>
                            <p className="truncate text-xs text-neutral-400 mt-1">{pl.tracks?.length || 0} tracks</p>
                        </div>
                    </div>
                ))}
            </div>

            <PlaylistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    )
}
