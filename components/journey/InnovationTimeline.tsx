'use client'

import { Lightbulb, Target, Cpu, Rocket, Award, CheckCircle2 } from 'lucide-react'
import { TiltCard } from '@/components/ui/TiltCard'

export function InnovationTimeline() {
  const stages = [
    {
      num: '01',
      day: 'Day 1',
      title: 'LEARN',
      theme: 'Entrepreneurship & Inspiration',
      desc: 'Entrepreneurship awareness, incubation ecosystem briefing, guest keynote, and 4-5 member team formation.',
      time: '9:30 AM – 12:50 PM',
      output: 'Teams formed & problem domains identified',
      coordinator: 'A. Lokesh & P. Hareesh',
      icon: Lightbulb,
      color: 'from-indigo-500 to-blue-500',
    },
    {
      num: '02',
      day: 'Day 2',
      title: 'IDEATE',
      theme: 'Problem → Solution',
      desc: 'Formulating startup problem statements, target user pain points, USP, and 3-minute rapid pitch presentations.',
      time: '2:00 PM – 4:00 PM',
      output: 'Problem statement & business model greenlighted',
      coordinator: 'B. Yogeswari & K. Raghavendra',
      icon: Target,
      color: 'from-violet-500 to-purple-500',
    },
    {
      num: '03',
      day: 'Day 3',
      title: 'BUILD',
      theme: 'Prototype Development',
      desc: 'Intensive lab development sprint creating functional prototypes (Software, AI/ML, IoT, Hardware, UI/UX).',
      time: '2:00 PM – 4:00 PM',
      output: 'Working proof-of-concept prototype ready',
      coordinator: 'P. Sony & R. Dileep Kumar',
      icon: Cpu,
      color: 'from-amber-500 to-orange-500',
    },
    {
      num: '04',
      day: 'Day 4',
      title: 'VALIDATE',
      theme: 'MVP & Business Pitch',
      desc: 'Minimum Viable Product release candidate, user validation sprint, and 11-point pitch deck structure assembly.',
      time: '2:00 PM – 4:00 PM',
      output: 'Deployed MVP & pitch deck submitted',
      coordinator: 'B. Amrutha & Rami Naidu',
      icon: Rocket,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      num: '05',
      day: 'Day 5',
      title: 'LAUNCH',
      theme: 'Final Pitch & Recognition',
      desc: 'Grand Auditorium live presentations before Ratan Tata Innovation Hub jury panel, live results, and award distribution.',
      time: '2:00 PM – 4:00 PM',
      output: 'Winners & award certificates distributed',
      coordinator: 'All Coordinators & Jury',
      icon: Award,
      color: 'from-cyan-500 to-blue-600',
    },
  ]

  return (
    <section className="py-24 border-b border-slate-800/80 bg-slate-950 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
          <span className="rounded-full bg-indigo-500/10 px-3.5 py-1 text-xs font-extrabold text-indigo-400 border border-indigo-500/20 uppercase tracking-widest">
            THE FIVE-DAY PATHWAY
          </span>
          <h2 className="text-4xl font-black text-white sm:text-5xl tracking-tight">
            FROM IDEA TO STARTUP
          </h2>
          <p className="text-sm font-semibold text-slate-400">
            Five days. Five stages. One journey.
          </p>
        </div>

        {/* Illuminated Progress Pipeline Bar */}
        <div className="hidden lg:flex items-center justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 z-0" />
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-violet-500 via-amber-500 to-emerald-500 -translate-y-1/2 z-0 opacity-70" />
          
          {stages.map((st) => (
            <div key={st.num} className="relative z-10 flex flex-col items-center gap-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 border-2 border-indigo-500 text-white font-black text-xs shadow-xl">
                {st.num}
              </div>
              <span className="text-[10px] font-extrabold text-indigo-300 uppercase">{st.title}</span>
            </div>
          ))}
        </div>

        {/* Day Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {stages.map((st) => {
            const Icon = st.icon
            return (
              <TiltCard key={st.num} className="p-6 space-y-4 shadow-2xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-slate-500">{st.num}</span>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 border border-slate-800 text-indigo-400`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{st.day}</span>
                    <h3 className="text-xl font-black text-white">{st.title}</h3>
                    <p className="text-xs font-semibold text-slate-300 mt-0.5">{st.theme}</p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-2 text-[11px]">
                  <div className="flex justify-between text-slate-400">
                    <span>Timing:</span>
                    <strong className="text-white">{st.time}</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Lead:</span>
                    <strong className="text-indigo-300">{st.coordinator}</strong>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium pt-1">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{st.output}</span>
                  </div>
                </div>
              </TiltCard>
            )
          })}
        </div>

      </div>
    </section>
  )
}
