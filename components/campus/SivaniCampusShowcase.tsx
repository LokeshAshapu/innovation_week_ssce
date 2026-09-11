'use client'

import { MapPin, Award, Building, Sparkles, ShieldCheck, Cpu, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function SivaniCampusShowcase() {
  return (
    <section className="py-24 border-b border-slate-800/80 bg-slate-950 relative overflow-hidden">
      {/* Background Lighting & Grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-indigo-600/15 via-violet-600/10 to-cyan-500/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-300 backdrop-blur-md">
            <div className="h-4 w-4 rounded-full bg-white p-0.5 shrink-0 flex items-center justify-center">
              <img src="/images/sivani_logo.png" alt="Sri Sivani Logo" className="h-full w-full object-contain" />
            </div>
            <span>THE HOST INSTITUTION</span>
          </div>

          <h2 className="text-3xl font-black text-white sm:text-5xl tracking-tight leading-tight">
            Sri Sivani College of Engineering <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
              (Autonomous) — Srikakulam
            </span>
          </h2>

          <p className="text-sm text-slate-300 font-medium max-w-2xl mx-auto">
            Empowering students with cutting-edge engineering education, state-of-the-art AI-ML laboratories, and startup incubation support in collaboration with industry leaders.
          </p>
        </div>

        {/* Feature Grid: Campus Image & Details Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Campus Building Showcase (7 Cols) */}
          <div className="lg:col-span-7 relative group rounded-3xl overflow-hidden border border-indigo-500/30 bg-slate-900 shadow-2xl">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src="/images/sivani_campus.png"
                alt="Sri Sivani College of Engineering Campus Building"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Top Emblem Badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2.5 rounded-2xl border border-white/20 bg-slate-950/80 px-4 py-2 text-xs font-extrabold text-white backdrop-blur-xl shadow-2xl">
                <div className="h-7 w-7 rounded-lg bg-white p-1 shrink-0 flex items-center justify-center">
                  <img src="/images/sivani_logo.png" alt="Sri Sivani Logo" className="h-full w-full object-contain" />
                </div>
                <span>Sri Sivani Main Campus</span>
              </div>

              {/* Bottom Address Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl border border-slate-800/80 bg-slate-950/85 backdrop-blur-xl space-y-1">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
                  <MapPin className="h-4 w-4 shrink-0 text-rose-400" />
                  <span>Chilakapalem Jn., NH-16, Srikakulam, AP - 532410</span>
                </div>
                <p className="text-[11px] text-slate-300">Organized by Department of Computer Science & Engineering (CSE) and AI & Machine Learning (AI-ML)</p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Highlights & Accreditation Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-2 hover:border-indigo-500/40 transition">
              <div className="flex items-center gap-2.5 text-indigo-400 font-bold text-sm">
                <Building className="h-5 w-5 text-indigo-400" />
                <span>AUTONOMOUS INSTITUTION</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Conferred Autonomous status by UGC & JNTUGV, enabling modern industry-driven curriculum and advanced research facilities.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-2 hover:border-indigo-500/40 transition">
              <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
                <Award className="h-5 w-5 text-amber-400" />
                <span>RATAN TATA INNOVATION HUB PARTNER</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Incubation mentorship, funding avenues, and prototype acceleration for top student startup pitches evaluated during Innovation Week.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-2 hover:border-indigo-500/40 transition">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-sm">
                <Cpu className="h-5 w-5 text-cyan-400" />
                <span>DEPT OF CSE & AI-ML EXCELLENCE</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                High-performance computer labs, AI GPU infrastructure, IoT kits, and dedicated hackathon venues equipped for 200+ participants.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-5 py-3 text-xs font-bold text-indigo-300 hover:bg-indigo-500/20 transition"
              >
                <span>Learn More About Institution & Faculty →</span>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
