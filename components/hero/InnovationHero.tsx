'use client'

import Link from 'next/link'
import { Rocket, Sparkles, ArrowRight, ArrowDown, ChevronRight, ShieldCheck } from 'lucide-react'
import { InnovationScene3D } from './InnovationScene3D'
import { HeroStats } from './HeroStats'

export function InnovationHero() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen overflow-hidden border-b border-slate-800/80 bg-slate-950 pt-8 pb-16 flex flex-col justify-between">
      
      {/* Futuristic Background Glows & Grids */}
      <div className="absolute top-0 left-1/4 h-[450px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-indigo-600/20 via-violet-600/15 to-cyan-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />
      
      {/* Fine Background Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Small Institution Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-300 backdrop-blur-md shadow-inner">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>SRI SIVANI COLLEGE OF ENGINEERING (AUTONOMOUS)</span>
            </div>

            {/* Main Dominant Headline */}
            <div className="space-y-2">
              <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl leading-none">
                INNOVATION <br />
                <span className="bg-gradient-to-r from-indigo-400 via-violet-300 via-cyan-300 to-amber-300 bg-clip-text text-transparent">
                  WEEK 2026
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl font-extrabold text-indigo-200 tracking-tight flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-400 inline" />
                Build, Pitch & Win Big at Srikakulam&apos;s Flagship Innovation Hackathon
              </p>
            </div>

            {/* Subheading & Supporting Text */}
            <div className="space-y-2 max-w-xl">
              <p className="text-base sm:text-lg font-semibold text-indigo-300">
                Building the Next Generation of Entrepreneurs
              </p>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
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
                className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 px-6 py-4 text-sm font-bold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
              >
                <span>Explore the Innovation Journey</span>
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
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">SCROLL TO EXPLORE</span>
        <ArrowDown className="h-4 w-4 text-indigo-400 animate-bounce" />
      </div>

    </section>
  )
}
