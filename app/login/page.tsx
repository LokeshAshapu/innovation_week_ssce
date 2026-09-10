'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldCheck, Key, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

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
      setErrorMsg('Login server error. Please check your network connection.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[75vh]">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/30">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-black text-white sm:text-3xl">Admin Portal Access</h1>
            <p className="text-xs text-slate-400 font-medium">
              Enter authorized administrator credentials to manage Innovation Week 2026.
            </p>
          </div>

          {errorMsg && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 flex items-center gap-3 text-xs text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 space-y-5 shadow-2xl backdrop-blur-xl">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Admin / Coordinator Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@srisivani.ac.in"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 text-xs font-bold text-white shadow-xl hover:from-indigo-500 hover:to-violet-500 transition disabled:opacity-50"
            >
              {isSubmitting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              <span>Sign In to Admin Portal</span>
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
