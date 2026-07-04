import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

/** Catch-all 404 page for invalid routes */
const NotFound = () => {
  useEffect(() => {
    document.title = 'Page Not Found — Nexus Store'
    return () => { document.title = 'Nexus Store — Gaming Gear' }
  }, [])

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center animate-fade-in-up">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03]">
        <span className="text-3xl font-bold text-purple-400">404</span>
      </div>
      <div>
        <h1 className="text-3xl font-semibold text-white">Page Not Found</h1>
        <p className="mt-2 text-base text-zinc-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-xl bg-purple-500 px-6 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-purple-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound
