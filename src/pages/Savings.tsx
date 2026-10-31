import { FormEvent, useEffect, useMemo, useState } from 'react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { DataState } from '../components/ui/DataState'
import { api } from '../services/api'

interface Goal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
}

function formatMoney(value: number) {
  return value.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

export default function Savings() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [name, setName] = useState('')
  const [targetAmount, setTargetAmount] = useState('')

  const load = () => {
    setLoading(true)
    setError(null)
    api
      .get<Goal[]>('/savings')
      .then(setGoals)
      .catch((err) => setError(err instanceof Error ? err.message : 'GET /api/savings failed'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const stats = useMemo(() => {
    const totalTarget = goals.reduce((sum, g) => sum + Number(g.targetAmount ?? 0), 0)
    return { count: goals.length, totalTarget }
  }, [goals])

  const addGoal = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !targetAmount) return
    setSaving(true)
    setError(null)
    try {
      const created = await api.post<Goal>('/savings', {
        name: name.trim(),
        targetAmount: parseFloat(targetAmount),
      })
      setGoals((list) => [created, ...list])
      setName('')
      setTargetAmount('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'POST /api/savings failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="page-eyebrow">Savings</p>
          <h1 className="page-title mt-1">Goals dashboard</h1>
          <p className="page-lede mt-2 max-w-xl">
            Wire{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-surface-200/80 dark:bg-surface-800 text-primary-800 dark:text-primary-300">
              savings.routes.ts
            </code>{' '}
            so goals load for the signed-in user and new entries persist in memory.
          </p>
        </div>
        <dl className="flex gap-3 sm:gap-4 shrink-0">
          <div className="sf-panel px-4 py-3 min-w-[5.5rem]">
            <dt className="text-[10px] uppercase tracking-widest text-surface-500">Goals</dt>
            <dd className="text-xl font-semibold tabular-nums mt-0.5">{stats.count}</dd>
          </div>
          <div className="sf-panel px-4 py-3 min-w-[7rem]">
            <dt className="text-[10px] uppercase tracking-widest text-surface-500">Target</dt>
            <dd className="text-xl font-semibold tabular-nums mt-0.5">{formatMoney(stats.totalTarget)}</dd>
          </div>
        </dl>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(260px,320px)_1fr] lg:items-start">
        <section className="sf-panel p-5 sm:p-6 lg:sticky lg:top-8">
          <h2 className="text-sm font-semibold text-surface-900 dark:text-white">New goal</h2>
          <p className="text-xs text-surface-500 mt-1 mb-5">POST /api/savings</p>
          <form onSubmit={(e) => void addGoal(e)} className="space-y-4">
            <Input label="Name" value={name} onChange={setName} placeholder="Emergency fund" required />
            <Input
              label="Target"
              type="number"
              value={targetAmount}
              onChange={setTargetAmount}
              placeholder="5000"
              required
            />
            <Button type="submit" fullWidth disabled={saving}>
              {saving ? 'Creating…' : 'Create goal'}
            </Button>
          </form>
        </section>

        <section className="min-w-0">
          <div className="flex items-center justify-between gap-3 mb-3">
            <h2 className="text-sm font-semibold text-surface-900 dark:text-white">Your goals</h2>
            <span className="text-xs font-mono text-surface-500">GET /api/savings</span>
          </div>

          <DataState
            loading={loading}
            error={error}
            empty={!loading && !error && goals.length === 0}
            emptyMessage="No goals yet — create one in the panel"
          >
            <div className="sf-panel overflow-hidden">
              <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-2.5 border-b border-surface-200/80 dark:border-surface-700/80 text-[10px] font-semibold uppercase tracking-widest text-surface-500">
                <span>Goal</span>
                <span className="text-right w-28">Progress</span>
                <span className="text-right w-36">Amount</span>
              </div>
              <ul className="divide-y divide-surface-200/80 dark:divide-surface-700/80">
                {goals.map((g) => {
                  const current = Number(g.currentAmount ?? 0)
                  const target = Number(g.targetAmount ?? 0)
                  const pct = target > 0 ? Math.min(100, (current / target) * 100) : 0
                  return (
                    <li key={g.id} className="px-4 py-4 sm:grid sm:grid-cols-[1fr_auto_auto] sm:gap-4 sm:items-center">
                      <div className="min-w-0">
                        <p className="font-medium text-surface-900 dark:text-white truncate">{g.name}</p>
                        <div className="mt-2 h-1.5 rounded-full bg-surface-100 dark:bg-surface-800 overflow-hidden sm:hidden max-w-xs">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                      <div className="hidden sm:block w-28">
                        <div className="h-2 rounded-full bg-surface-100 dark:bg-surface-800 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-surface-500 mt-1 tabular-nums">{pct.toFixed(0)}%</p>
                      </div>
                      <p className="text-sm text-surface-600 dark:text-surface-300 tabular-nums sm:text-right sm:w-36 mt-2 sm:mt-0">
                        {formatMoney(current)}
                        <span className="text-surface-400 dark:text-surface-500"> / {formatMoney(target)}</span>
                      </p>
                    </li>
                  )
                })}
              </ul>
            </div>
          </DataState>
        </section>
      </div>
    </div>
  )
}
