/**
 * Client API for fetching music utilizing public Piped instances
 * Robust multi-instance support with auto-failover
 */

const PIPED_INSTANCES = [
    'https://pipedapi.kavin.rocks',
    'https://api.piped.victr.me',
    'https://piped-api.lunar.icu',
    'https://api-piped.mha.fi',
    'https://pipedapi.berrytube.tv'
]

export interface Track {
    videoId: string
    title: string
    uploaderName: string
    uploaderUrl: string
    thumbnail: string
    duration: number
    views: number
}

async function fetchWithFailover(endpoint: string, options?: RequestInit): Promise<any> {
    let lastError = null;

    for (const instance of PIPED_INSTANCES) {
        try {
            const res = await fetch(`${instance}${endpoint}`, {
                ...options,
                signal: AbortSignal.timeout(5000) // 5s timeout per instance
            });

            if (res.ok) {
                return await res.json();
            }

            console.warn(`Instance ${instance} returned status ${res.status}`);
        } catch (error) {
            console.warn(`Failed to fetch from ${instance}:`, error);
            lastError = error;
        }
    }

    throw lastError || new Error('All Piped instances failed');
}

export async function searchMusic(query: string): Promise<Track[]> {
    try {
        const data = await fetchWithFailover(`/search?q=${encodeURIComponent(query)}&filter=music_songs`, {
            next: { revalidate: 3600 }
        });

        return (data.items || [])
            .filter((item: any) => item.type === 'stream')
            .map((item: any) => ({
                videoId: item.url.split('/watch?v=')[1],
                title: item.title,
                uploaderName: item.uploaderName,
                uploaderUrl: item.uploaderUrl,
                thumbnail: item.thumbnail,
                duration: item.duration,
                views: item.views,
            }));
    } catch (error) {
        console.error("Search error after all retries:", error);
        return [];
    }
}

export async function getTrendingMusic(): Promise<Track[]> {
    try {
        const data = await fetchWithFailover('/trending?region=US', {
            next: { revalidate: 3600 }
        });

        return (data || [])
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
            }));
    } catch (error) {
        console.error("Trending error after all retries:", error);
        return [];
    }
}
