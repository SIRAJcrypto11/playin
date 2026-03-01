import Link from 'next/link'
import { Home, Compass, Library } from 'lucide-react'
import { LocalFilePicker } from './LocalFilePicker'

export function Sidebar() {
    return (
        <aside className="hidden h-full w-64 flex-col bg-black p-4 text-white md:flex">
            <div className="mb-8 flex items-center px-4">
                <div className="text-2xl font-bold tracking-tight text-white">
                    Play<span className="text-red-500">In</span>
                </div>
            </div>
            <nav className="space-y-2">
                <Link
                    href="/"
                    className="flex items-center gap-4 rounded-md px-4 py-3 text-sm font-medium text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
                >
                    <Home className="h-5 w-5" />
                    Home
                </Link>
                <Link
                    href="/explore"
                    className="flex items-center gap-4 rounded-md px-4 py-3 text-sm font-medium text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
                >
                    <Compass className="h-5 w-5" />
                    Explore
                </Link>
                <Link
                    href="/library"
                    className="flex items-center gap-4 rounded-md px-4 py-3 text-sm font-medium text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
                >
                    <Library className="h-5 w-5" />
                    Library
                </Link>
            </nav>

            <div className="mt-8 px-1">
                <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Local Files
                </p>
                <LocalFilePicker />
            </div>
            {/* Scrollable playlist list later goes here */}
        </aside>
    )
}
