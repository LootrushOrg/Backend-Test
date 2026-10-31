import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ThemeToggle } from './ThemeToggle'

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const name = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'Sandbox user'

  const signOut = () => logout().then(() => navigate('/login'))

  return (
    <div className="min-h-[100dvh] flex strata-bg">
      <aside className="sf-sidebar safe-area-pt safe-area-pb">
        <div className="px-5 pt-6 pb-4 border-b border-surface-200/80 dark:border-surface-800">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-600 text-white text-sm font-bold dark:bg-primary-500">
              S
            </span>
            <div>
              <p className="font-display text-base font-semibold tracking-tight">Stratafi</p>
              <p className="text-[11px] uppercase tracking-widest text-surface-500 dark:text-surface-400">Sandbox</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4" aria-label="Main">
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-surface-400 dark:text-surface-500">
            Workspace
          </p>
          <NavLink
            to="/"
            end
            className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium bg-primary-50 text-primary-800 border border-primary-200/80 dark:bg-primary-950/40 dark:text-primary-200 dark:border-primary-800/50"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" aria-hidden="true" />
            Savings goals
          </NavLink>
        </nav>

        <div className="mt-auto px-4 py-4 border-t border-surface-200/80 dark:border-surface-800 space-y-3">
          <div className="px-2">
            <p className="text-sm font-medium truncate">{name}</p>
            <p className="text-xs text-surface-500 truncate">Signed in</p>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => void signOut()}
              className="flex-1 text-left text-sm font-medium text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white px-2 py-2 rounded-md hover:bg-surface-100 dark:hover:bg-surface-800/80 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="md:hidden sticky top-0 z-30 safe-area-pt border-b border-surface-200/80 dark:border-surface-800 bg-white/90 dark:bg-surface-900/90 backdrop-blur-md">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary-600 text-white text-xs font-bold">
                S
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">Stratafi</p>
                <p className="text-xs text-surface-500 truncate">{name}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => void signOut()}
                className="text-xs font-semibold text-surface-600 dark:text-surface-400 px-2 py-1"
              >
                Out
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 page-pad-x py-6 sm:py-8 pb-16 safe-area-pb max-w-5xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
