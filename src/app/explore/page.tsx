import { getTrendingMusic, searchMusic } from '@/lib/api'
import { TrackGrid } from '@/components/TrackGrid'
import { SearchInput } from './SearchInput'

export const dynamic = 'force-dynamic'

interface ExplorePageProps {
    searchParams: Promise<{ q?: string }>
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
    const { q } = await searchParams

    const tracks = q
        ? await searchMusic(q)
        : await getTrendingMusic()

    return (
        <div className="p-6 md:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                    {q ? `Search results for "${q}"` : 'Explore'}
                </h1>
                <p className="text-neutral-400">
                    {q ? `Found ${tracks.length} tracks` : 'Discover new music and trending hits.'}
                </p>
            </header>

            <div className="mb-10 max-w-xl">
                <SearchInput initialValue={q} />
            </div>

            <section>
                <h2 className="text-2xl font-bold mb-6">
                    {q ? 'Results' : 'Trending Now'}
                </h2>
                {tracks.length > 0 ? (
                    <TrackGrid tracks={tracks} />
                ) : (
                    <div className="flex h-60 w-full flex-col items-center justify-center rounded-xl bg-neutral-900/50 border border-neutral-800">
                        <p className="text-neutral-400">No tracks found. Try a different search.</p>
                    </div>
                )}
            </section>
        </div>
    )
}
