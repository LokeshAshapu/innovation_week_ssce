'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldCheck, Users, ArrowRight, RefreshCw, AlertCircle, Rocket, Key } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function LoginPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'STUDENT' | 'ADMIN'>('STUDENT')
  const [loginInput, setLoginInput] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setIsSubmitting(true)

    const payloadInput = activeTab === 'ADMIN' ? (loginInput || 'admin@srisivani.ac.in') : loginInput

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: payloadInput, password: password || 'student123' }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Invalid login credentials. Please check your Team Code / Roll No / Email.')
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
          
          {/* Header Banner */}
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/30">
              {activeTab === 'STUDENT' ? <Rocket className="h-7 w-7" /> : <ShieldCheck className="h-7 w-7" />}
            </div>
            <h1 className="text-2xl font-black text-white sm:text-3xl">
              {activeTab === 'STUDENT' ? 'Student Team Portal' : 'Admin & Staff Portal'}
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              {activeTab === 'STUDENT'
                ? 'Access your team dashboard to submit ideas, prototypes & pitch decks.'
                : 'Enter authorized administrator or evaluator credentials.'}
            </p>
          </div>

          {/* Tab Selection Switcher */}
          <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setActiveTab('STUDENT')
                setErrorMsg(null)
              }}
              className={`py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
                activeTab === 'STUDENT'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Registered Team Login</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('ADMIN')
                setErrorMsg(null)
              }}
              className={`py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
                activeTab === 'ADMIN'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Admin / Staff Login</span>
            </button>
          </div>

          {errorMsg && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 flex items-center gap-3 text-xs text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 space-y-5 shadow-2xl backdrop-blur-xl">
            {activeTab === 'STUDENT' ? (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Team Code, Student Roll No, or Email *
                  </label>
                  <input
                    type="text"
                    required
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    placeholder="e.g. IW-2026-1001 or 22CS1A0501"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
                  />
                  <p className="text-[11px] text-indigo-400 mt-1.5 font-medium">
                    💡 You can log in using your Team Code (e.g. IW-2026-1001), any member's Roll Number, or Leader email.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Password (Default: <code className="text-indigo-400 font-mono">student123</code>)
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="student123"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Admin / Coordinator Email</label>
                  <input
                    type="email"
                    required
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
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
              </>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 text-xs font-bold text-white shadow-xl hover:from-indigo-500 hover:to-violet-500 transition disabled:opacity-50"
            >
              {isSubmitting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              <span>{activeTab === 'STUDENT' ? 'Access Team Dashboard →' : 'Sign In to Admin Portal →'}</span>
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}

