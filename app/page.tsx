'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Rocket, ShieldCheck, Users, UserCheck, Tv, ArrowRight, Sparkles, Building2, Lightbulb } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { InnovationHero } from '@/components/hero/InnovationHero'
import { InnovationTimeline } from '@/components/journey/InnovationTimeline'
import { InnovationChallengeSection } from '@/components/innovation/InnovationChallengeSection'
import { EvaluationSection } from '@/components/evaluation/EvaluationSection'
import { ProgrammePreview } from '@/components/programme/ProgrammePreview'
import { StartupDashboardPreview } from '@/components/dashboard/StartupDashboardPreview'
import { LiveEventProjectorModal } from '@/components/live/LiveEventProjectorModal'
import { TiltCard } from '@/components/ui/TiltCard'

export default function HomePage() {
  const studentCoordinators = [
    { name: 'A. Lokesh', role: 'Student Lead Coordinator', day: 'Day 1 Lead' },
    { name: 'P. Hareesh', role: 'Student Co-Coordinator', day: 'Day 1 Lead' },
    { name: 'B. Yogeswari', role: 'Student Coordinator', day: 'Day 2 Lead' },
    { name: 'K. Raghavendra', role: 'Student Coordinator', day: 'Day 2 Lead' },
    { name: 'P. Sony', role: 'Student Coordinator', day: 'Day 3 Lead' },
    { name: 'R. Dileep Kumar', role: 'Student Coordinator', day: 'Day 3 Lead' },
    { name: 'B. Amrutha', role: 'Student Coordinator', day: 'Day 4 Lead' },
    { name: 'Rami Naidu', role: 'Student Coordinator', day: 'Day 4 Lead' },
    { name: 'K. Sharvan', role: 'Student Coordinator', day: 'Operations' },
    { name: 'B. Prasad', role: 'Media Coordinator', day: 'Media Lead' },
  ]

  const facultyCoordinators = [
    { name: 'Prof. Janaki Bhai Madam', role: 'Faculty Lead', dept: 'Dept of CSE & AI-ML' },
    { name: 'Venu Sir', role: 'Faculty Coordinator', dept: 'Dept of CSE' },
    { name: 'Teja Sir', role: 'Faculty Coordinator', dept: 'Dept of AI-ML' },
    { name: 'Shilpa Madam', role: 'Faculty Coordinator', dept: 'Dept of CSE' },
    { name: 'Ammi Naidu Sir', role: 'Faculty Coordinator', dept: 'Dept of AI-ML' },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <CustomCursor />
      <Navbar />

      {/* Floating Projector Mode Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setLiveModeOpen(true)}
          className="flex items-center gap-2 rounded-2xl border border-indigo-500/40 bg-slate-900/90 px-4 py-3 text-xs font-bold text-indigo-300 shadow-2xl backdrop-blur-md transition hover:scale-105 hover:bg-slate-800 hover:text-white"
        >
          <Tv className="h-4 w-4 text-amber-400" />
          <span>Launch Projector Stage Mode</span>
        </button>
      </div>

      {/* 1. HERO SECTION WITH 3D SCENE & STATS */}
      <InnovationHero />

      {/* 2. EVENT JOURNEY TIMELINE */}
      <InnovationTimeline />

      {/* 3. INNOVATION CHALLENGE & BUILD THE FUTURE */}
      <InnovationChallengeSection />

      {/* 4. EVALUATION RUBRIC & JUDGING WEIGHTS */}
      <EvaluationSection />

      {/* 5. FIVE DAYS OF INNOVATION PROGRAMME PREVIEW */}
      <ProgrammePreview />

      {/* 6. STUDENT WORKSPACE DASHBOARD PREVIEW */}
      <StartupDashboardPreview />

      {/* 7. COORDINATORS & ORGANIZERS */}
      <section className="py-24 border-b border-slate-800/80 bg-slate-950 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">ORGANIZING TEAM</span>
            <h2 className="text-3xl font-black text-white sm:text-5xl tracking-tight">
              THE PEOPLE BEHIND THE EXPERIENCE
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Student coordinators, faculty coordinators, and jury members driving Innovation Week 2026.
            </p>
          </div>

          {/* Student Leads Grid */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-400" />
              <span>Student Coordinators</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {studentCoordinators.map((s) => (
                <TiltCard key={s.name} className="p-4 space-y-2 text-left">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 font-bold">
                    {s.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">{s.name}</h4>
                    <p className="text-[10px] text-indigo-300 font-medium">{s.role}</p>
                    <p className="text-[9px] text-slate-400 mt-1">{s.day}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Faculty Leads Grid */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-amber-400" />
              <span>Faculty Coordinators</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {facultyCoordinators.map((f) => (
                <TiltCard key={f.name} className="p-4 space-y-2 text-left">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 font-bold">
                    {f.name.split(' ')[1]?.charAt(0) || 'F'}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">{f.name}</h4>
                    <p className="text-[10px] text-amber-300 font-medium">{f.role}</p>
                    <p className="text-[9px] text-slate-400 mt-1">{f.dept}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 8. FINAL IMMERSIVE CTA */}
      <section className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/60 relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 text-center space-y-6 relative z-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-2xl shadow-indigo-600/50">
            <Rocket className="h-8 w-8" />
          </div>

          <h2 className="text-4xl font-black text-white sm:text-6xl tracking-tight">
            HAVE AN IDEA?
          </h2>

          <p className="text-base sm:text-xl text-slate-300 font-medium max-w-xl mx-auto">
            Turn it into something real. <br />
            <span className="text-indigo-400">Learn → Build → Validate → Pitch → Launch</span>
          </p>

          <div className="pt-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 px-9 py-4 text-base font-extrabold text-white shadow-2xl shadow-indigo-600/40 hover:scale-105 transition"
            >
              <span>REGISTER YOUR TEAM NOW →</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
