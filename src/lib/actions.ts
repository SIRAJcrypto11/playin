'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'

export async function createPlaylist(name: string, description?: string) {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Unauthorized')

    const playlist = await prisma.playlist.create({
        data: {
            name,
            description,
            userId: session.user.id,
        }
    })

    revalidatePath('/library')
    return playlist
}

export async function addTrackToPlaylist(playlistId: string, track: any) {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Unauthorized')

    // Verify ownership
    const playlist = await prisma.playlist.findUnique({ where: { id: playlistId } })
    if (!playlist || playlist.userId !== session.user.id) throw new Error('Unauthorized')

    // Add the track to playlist
    const newTrack = await prisma.playlistTrack.create({
        data: {
            playlistId,
            videoId: track.videoId,
            title: track.title,
            uploaderName: track.uploaderName,
            thumbnail: track.thumbnail,
            duration: track.duration,
            position: await prisma.playlistTrack.count({ where: { playlistId } })
        }
    })

    revalidatePath('/library')
    return newTrack
}

export async function getUserPlaylists() {
    const session = await auth()
    if (!session?.user?.id) return []

    return prisma.playlist.findMany({
        where: { userId: session.user.id },
        include: { tracks: true },
        orderBy: { updatedAt: 'desc' }
    })
}
