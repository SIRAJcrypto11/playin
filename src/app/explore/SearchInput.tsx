'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { Search, Loader2, X } from 'lucide-react'

export function SearchInput({ initialValue = '' }: { initialValue?: string }) {
    const router = useRouter()
    const [value, setValue] = useState(initialValue)
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (value !== initialValue) {
                startTransition(() => {
                    if (value.trim()) {
                        router.push(`/explore?q=${encodeURIComponent(value)}`)
                    } else {
                        router.push('/explore')
                    }
                })
            }
        }, 500)

        return () => clearTimeout(timeout)
    }, [value, initialValue, router])

    return (
        <div className="relative flex items-center w-full h-12 rounded-full bg-neutral-900 overflow-hidden border border-neutral-800 focus-within:border-neutral-700 focus-within:ring-1 focus-within:ring-neutral-700 transition-all shadow-inner">
            <div className="grid place-items-center h-full w-12 text-neutral-400">
                {isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin text-red-500" />
                ) : (
                    <Search className="h-5 w-5" />
                )}
            </div>
            <input
                className="peer h-full w-full outline-none text-sm text-white pr-2 bg-transparent placeholder-neutral-500"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search songs, artists, or podcasts..."
            />
            {value && (
                <button
                    onClick={() => setValue('')}
                    className="grid place-items-center h-full w-10 text-neutral-400 hover:text-white transition-colors"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    )
}
