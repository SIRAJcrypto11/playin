import { auth } from '@/auth'
import { getUserPlaylists } from '@/lib/actions'
import { LibraryClient } from './LibraryClient'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function LibraryPage() {
    const session = await auth()

    if (!session?.user) {
        // Return a beautiful empty state requiring login
        return (
            <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h2 className="mb-2 text-2xl font-bold text-white">Save your favorite music</h2>
                <p className="mb-8 max-w-sm text-neutral-400">Login to create custom playlists and save tracks to listen to them anytime.</p>
                <a
                    href="/api/auth/signin"
                    className="rounded-full bg-white px-8 py-3 font-semibold text-black transition-transform hover:scale-105 active:scale-95"
                >
                    Login / Sign Up
                </a>
            </div>
        )
    }

    const playlists = await getUserPlaylists()

    return (
        <div className="p-6 md:p-8">
            <header className="mb-8 flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Your Library</h1>
                    <p className="text-neutral-400">Playlists created by {session.user.name || session.user.email}</p>
                </div>
            </header>

            <LibraryClient playlists={playlists} />
        </div>
    )
}
