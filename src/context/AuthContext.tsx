import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { api, AUTH_EXPIRED_EVENT } from '../services/api'

interface User {
  id: string
  firstName?: string | null
  lastName?: string | null
  role: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  loginDemo: (role?: 'user' | 'admin') => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const clearSession = useCallback(() => {
    localStorage.removeItem('accessToken')
    setUser(null)
  }, [])

  const refreshAuth = useCallback(async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }
    try {
      setUser(await api.get<User>('/auth/me'))
    } catch {
      clearSession()
    } finally {
      setLoading(false)
    }
  }, [clearSession])

  useEffect(() => {
    void refreshAuth()
  }, [refreshAuth])

  useEffect(() => {
    const onExpired = () => {
      clearSession()
      if (!window.location.pathname.startsWith('/login')) {
        window.location.assign('/login')
      }
    }
    window.addEventListener(AUTH_EXPIRED_EVENT, onExpired)
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, onExpired)
  }, [clearSession])

  const loginDemo = async (role: 'user' | 'admin' = 'user') => {
    const res = await fetch('/api/auth/demo-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error((err as { error?: string }).error || 'Login failed')
    }
    const data = await res.json()
    localStorage.setItem('accessToken', data.accessToken ?? data.token)
    setUser(data.user)
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginDemo, logout: async () => clearSession() }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth needs AuthProvider')
  return ctx
}
