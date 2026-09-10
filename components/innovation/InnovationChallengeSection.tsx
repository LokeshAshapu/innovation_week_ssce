'use client'

import Link from 'next/link'
import { Rocket, Cpu, Globe, Smartphone, Radio, HardDrive, Layout, Zap, PieChart, Layers, ShieldCheck, ArrowRight } from 'lucide-react'
import { TiltCard } from '@/components/ui/TiltCard'

export function InnovationChallengeSection() {
  const categories = [
    { title: 'AI / ML Solution', desc: 'Predictive models, computer vision & regional NLP tools', icon: Cpu, color: 'text-indigo-400' },
    { title: 'Web Application', desc: 'Scalable cloud platforms & responsive web tools', icon: Globe, color: 'text-cyan-400' },
    { title: 'Mobile Application', desc: 'Android / iOS mobile software solutions', icon: Smartphone, color: 'text-violet-400' },
    { title: 'IoT Prototype', desc: 'Sensor nodes, smart telemetry & embedded systems', icon: Radio, color: 'text-emerald-400' },
    { title: 'Hardware Model', desc: 'Physical engineering prototypes & automation jigs', icon: HardDrive, color: 'text-amber-400' },
    { title: 'UI/UX Interactive', desc: 'Clickable high-fidelity product prototypes', icon: Layout, color: 'text-rose-400' },
    { title: 'Automation System', desc: 'Process automation & industrial workflows', icon: Zap, color: 'text-yellow-400' },
    { title: 'Business Model', desc: 'Unit economics, market moats & SaaS models', icon: PieChart, color: 'text-blue-400' },
    { title: 'Product Prototype', desc: 'Working MVP product release candidates', icon: Layers, color: 'text-purple-400' },
    { title: 'Proof of Concept', desc: 'Validated core technological proof', icon: ShieldCheck, color: 'text-teal-400' },
  ]

  return (
    <section className="py-24 border-b border-slate-800/80 bg-slate-950/60 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
        
        {/* Section 14: BUILD THE FUTURE Banner */}
        <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/90 via-slate-900 to-violet-950/90 p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 h-72 w-72 bg-indigo-500/20 rounded-full blur-3xl" />
          
          <span className="rounded-full bg-indigo-500/10 px-4 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30 uppercase tracking-widest">
            BUILD THE FUTURE
          </span>

          <h2 className="text-4xl font-black text-white sm:text-6xl tracking-tight max-w-3xl mx-auto">
            YOUR IDEA COULD BE THE NEXT <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">STARTUP.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto font-medium">
            Don't just participate. Build something. Turn raw concepts into deployed products with direct incubator support.
          </p>

          <div className="pt-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 text-sm font-extrabold text-white shadow-xl shadow-indigo-600/40 hover:scale-105 transition"
            >
              <Rocket className="h-4 w-4" />
              <span>Register Your Team →</span>
            </Link>
          </div>
        </div>

        {/* Section 15: WHAT WILL YOU BUILD? */}
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Prototype Categories</span>
            <h2 className="text-3xl font-black text-white sm:text-4xl">WHAT WILL YOU BUILD?</h2>
            <p className="text-xs text-slate-400 max-w-xl mx-auto">
              Choose your domain and build a working prototype during Day 3 & Day 4 sprints.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((c) => {
              const Icon = c.icon
              return (
                <TiltCard key={c.title} className="p-5 space-y-3 shadow-lg hover:border-indigo-500/50">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 border border-slate-800 ${c.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-white text-sm">{c.title}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{c.desc}</p>
                </TiltCard>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
