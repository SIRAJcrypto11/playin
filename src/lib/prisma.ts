import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

/**
 * Returns a stub object that resolves to empty arrays for any prisma query.
 * This is used during the build phase to prevent InitializationError.
 */
const createPrismaStub = () => {
    return new Proxy({} as any, {
        get: () => new Proxy({}, {
            get: () => () => Promise.resolve([])
        })
    })
}

const getPrismaClient = (): PrismaClient => {
    if (globalForPrisma.prisma) return globalForPrisma.prisma

    // If no DATABASE_URL is present (usually during build phase), 
    // return a stub instead of instantiating PrismaClient
    if (!process.env.DATABASE_URL) {
        return createPrismaStub()
    }

    try {
        globalForPrisma.prisma = new PrismaClient()
        return globalForPrisma.prisma
    } catch (error) {
        console.warn("Failed to initialize Prisma Client:", error)
        return createPrismaStub()
    }
}

// Export a proxy that lazy-loads the prisma client only when a property is accessed
export const prisma = new Proxy({} as PrismaClient, {
    get: (target, prop) => {
        if (prop === 'then') return undefined
        const client = getPrismaClient()
        return (client as any)[prop]
    }
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
