'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Rocket, ShieldCheck, UserCheck, Menu, X, ChevronDown, Award, Calendar, Users, FileText, CheckCircle2, MessageSquare } from 'lucide-react'
import { WhatsAppQueryModal } from '@/components/WhatsAppQueryModal'

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [roleModalOpen, setRoleModalOpen] = useState(false)
  const [waModalOpen, setWaModalOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/programme', label: 'Programme' },
    { href: '/event-journey', label: 'Journey' },
    { href: '/coordinators', label: 'Coordinators' },
    { href: '/evaluation', label: 'Rubric' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/announcements', label: 'Announcements' },
  ]

  const quickRoles = [
    { label: 'Student Team Leader', email: 'agrisenseai@student.srisivani.ac.in', target: '/dashboard', badge: 'Student' },
    { label: 'Jury / Evaluator', email: 'jury1@ratantatahub.org', target: '/evaluator', badge: 'Evaluator' },
    { label: 'Student Coordinator', email: 'coordinator@srisivani.ac.in', target: '/admin', badge: 'Coordinator' },
    { label: 'Faculty Coordinator', email: 'faculty@srisivani.ac.in', target: '/admin', badge: 'Faculty' },
    { label: 'Administrator', email: 'admin@srisivani.ac.in', target: '/admin', badge: 'Admin' },
  ]

  const handleQuickLogin = async (email: string, target: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: 'any' }),
      })
      if (res.ok) {
        window.location.href = target
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-lg shadow-indigo-500/30">
              <Rocket className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black tracking-tight text-white text-sm sm:text-base">INNOVATION WEEK</span>
                <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] font-bold text-indigo-400 border border-indigo-500/30">2026</span>
              </div>
              <p className="text-[10px] font-medium text-slate-400 hidden sm:block">Sri Sivani College of Engineering</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right CTA Actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <button
              onClick={() => setWaModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>WhatsApp Help</span>
            </button>

            <button
              onClick={() => setRoleModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-indigo-500 hover:bg-slate-800"
            >
              <UserCheck className="h-3.5 w-3.5 text-indigo-400" />
              <span>Demo Roles</span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </button>

            <Link
              href="/register"
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition hover:from-indigo-500 hover:to-violet-500"
            >
              <Rocket className="h-3.5 w-3.5" />
              <span>Register Team</span>
            </Link>
          </div>

          {/* Mobile / Tablet Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile / Tablet Menu Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-slate-800 bg-slate-950 px-4 py-4 lg:hidden">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                    pathname === link.href ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="mt-2 pt-3 border-t border-slate-800 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setWaModalOpen(true)
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 py-2.5 text-xs font-bold text-emerald-400"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Ask on WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setRoleModalOpen(true)
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 py-2.5 text-xs font-medium text-slate-200"
                >
                  <UserCheck className="h-4 w-4 text-indigo-400" />
                  <span>Switch Demo Role</span>
                </button>

                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-lg"
                >
                  <Rocket className="h-4 w-4" />
                  <span>Register Team</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Role Switcher Modal — OUTSIDE STICKY HEADER */}
      {roleModalOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/85 p-4 sm:p-6 backdrop-blur-md">
          <div className="flex min-h-full items-center justify-center">
            <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-indigo-400" />
                  <h3 className="text-base font-bold text-white">Instant Role Showcase</h3>
                </div>
                <button
                  onClick={() => setRoleModalOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-xs text-slate-400">
                Select a pre-configured account to launch the platform as a Student, Jury Evaluator, Coordinator, or Administrator:
              </p>
              <div className="flex flex-col gap-2">
                {quickRoles.map((r) => (
                  <button
                    key={r.email}
                    onClick={() => handleQuickLogin(r.email, r.target)}
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3 text-left transition hover:border-indigo-500/50 hover:bg-slate-800"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white">{r.label}</span>
                        <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] font-medium text-indigo-300">
                          {r.badge}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">{r.email}</span>
                    </div>
                    <span className="text-xs font-medium text-indigo-400 hover:underline">Launch →</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Help Desk Modal — OUTSIDE STICKY HEADER */}
      <WhatsAppQueryModal isOpen={waModalOpen} onClose={() => setWaModalOpen(false)} />
    </>
  )
}
