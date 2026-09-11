'use client'

import Link from 'next/link'
import { Rocket, Sparkles, ArrowRight, ArrowDown, ChevronRight, ShieldCheck, MapPin, Building } from 'lucide-react'
import { InnovationScene3D } from './InnovationScene3D'
import { HeroStats } from './HeroStats'

export function InnovationHero() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen overflow-hidden border-b border-slate-800/80 bg-slate-950 pt-8 pb-16 flex flex-col justify-between">
      
      {/* 🏛️ Sri Sivani College Campus Background Image Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/sivani_campus.png"
          alt="Sri Sivani College of Engineering Campus"
          className="w-full h-full object-cover object-center opacity-20 filter blur-[2px] scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
      </div>

      {/* Futuristic Background Glows & Grids */}
      <div className="absolute top-0 left-1/4 h-[500px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-indigo-600/30 via-violet-600/20 to-cyan-500/15 blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 h-[450px] w-[550px] rounded-full bg-cyan-500/15 blur-[160px] pointer-events-none z-0" />
      
      {/* Fine Background Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b20_1px,transparent_1px),linear-gradient(to_bottom,#1e293b20_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Institution Badge with Official College Emblem */}
            <div className="inline-flex items-center gap-3 rounded-full border border-indigo-400/40 bg-slate-900/80 px-4 py-1.5 backdrop-blur-xl shadow-xl shadow-indigo-500/10">
              <div className="h-6 w-6 rounded-full bg-white p-0.5 shrink-0 flex items-center justify-center border border-indigo-400">
                <img
                  src="/images/sivani_logo.png"
                  alt="Sri Sivani Emblem"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-xs font-black text-indigo-300 tracking-wide">
                SRI SIVANI COLLEGE OF ENGINEERING <span className="text-amber-400">(AUTONOMOUS)</span>
              </span>
            </div>

            {/* Main Dominant Headline */}
            <div className="space-y-3">
              <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl leading-none drop-shadow-2xl">
                INNOVATION <br />
                <span className="bg-gradient-to-r from-indigo-400 via-violet-300 via-cyan-300 to-amber-300 bg-clip-text text-transparent">
                  WEEK 2026
                </span>
              </h1>
              
              <p className="text-lg sm:text-2xl font-extrabold text-indigo-200 tracking-tight flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-400 inline shrink-0" />
                <span>Build, Pitch & Win Big at Srikakulam&apos;s Flagship Tech Sprint</span>
              </p>
            </div>

            {/* Subheading & Supporting Text */}
            <div className="space-y-2 max-w-xl">
              <p className="text-base sm:text-lg font-semibold text-indigo-300 flex items-center gap-2">
                <Building className="h-4 w-4 text-cyan-400" />
                <span>Organized by Dept of CSE & AI-ML • Srikakulam</span>
              </p>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                Five days. One idea. Build it. Validate it. Pitch it. Organized by Department of CSE & AI-ML in collaboration with Ratan Tata Innovation Hub.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="group flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-pos-0 bg-size-200 px-7 py-4 text-sm font-extrabold text-white shadow-2xl shadow-indigo-600/40 transition-all hover:bg-pos-100 hover:scale-105"
              >
                <Rocket className="h-4 w-4" />
                <span>Register Your Team</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/event-journey"
                className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 px-6 py-4 text-sm font-bold text-slate-200 backdrop-blur-md transition hover:border-indigo-500/50 hover:bg-slate-800"
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
      <div className="pt-6 text-center z-10 flex flex-col items-center gap-1.5 opacity-80 hover:opacity-100 transition">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">SCROLL TO EXPLORE CAMPUS & SCHEDULE</span>
        <ArrowDown className="h-4 w-4 text-indigo-400 animate-bounce" />
      </div>

    </section>
  )
}
