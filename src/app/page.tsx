export default function Home() {
  return (
    <div className="p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Good afternoon</h1>
        <p className="text-neutral-400">Jump back into your recent favorites.</p>
      </header>

      {/* Example section with overflow hidden & scroll standard */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Quick picks</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {/* Skeletons to showcase 320px anti-overflow layout */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex min-w-0 flex-col gap-2 rounded-md bg-neutral-900 p-4 transition-colors hover:bg-neutral-800">
              <div className="aspect-square w-full rounded-md bg-neutral-800 animate-pulse" />
              <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-neutral-800" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-neutral-800" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
