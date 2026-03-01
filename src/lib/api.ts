/**
 * Client API for fetching music utilizing public Piped instances
 * Fallback to standard mock if Piped API instance is down
 */

const PIPED_API_URL = 'https://pipedapi.kavin.rocks'

export interface Track {
    videoId: string
    title: string
    uploaderName: string
    uploaderUrl: string
    thumbnail: string
    duration: number
    views: number
}

export async function searchMusic(query: string): Promise<Track[]> {
    try {
        const res = await fetch(`${PIPED_API_URL}/search?q=${encodeURIComponent(query)}&filter=music_songs`, {
            next: { revalidate: 3600 } // cache for 1 hour
        })

        if (!res.ok) throw new Error('Failed to fetch from Piped API')

        const data = await res.json()
        return data.items
            .filter((item: any) => item.type === 'stream')
            .map((item: any) => ({
                videoId: item.url.split('/watch?v=')[1],
                title: item.title,
                uploaderName: item.uploaderName,
                uploaderUrl: item.uploaderUrl,
                thumbnail: item.thumbnail,
                duration: item.duration,
                views: item.views,
            }))
    } catch (error) {
        console.error("Search error:", error)
        return []
    }
}

export async function getTrendingMusic(): Promise<Track[]> {
    try {
        // Trending music endpoints might vary, using a generic music search as an alternative
        const res = await fetch(`${PIPED_API_URL}/trending?region=US`, {
            next: { revalidate: 3600 }
        })

        if (!res.ok) throw new Error('Failed to fetch trending from Piped API')

        const data = await res.json()
        return data
            .filter((item: any) => item.type === 'stream')
            .slice(0, 24)
            .map((item: any) => ({
                videoId: item.url.split('/watch?v=')[1],
                title: item.title,
                uploaderName: item.uploaderName,
                uploaderUrl: item.uploaderUrl,
                thumbnail: item.thumbnail,
                duration: item.duration,
                views: item.views,
            }))
    } catch (error) {
        console.error("Trending error:", error)
        return []
    }
}
