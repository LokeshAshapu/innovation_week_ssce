import { db } from '@/lib/db'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Bell, AlertTriangle, Info, Calendar } from 'lucide-react'

export default async function AnnouncementsPage() {
  const announcements = await db.announcement.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="rounded-full bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
            Event Bulletins
          </span>
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            Announcements & Updates
          </h1>
          <p className="text-sm text-slate-400 font-medium">
            Stay updated with official room changes, presentation schedules, submission deadlines, and awards.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {announcements.map((a) => {
            const isUrgent = a.priority === 'URGENT'
            return (
              <div
                key={a.id}
                className={`rounded-2xl border p-6 space-y-3 transition ${
                  isUrgent
                    ? 'border-amber-500/40 bg-amber-500/5 shadow-lg shadow-amber-500/5'
                    : 'border-slate-800 bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {isUrgent ? (
                      <span className="flex items-center gap-1 rounded bg-amber-500/20 px-2 py-0.5 text-[11px] font-bold text-amber-300 border border-amber-500/30">
                        <AlertTriangle className="h-3 w-3" /> URGENT
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 rounded bg-indigo-500/20 px-2 py-0.5 text-[11px] font-bold text-indigo-300">
                        <Info className="h-3 w-3" /> NOTICE
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400">Target: {a.targetRole}</span>
                  </div>

                  <span className="text-[11px] text-slate-400 font-mono">
                    {new Date(a.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white">{a.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{a.content}</p>

                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Published by: <strong className="text-slate-300">{a.createdBy}</strong></span>
                  <span>Sri Sivani Innovation Week 2026</span>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      <Footer />
    </div>
  )
}
