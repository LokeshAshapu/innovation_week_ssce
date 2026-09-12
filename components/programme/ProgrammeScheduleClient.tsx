'use client'

import { useState } from 'react'
import { Clock, UserCheck, Target, CheckCircle2, ChevronRight } from 'lucide-react'

interface Session {
  id: string
  timeSlot: string
  sessionTitle: string
  activityDetails: string
  responsibility: string
  expectedOutput: string
}

interface Day {
  id: string
  dayNumber: number
  title: string
  theme: string
  date: string
  sessions: Session[]
}

export function ProgrammeScheduleClient({ days }: { days: Day[] }) {
  const [activeDay, setActiveDay] = useState<number>(1)

  const currentDay = days.find((d) => d.dayNumber === activeDay) || days[0]

  return (
    <div className="space-y-8">
      {/* Day Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-800 pb-4">
        {days.map((day) => {
          const isActive = day.dayNumber === activeDay
          return (
            <button
              key={day.dayNumber}
              onClick={() => setActiveDay(day.dayNumber)}
              className={`rounded-xl px-5 py-3 text-xs font-bold transition flex items-center gap-2 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>Day-{day.dayNumber}</span>
              <span className="hidden sm:inline opacity-75">| {day.title.split(' ')[0]}</span>
            </button>
          )
        })}
      </div>

      {/* Selected Day Banner */}
      {currentDay && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-md bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-400">
              Day-{currentDay.dayNumber}
            </span>
            <span className="text-xs text-slate-400 font-mono">Official Programme Schedule</span>
          </div>
          <h2 className="text-xl font-extrabold text-white sm:text-2xl">{currentDay.title}</h2>
          <p className="text-xs text-indigo-300 font-medium">Theme: {currentDay.theme}</p>
        </div>
      )}

      {/* Sessions List */}
      {currentDay && (
        <div className="space-y-4">
          {currentDay.sessions.map((session) => (
            <div
              key={session.id}
              className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-5 space-y-3 transition hover:border-slate-700"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{session.timeSlot}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <UserCheck className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>{session.responsibility}</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-white">{session.sessionTitle}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{session.activityDetails}</p>

              <div className="pt-2 border-t border-slate-800/60 flex items-center gap-2 text-xs text-emerald-400">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span><strong className="text-slate-300 font-medium">Expected Output:</strong> {session.expectedOutput}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
