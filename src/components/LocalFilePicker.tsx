'use client'

import { useRef, useState } from 'react'
import { FolderPlus, Loader2 } from 'lucide-react'
import { usePlayerStore } from '@/store/usePlayerStore'
import type { Track } from '@/lib/api'

export function LocalFilePicker() {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { playTrack, queue } = usePlayerStore()
    const [isLoading, setIsLoading] = useState(false)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setIsLoading(true)
        try {
            const file = files[0]
            const url = URL.createObjectURL(file)

            // Basic metadata extraction from filename
            const title = file.name.replace(/\.[^/.]+$/, "") // Remove extension

            const localTrack: Track = {
                title: title,
                uploaderName: 'Local File',
                uploaderUrl: '#',
                thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop&q=80', // Default vinyl/music thumbnail
                duration: 0, // Will be updated by AudioEngine onLoaded
                views: 0,
                url: url,
                isLocal: true
            }

            playTrack(localTrack, [localTrack, ...queue])
        } catch (error) {
            console.error("Error loading local file:", error)
        } finally {
            setIsLoading(false)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="audio/*"
                className="hidden"
            />
            <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="flex w-full items-center gap-4 rounded-lg px-3 py-2 text-sm font-medium text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
            >
                {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    <FolderPlus className="h-5 w-5" />
                )}
                <span>Play Local Music</span>
            </button>
        </>
    )
}
