import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemeToggle } from '../components/ThemeToggle'
import { Button } from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { loginDemo } = useAuth()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const start = async () => {
    setBusy(true)
    setError(null)
    try {
      await loginDemo('user')
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col lg:flex-row safe-area-px">
      <aside className="strata-hero relative flex flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 lg:min-h-[100dvh] lg:w-[min(440px,42%)] lg:shrink-0">
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">Stratafi</p>
            <p className="mt-1 text-lg font-semibold">Practice environment</p>
          </div>
          <ThemeToggle className="text-white/80 hover:bg-white/10 hover:text-white dark:hover:bg-white/10" />
        </div>

        <div className="relative z-10 my-10 lg:my-0 lg:flex-1 lg:flex lg:flex-col lg:justify-center max-w-sm">
          <h1 className="font-display text-3xl sm:text-4xl font-semibold leading-tight tracking-tight">
            Layer by layer,
            <span className="block text-primary-300">ship the API.</span>
          </h1>
          <p className="mt-4 text-sm text-white/75 leading-relaxed">
            A single Savings screen backed by a tiny Express server. Implement the routes; the UI will follow.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/80">
            <li className="flex gap-3">
              <span className="font-mono text-xs text-primary-300 mt-0.5">01</span>
              Enter the sandbox with one click
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-xs text-primary-300 mt-0.5">02</span>
              Complete GET and POST in savings.routes.ts
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-xs text-primary-300 mt-0.5">03</span>
              Add a goal and refresh to confirm persistence
            </li>
          </ul>
        </div>

        <p className="relative z-10 text-xs text-white/50 hidden lg:block">No database · in-memory store</p>
      </aside>

      <main className="flex flex-1 flex-col justify-center strata-bg px-5 py-10 sm:px-10 lg:px-16">
        <div className="w-full max-w-md mx-auto animate-login-rise">
          <p className="page-eyebrow">Sign in</p>
          <h2 className="page-title mt-2">Savings workspace</h2>
          <p className="page-lede mt-2">
            Use the sandbox account to exercise the Savings API against this UI.
          </p>

          <div className="sf-panel mt-8 p-6 sm:p-7 space-y-4">
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 rounded-md bg-red-50 dark:bg-red-950/30 px-3 py-2" role="alert">
                {error}
              </p>
            )}
            <Button fullWidth size="lg" disabled={busy} onClick={() => void start()}>
              {busy ? 'Opening workspace…' : 'Enter sandbox'}
            </Button>
            <p className="text-xs text-center text-surface-500 dark:text-surface-400">
              Dev-only token · not for production
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
