'use client'

import { Award, Scale, CheckCircle2, Star } from 'lucide-react'
import { TiltCard } from '@/components/ui/TiltCard'

export function EvaluationSection() {
  const criteria = [
    { title: 'Innovation & Originality', weight: '20%', percent: 20, desc: 'Uniqueness of approach & market differentiation', prominent: true, color: 'text-amber-400', border: 'border-amber-500/40 bg-amber-500/5' },
    { title: 'Prototype / MVP Quality', weight: '20%', percent: 20, desc: 'Functional completeness, UI/UX & working proof', prominent: true, color: 'text-emerald-400', border: 'border-emerald-500/40 bg-emerald-500/5' },
    { title: 'Problem Relevance', weight: '15%', percent: 15, desc: 'Pain point clarity & local/national relevance', prominent: false, color: 'text-indigo-400', border: 'border-slate-800 bg-slate-900/60' },
    { title: 'Technical Feasibility', weight: '15%', percent: 15, desc: 'Architecture soundness & stack choice', prominent: false, color: 'text-cyan-400', border: 'border-slate-800 bg-slate-900/60' },
    { title: 'Market Potential', weight: '15%', percent: 15, desc: 'Revenue model, TAM & unit economics', prominent: false, color: 'text-violet-400', border: 'border-slate-800 bg-slate-900/60' },
    { title: 'Presentation & Teamwork', weight: '10%', percent: 10, desc: '3-min pitch clarity & handling jury Q&A', prominent: false, color: 'text-rose-400', border: 'border-slate-800 bg-slate-900/60' },
    { title: 'Social / Economic Impact', weight: '5%', percent: 5, desc: 'Regional impact & employment potential', prominent: false, color: 'text-teal-400', border: 'border-slate-800 bg-slate-900/60' },
  ]

  return (
    <section className="py-24 border-b border-slate-800/80 bg-slate-950 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-extrabold text-amber-400 border border-amber-500/20 uppercase tracking-widest">
            JURY RUBRIC & WEIGHTAGE
          </span>
          <h2 className="text-3xl font-black text-white sm:text-5xl tracking-tight">
            HOW YOUR IDEA WILL BE JUDGED
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Evaluations are recorded in real-time by jury members using 7 weighted criteria totaling 100%.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {criteria.map((c) => (
            <TiltCard key={c.title} className={`p-6 space-y-3 shadow-xl ${c.border}`}>
              <div className="flex items-center justify-between">
                <span className={`text-3xl font-black ${c.color}`}>{c.weight}</span>
                {c.prominent && (
                  <span className="rounded-md bg-amber-400/20 px-2 py-0.5 text-[10px] font-extrabold text-amber-300 border border-amber-400/30 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-300" /> High Weight
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-white text-base">{c.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">{c.desc}</p>
              </div>

              {/* Visual Progress Bar */}
              <div className="pt-2">
                <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r from-indigo-500 to-amber-400`}
                    style={{ width: `${(c.percent / 20) * 100}%` }}
                  />
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

      </div>
    </section>
  )
}
