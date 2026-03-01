import { getTrendingMusic } from '@/lib/api'
import { ExploreClientHandler } from './ExploreClientHandler'

export const dynamic = 'force-dynamic'

export default async function ExplorePage() {
    const trendingTracks = await getTrendingMusic()

    return (
        <div className="p-6 md:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Explore</h1>
                <p className="text-neutral-400">Discover new music and trending hits.</p>
            </header>

            {/* Search Input Placeholder */}
            <div className="mb-8 max-w-xl">
                <div className="relative flex items-center w-full h-12 rounded-full focus-within:shadow-lg bg-neutral-900 overflow-hidden border border-neutral-800 focus-within:border-neutral-700 transition-colors">
                    <div className="grid place-items-center h-full w-12 text-neutral-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        className="peer h-full w-full outline-none text-sm text-white pr-2 bg-transparent placeholder-neutral-500"
                        type="text"
                        id="search"
                        placeholder="Search songs, artists, or podcasts..."
                    />
                </div>
            </div>

            <section>
                <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
                <ExploreClientHandler tracks={trendingTracks} />
            </section>
        </div>
    )
}
