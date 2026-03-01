/**
 * Client API for fetching music utilizing public Piped instances
 * Ultra-robust multi-instance support with auto-failover and load distribution (shuffling)
 */

const PIPED_INSTANCES = [
    'https://pipedapi.kavin.rocks',
    'https://api.piped.victr.me',
    'https://pipedapi.privacydev.net',
    'https://api-piped.mha.fi',
    'https://pipedapi.berrytube.tv',
    'https://pipedapi.astartes.nl',
    'https://pipedapi.hostux.net',
    'https://pipedapi.ramble.moe',
    'https://pipedapi.moomoo.me',
    'https://pipedapi.syndr.me',
    'https://api.piped.privacy.com.de'
]

/**
 * Shuffles an array in place (Fisher-Yates)
 */
function shuffleArray<T>(array: T[]): T[] {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

export interface Track {
    videoId?: string
    title: string
    uploaderName: string
    uploaderUrl: string
    thumbnail: string
    duration: number
    views: number
    url?: string // Optional URL for local files
    isLocal?: boolean // Flag for local files
}

async function fetchWithFailover(endpoint: string, options?: RequestInit): Promise<any> {
    let lastError = null;

    // Shuffle instances to distribute load and avoid synchronized rate-limiting
    const shuffledInstances = shuffleArray(PIPED_INSTANCES);

    for (const instance of shuffledInstances) {
        try {
            const res = await fetch(`${instance}${endpoint}`, {
                ...options,
                // Reduced timeout for faster failover (3-4s is better for snappy UI)
                signal: AbortSignal.timeout(4000)
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
