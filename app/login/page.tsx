'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldCheck, UserCheck, Key, ArrowRight, RefreshCw, AlertCircle, Rocket } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const quickRoles = [
    { label: 'Student Team Leader', email: 'agrisenseai@student.srisivani.ac.in', target: '/dashboard', badge: 'Student' },
    { label: 'Jury / Evaluator', email: 'jury1@ratantatahub.org', target: '/evaluator', badge: 'Evaluator' },
    { label: 'Student Coordinator', email: 'coordinator@srisivani.ac.in', target: '/admin', badge: 'Coordinator' },
    { label: 'Faculty Coordinator', email: 'faculty@srisivani.ac.in', target: '/admin', badge: 'Faculty' },
    { label: 'Administrator', email: 'admin@srisivani.ac.in', target: '/admin', badge: 'Admin' },
  ]

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Invalid login credentials')
        setIsSubmitting(false)
        return
      }

      if (data.user.role === 'ADMIN' || data.user.role === 'COORDINATOR' || data.user.role === 'FACULTY') {
        router.push('/admin')
      } else if (data.user.role === 'EVALUATOR') {
        router.push('/evaluator')
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      console.error(err)
      setErrorMsg('Login server error. Try quick demo login below.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuickClick = async (targetEmail: string, targetPath: string) => {
    setEmail(targetEmail)
    setPassword('any')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail, password: 'any' }),
      })
      if (res.ok) {
        window.location.href = targetPath
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[75vh]">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
              <Key className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">Innovation Portal Login</h1>
            <p className="text-xs text-slate-400">
              Access Student Team Dashboard, Jury Evaluation Panel, or Admin Suite
            </p>
          </div>

          {errorMsg && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 flex items-center gap-3 text-xs text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-xl">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. student@srisivani.ac.in"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white hover:bg-indigo-500 transition disabled:opacity-50"
            >
              {isSubmitting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              <span>Sign In to Portal</span>
            </button>
          </form>

          {/* Instant Quick Demo Switcher */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-indigo-400" />
              <h3 className="text-xs font-bold text-white">Instant One-Click Demo Logins</h3>
            </div>
            <div className="flex flex-col gap-2">
              {quickRoles.map((r) => (
                <button
                  key={r.email}
                  type="button"
                  onClick={() => handleQuickClick(r.email, r.target)}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-left text-xs transition hover:border-indigo-500/50 hover:bg-slate-800"
                >
                  <div>
                    <span className="font-semibold text-slate-200">{r.label}</span>
                    <span className="ml-2 rounded bg-indigo-500/20 px-1.5 py-0.5 text-[9px] font-medium text-indigo-300">
                      {r.badge}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-indigo-400">Launch →</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
