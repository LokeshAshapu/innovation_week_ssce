'use client'

import Link from 'next/link'
import { Rocket, Sparkles, ArrowRight, ArrowDown, ChevronRight, MapPin, Building, Award, ShieldCheck } from 'lucide-react'
import { InnovationScene3D } from './InnovationScene3D'
import { HeroStats } from './HeroStats'

export function InnovationHero() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen overflow-hidden border-b border-indigo-500/30 bg-slate-950 pt-6 pb-16 flex flex-col justify-between">
      
      {/* 🏛️ PROMINENT SRI SIVANI CAMPUS BUILDING BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/sivani_campus.png"
          alt="Sri Sivani College of Engineering Campus Building"
          className="w-full h-full object-cover object-center opacity-65 filter brightness-110 contrast-105 scale-105 transition-transform duration-1000"
        />
        {/* Subtle Dark Gradient Vignettes so Text Pops Crisp & Clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 via-30% to-transparent" />
      </div>

      {/* Vibrant Ambient Backlights */}
      <div className="absolute top-0 left-1/4 h-[550px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-indigo-600/35 via-violet-600/25 to-cyan-500/20 blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 h-[450px] w-[600px] rounded-full bg-cyan-500/20 blur-[150px] pointer-events-none z-0" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Institution Header Badge featuring Official Sri Sivani Logo */}
            <div className="inline-flex items-center gap-3.5 rounded-2xl border-2 border-indigo-400/50 bg-slate-900/90 px-4 py-2 backdrop-blur-xl shadow-2xl shadow-indigo-600/30">
              <div className="h-10 w-10 rounded-xl bg-white p-1 shrink-0 flex items-center justify-center border border-indigo-500 shadow-md">
                <img
                  src="/images/sivani_logo.png"
                  alt="Sri Sivani College Emblem"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="text-xs font-black text-white tracking-wider block">
                  SRI SIVANI COLLEGE OF ENGINEERING
                </span>
                <span className="text-[10px] font-bold text-amber-400 tracking-wide uppercase">
                  (AUTONOMOUS) • Srikakulam, AP
                </span>
              </div>
            </div>

            {/* Main Dominant Headline */}
            <div className="space-y-3">
              <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl leading-none drop-shadow-2xl">
                INNOVATION <br />
                <span className="bg-gradient-to-r from-indigo-400 via-violet-300 via-cyan-300 to-amber-300 bg-clip-text text-transparent">
                  WEEK 2026
                </span>
              </h1>
              
              <p className="text-lg sm:text-2xl font-extrabold text-indigo-100 tracking-tight flex items-center gap-2 drop-shadow">
                <Sparkles className="h-5 w-5 text-amber-400 inline shrink-0" />
                <span>Build, Pitch & Win Big at Srikakulam&apos;s Flagship Tech Sprint</span>
              </p>
            </div>

            {/* Subheading & Supporting Text */}
            <div className="space-y-2 max-w-xl">
              <p className="text-base sm:text-lg font-bold text-indigo-300 flex items-center gap-2">
                <Building className="h-5 w-5 text-cyan-400 shrink-0" />
                <span>Organized by Dept of CSE & AI-ML in collaboration with Ratan Tata Innovation Hub</span>
              </p>
              <p className="text-sm text-slate-200 leading-relaxed font-semibold drop-shadow">
                Five days of intense hackathon innovation. Build your prototype, validate your MVP, and pitch before industry leaders at Sri Sivani Campus.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="group flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 px-8 py-4 text-sm font-extrabold text-white shadow-2xl shadow-indigo-600/50 transition-all hover:scale-105"
              >
                <Rocket className="h-4 w-4" />
                <span>Register Your Team</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/event-journey"
                className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/90 px-6 py-4 text-sm font-bold text-slate-100 backdrop-blur-xl transition hover:border-indigo-400 hover:bg-slate-800"
              >
                <span>Explore Innovation Journey</span>
                <ChevronRight className="h-4 w-4 text-indigo-400" />
              </Link>
            </div>

            {/* Floating Glass Stats */}
            <HeroStats />

          </div>

          {/* Right Column: 3D Innovation Core Scene (5 Cols) */}
          <div className="lg:col-span-5 h-full relative">
            <InnovationScene3D />
          </div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="pt-6 text-center z-10 flex flex-col items-center gap-1.5 opacity-90 hover:opacity-100 transition">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-300 drop-shadow">SCROLL TO EXPLORE CAMPUS & SCHEDULE</span>
        <ArrowDown className="h-4 w-4 text-indigo-400 animate-bounce" />
      </div>

    </section>
  )
}
