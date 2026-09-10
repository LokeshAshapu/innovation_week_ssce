'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, UserCheck, CheckCircle2, ArrowRight } from 'lucide-react'
import { TiltCard } from '@/components/ui/TiltCard'

export function ProgrammePreview() {
  const [selectedDay, setSelectedDay] = useState(1)

  const programmeData = [
    {
      day: 1,
      title: 'INAUGURAL & ENTREPRENEURSHIP AWARENESS',
      theme: 'Understanding Entrepreneurship, Innovation and the Startup Ecosystem',
      date: 'Day 1 (Monday)',
      sessions: [
        { time: '9:30 AM', title: 'Gathering & Attendance', lead: 'A. Lokesh & P. Hareesh', output: '100% Attendance & Registration' },
        { time: '10:40 AM', title: 'Expert Keynote Talk', lead: 'Guest Founder', output: 'Entrepreneurial Inspiration' },
        { time: '11:05 AM', title: 'Startup Ecosystem Session', lead: 'Incubator Lead', output: 'Ratan Tata Hub Guidelines' },
      ],
    },
    {
      day: 2,
      title: 'STARTUP IDEA PRESENTATION',
      theme: 'Problem Identification, Solution Design and Business Model',
      date: 'Day 2 (Tuesday)',
      sessions: [
        { time: '2:00 PM', title: 'Assembly & Attendance', lead: 'B. Yogeswari & K. Raghavendra', output: 'Teams Assembled' },
        { time: '2:25 PM', title: 'Startup Idea Presentations', lead: 'Evaluator Panel', output: '3-Min Pitch Rounds' },
        { time: '3:50 PM', title: 'Evaluation & Feedback', lead: 'Faculty Coordinators', output: 'Greenlight for Prototype Sprint' },
      ],
    },
    {
      day: 3,
      title: 'PROTOTYPE DEVELOPMENT',
      theme: 'Converting Startup Ideas into Working Prototypes',
      date: 'Day 3 (Wednesday)',
      sessions: [
        { time: '2:00 PM', title: 'Assembly & Lab Check-in', lead: 'P. Sony & R. Dileep Kumar', output: 'Lab Workstations Activated' },
        { time: '2:25 PM', title: 'Intensive Development Sprint', lead: 'Team Members', output: 'Functional Code & Hardware Jigs' },
        { time: '3:20 PM', title: 'Mentor Interaction', lead: 'Faculty Mentors', output: 'Technical Guidance Delivered' },
      ],
    },
    {
      day: 4,
      title: 'MVP DEVELOPMENT & BUSINESS PITCH',
      theme: 'Product Validation, Minimum Viable Product and Startup Pitch',
      date: 'Day 4 (Thursday)',
      sessions: [
        { time: '2:00 PM', title: 'MVP Briefing & Packaging', lead: 'B. Amrutha & Rami Naidu', output: 'Live Demo URL Ready' },
        { time: '3:05 PM', title: 'Product Validation', lead: 'Team Leaders', output: 'User Feedback Synthesized' },
        { time: '3:25 PM', title: 'Pitch Deck Practice', lead: 'Team Pitchers', output: '11-Point Pitch Deck Submitted' },
      ],
    },
    {
      day: 5,
      title: 'GRAND FINALE & AWARDS',
      theme: 'Final Startup Presentation, Evaluation and Recognition',
      date: 'Day 5 (Friday)',
      sessions: [
        { time: '2:00 PM', title: 'Auditorium Assembly', lead: 'All Coordinators', output: 'Jury & Audience Ready' },
        { time: '2:15 PM', title: 'Grand Finale Pitches', lead: 'Jury Panel', output: 'Real-Time Weighted Scoring' },
        { time: '3:47 PM', title: 'Prize & Certificate Distribution', lead: 'Management & Guests', output: 'PDF Certificates Issued' },
      ],
    },
  ]

  const activeData = programmeData.find((d) => d.day === selectedDay) || programmeData[0]

  return (
    <section className="py-24 border-b border-slate-800/80 bg-slate-950/40 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">SCHEDULE PREVIEW</span>
            <h2 className="text-3xl font-black text-white sm:text-4xl mt-1">FIVE DAYS OF INNOVATION</h2>
          </div>

          <Link
            href="/programme"
            className="flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition"
          >
            <span>View Full Programme Schedule</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {programmeData.map((d) => (
            <button
              key={d.day}
              onClick={() => setSelectedDay(d.day)}
              className={`rounded-2xl px-6 py-3.5 text-xs font-black transition shrink-0 ${
                selectedDay === d.day
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              DAY 0{d.day}
            </button>
          ))}
        </div>

        {/* Selected Day Details Card */}
        <TiltCard className="p-8 space-y-6 shadow-2xl">
          <div className="space-y-1 border-b border-slate-800 pb-4">
            <span className="text-xs font-mono font-bold text-indigo-400">DAY 0{activeData.day} • {activeData.date}</span>
            <h3 className="text-2xl font-black text-white">{activeData.title}</h3>
            <p className="text-xs text-slate-400 font-medium">Theme: {activeData.theme}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeData.sessions.map((s) => (
              <div key={s.title} className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center text-indigo-400 font-bold">
                  <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {s.time}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{s.lead}</span>
                </div>
                <h4 className="font-bold text-white text-sm">{s.title}</h4>
                <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> {s.output}
                </p>
              </div>
            ))}
          </div>
        </TiltCard>

      </div>
    </section>
  )
}
