'use client'

import { useState } from 'react'
import { createPlaylist } from '@/lib/actions'
import { Plus, X, Loader2 } from 'lucide-react'

export function PlaylistModal({ isOpen, onClose, selectedTrack }: { isOpen: boolean, onClose: () => void, selectedTrack?: any }) {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    if (!isOpen) return null

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name) return
        setLoading(true)
        try {
            await createPlaylist(name)
            // Implementation extension: if selectedTrack is passed, also execute addTrackToPlaylist
            onClose()
            setName('')
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold text-white mb-6">Create New Playlist</h2>
                <form onSubmit={handleCreate} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs text-neutral-400 font-medium ml-1">PLAYLIST NAME</label>
                        <input
                            autoFocus
                            disabled={loading}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="My Awesome Mix"
                            className="w-full flex h-12 rounded-lg bg-black px-4 py-2 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 transition-all border border-neutral-800"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!name || loading}
                        className="w-full flex h-12 items-center justify-center rounded-full bg-white text-black font-semibold hover:bg-neutral-200 focus:ring-4 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Playlist'}
                    </button>
                </form>
            </div>
        </div>
    )
}
