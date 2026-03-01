import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'
import { Player } from '@/components/Player'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PlayIn | SaaS Music Player',
  description: 'A modern, open-source music streaming web application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} flex h-screen w-screen flex-col overflow-hidden bg-background text-foreground antialiased`}>
        {/* Main Interface Content */}
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Context Area */}
          <main className="flex-1 min-w-0 overflow-y-auto bg-gradient-to-b from-neutral-900 to-black pb-24 md:pb-0">
            {children}
          </main>
        </div>

        {/* Global Persistent Player overlay bounds */}
        <div className="absolute bottom-0 left-0 w-full z-50">
          <Player />
        </div>
      </body>
    </html>
  )
}
