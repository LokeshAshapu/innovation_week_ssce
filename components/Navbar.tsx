'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Rocket, ShieldCheck, Menu, X, MessageSquare, Lock } from 'lucide-react'
import { WhatsAppQueryModal } from '@/components/WhatsAppQueryModal'

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [waModalOpen, setWaModalOpen] = useState(false)
  const [logoClicks, setLogoClicks] = useState<number[]>([])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/programme', label: 'Programme' },
    { href: '/event-journey', label: 'Journey' },
    { href: '/coordinators', label: 'Coordinators' },
    { href: '/evaluation', label: 'Rubric' },
  ]

  // Secret Triple-Click on Logo redirects directly to Admin Login
  const handleLogoClick = (e: React.MouseEvent) => {
    const now = Date.now()
    const recentClicks = [...logoClicks.filter((t) => now - t < 1200), now]
    setLogoClicks(recentClicks)
    if (recentClicks.length >= 3) {
      e.preventDefault()
      setLogoClicks([])
      router.push('/login')
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          
          {/* Brand Logo with Triple-Click Secret Admin Login */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90 shrink-0 select-none cursor-pointer"
            title="Triple-click for Admin Access"
          >
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

      {/* WhatsApp Help Desk Modal */}
      <WhatsAppQueryModal isOpen={waModalOpen} onClose={() => setWaModalOpen(false)} />
    </>
  )
}
