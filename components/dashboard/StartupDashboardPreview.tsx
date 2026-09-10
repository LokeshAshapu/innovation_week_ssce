'use client'

import { Rocket, CheckCircle2, Clock, Calendar, ShieldCheck, ArrowRight } from 'lucide-react'
import { TiltCard } from '@/components/ui/TiltCard'

export function StartupDashboardPreview() {
  return (
    <section className="py-24 border-b border-slate-800/80 bg-slate-950 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="rounded-full bg-indigo-500/10 px-3.5 py-1 text-xs font-extrabold text-indigo-400 border border-indigo-500/20 uppercase tracking-widest">
            STUDENT WORKSPACE PREVIEW
          </span>
          <h2 className="text-3xl font-black text-white sm:text-5xl tracking-tight">
            YOUR INNOVATION WORKSPACE
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Team leaders receive a dedicated workspace to manage team registration, payments, challenge submissions, and jury progress.
          </p>
        </div>

        {/* Demo Interactive Workspace Card */}
        <TiltCard className="max-w-3xl mx-auto p-8 space-y-8 shadow-2xl border-indigo-500/30">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-indigo-400">IW-2026-1001</span>
                <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                  ✓ Verified Team
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-white mt-1">AgriSense AI Innovators</h3>
              <p className="text-xs text-slate-400">Team Leader: A. Lokesh (22CS1A0501)</p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Overall Progress</span>
              <p className="text-3xl font-black text-indigo-400">72%</p>
            </div>
          </div>

          {/* Stepper Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">YOUR INNOVATION JOURNEY</h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-300 font-semibold">1. Team Registration</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Confirmed ✓</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-300 font-semibold">2. Registration Fee Payment</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Paid & Verified ✓</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-300 font-semibold">3. Day 2 Startup Idea Submission</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Submitted ✓</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/40">
                <span className="text-white font-bold">4. Day 3 Prototype Development</span>
                <span className="text-amber-400 font-bold flex items-center gap-1"><Clock className="h-4 w-4" /> In Progress Sprint ●</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-500">
                <span>5. Day 4 MVP & Business Pitch</span>
                <span>Upcoming ○</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-500">
                <span>6. Day 5 Grand Finale Pitch & Award Certificate</span>
                <span>Upcoming ○</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Sprint Completion</span>
              <strong className="text-indigo-400">72% Completed</strong>
            </div>
            <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-amber-400 rounded-full" style={{ width: '72%' }} />
            </div>
          </div>

        </TiltCard>

      </div>
    </section>
  )
}
