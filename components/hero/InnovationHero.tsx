'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Rocket, Sparkles, ArrowRight, ArrowDown, ChevronRight, ShieldCheck, Building2, MapPin } from 'lucide-react'
import { HeroStats } from './HeroStats'

export function InnovationHero() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen overflow-hidden border-b border-slate-800/80 bg-slate-950 pt-6 pb-16 flex flex-col justify-between">
      
      {/* Real College Building Background Overlay with Vignette & Soft Tint */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ssce_building.jpg"
          alt="Sri Sivani College of Engineering Building Campus"
          fill
          priority
          className="object-cover object-center opacity-25 contrast-110 saturate-90"
        />
        {/* Dark Vignette & Muted Gradient Overlays for smooth contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40" />
        <div className="absolute top-0 left-1/4 h-[450px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-indigo-900/15 via-slate-800/10 to-transparent blur-[140px] pointer-events-none" />
      </div>

      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headline & Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Institution Badge with Official College Logo */}
            <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-700/60 bg-slate-900/80 px-4 py-2 text-xs font-bold text-slate-300 backdrop-blur-xl shadow-lg">
              <div className="relative h-7 w-7 rounded-full overflow-hidden bg-white p-0.5 shrink-0 shadow-sm">
                <Image
                  src="/images/ssce_logo.png"
                  alt="Sri Sivani Official Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold tracking-wide text-white">SRI SIVANI COLLEGE OF ENGINEERING</span>
                <span className="text-[9px] text-slate-400 font-semibold tracking-wider uppercase">AUTONOMOUS • SRIKAKULAM, A.P.</span>
              </div>
            </div>

            {/* Main Dominant Headline */}
            <div className="space-y-3">
              <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl leading-none">
                INNOVATION <br />
                <span className="bg-gradient-to-r from-slate-100 via-indigo-200 to-amber-200 bg-clip-text text-transparent">
                  WEEK 2026
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl font-bold text-slate-200 tracking-tight flex items-center gap-2.5">
                <Sparkles className="h-5 w-5 text-amber-400 shrink-0" />
                <span>Build, Pitch & Win Big at Srikakulam&apos;s Flagship Hackathon</span>
              </p>
            </div>

            {/* Subheading & Supporting Text */}
            <div className="space-y-2 max-w-xl">
              <p className="text-base sm:text-lg font-semibold text-slate-300">
                Building the Next Generation of Tech Leaders & Entrepreneurs
              </p>
              <p className="text-sm text-slate-400 leading-relaxed font-normal">
                5 Days of intense ideation, prototyping, MVP deployment & live auditorium pitching. Organized by <strong className="text-slate-200">INVETRON CLUB</strong> & <strong className="text-slate-200">TPO Cell by Dept. of CSE & AI-ML</strong> in collaboration with Ratan Tata Innovation Hub.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="group flex items-center gap-2.5 rounded-2xl bg-indigo-600/90 hover:bg-indigo-600 px-7 py-4 text-sm font-extrabold text-white shadow-xl shadow-indigo-900/30 transition-all hover:scale-105"
              >
                <Rocket className="h-4 w-4" />
                <span>Register Your Team Now</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/event-journey"
                className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/90 px-6 py-4 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 backdrop-blur-md"
              >
                <span>Explore 5-Day Event Journey</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
            </div>

            {/* Floating Glass Stats */}
            <HeroStats />

          </div>

          {/* Right Column: Soft Showcase Badge Card with College Building & Logo */}
          <div className="lg:col-span-5 h-full relative">
            <div className="relative rounded-3xl border border-slate-800/90 bg-slate-900/70 p-3 shadow-2xl backdrop-blur-2xl overflow-hidden group hover:border-slate-700 transition-all duration-300">
              
              {/* College Campus Photo Preview Card */}
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-slate-800">
                <Image
                  src="/images/ssce_building.jpg"
                  alt="Sri Sivani College Building"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Overlay Official Logo Badge */}
                <div className="absolute top-3 left-3 bg-slate-950/90 border border-slate-700/80 rounded-2xl p-2 flex items-center gap-2.5 backdrop-blur-md shadow-lg">
                  <div className="relative h-10 w-10 bg-white rounded-xl p-0.5 shrink-0 shadow-sm">
                    <Image
                      src="/images/ssce_logo.png"
                      alt="SSCE Logo"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-white">SRI SIVANI</span>
                    <span className="block text-[9px] font-semibold text-slate-300">COLLEGE OF ENGINEERING</span>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold text-white">
                  <span className="flex items-center gap-1 bg-slate-950/80 px-3 py-1 rounded-xl border border-slate-800 backdrop-blur-md">
                    <Building2 className="h-3.5 w-3.5 text-slate-400" />
                    <span>Main Campus</span>
                  </span>
                  <span className="flex items-center gap-1 bg-slate-800/90 px-3 py-1 rounded-xl text-slate-200 shadow-sm border border-slate-700">
                    <MapPin className="h-3.5 w-3.5 text-amber-400" />
                    <span>Srikakulam, A.P.</span>
                  </span>
                </div>
              </div>

              {/* Event Badge Details */}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">ORGANIZED BY</span>
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    INNOVATION HUB PARTNER
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-white">INVETRON CLUB</h3>
                <p className="text-xs font-bold text-indigo-400">TPO Cell by Dept. of CSE & AI-ML</p>
                <p className="text-xs text-slate-400 leading-relaxed font-normal pt-1">
                  Collaborating with Ratan Tata Innovation Hub to offer incubation support, 100% verified certificates, and awards for top teams.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="pt-6 text-center z-10 flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">SCROLL TO EXPLORE</span>
        <ArrowDown className="h-4 w-4 text-slate-400 animate-bounce" />
      </div>

    </section>
  )
}
