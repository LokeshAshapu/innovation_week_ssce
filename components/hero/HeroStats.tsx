'use client'

import { Calendar, Users, Award, Rocket } from 'lucide-react'
import { TiltCard } from '@/components/ui/TiltCard'

export function HeroStats() {
  const stats = [
    { label: '5 DAYS', desc: 'Action-Packed Sprint', icon: Calendar, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: '3–4', desc: 'Students / Team', icon: Users, color: 'text-violet-400', bg: 'bg-violet-500/10' },
    { label: '₹200', desc: 'Fee per Team', icon: Rocket, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: '100%', desc: 'Jury & Certificates', icon: Award, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 pt-8">
      {stats.map((s) => {
        const Icon = s.icon
        return (
          <TiltCard key={s.label} className="p-5 text-center shadow-xl hover:border-indigo-500/40">
            <div className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl ${s.bg} ${s.color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-black text-white sm:text-3xl tracking-tight">{s.label}</p>
            <p className="mt-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{s.desc}</p>
          </TiltCard>
        )
      })}
    </div>
  )
}
