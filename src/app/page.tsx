import { getTrendingMusic } from '@/lib/api'
import { TrackGrid } from '@/components/TrackGrid'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const trendingTracks = await getTrendingMusic()

  return (
    <div className="p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Good afternoon</h1>
        <p className="text-neutral-400">Jump back into your recent favorites.</p>
      </header>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Quick picks</h2>
        <TrackGrid tracks={trendingTracks} />
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Recommended for you</h2>
        <TrackGrid tracks={trendingTracks.slice().reverse().slice(0, 12)} />
      </section>
    </div>
  )
}
