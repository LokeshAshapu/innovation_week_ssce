import Link from 'next/link'
import { Rocket, Lightbulb, Target, Cpu, Award, CheckCircle2, ChevronRight } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function EventJourneyPage() {
  const steps = [
    {
      day: 'DAY 1',
      title: 'LEARN → INSPIRE → FORM TEAMS',
      subtitle: 'Entrepreneurship Awareness & Ecosystem Briefing',
      icon: Lightbulb,
      color: 'indigo',
      activities: [
        'Students assemble in seminar hall & attendance registration',
        'Formal inauguration & event rules walkthrough',
        'Expert keynote talk by guest entrepreneur/founder',
        'Startup Ecosystem briefing (Incubation, Ratan Tata Hub, funding schemes)',
        'Team formation (3-4 members) & domain identification',
      ],
      output: 'Teams formed, problem domains chosen, prepared for Day 2 pitch',
    },
    {
      day: 'DAY 2',
      title: 'IDENTIFY → DESIGN → PRESENT',
      subtitle: 'Startup Idea Presentation Sprint',
      icon: Target,
      color: 'violet',
      activities: [
        'Team setup and pitch deck uploads',
        '3-minute startup idea presentations before evaluation panel',
        'Presentation structure: Problem -> Solution -> Target Users -> USP -> Business Potential -> Impact',
        'Jury feedback and greenlight for prototype development',
      ],
      output: 'Problem statement & business model approved for prototype build',
    },
    {
      day: 'DAY 3',
      title: 'BUILD → DEMONSTRATE → IMPROVE',
      subtitle: 'Prototype Development Sprint',
      icon: Cpu,
      color: 'amber',
      activities: [
        'Hands-on lab sprint (Software, Mobile, AI/ML, IoT, Hardware, UI/UX, Mockup)',
        'Faculty mentor code review and troubleshooting',
        'Working proof-of-concept assembly & refinement',
        'Quick 1-minute live prototype preview',
      ],
      output: 'Working prototype ready for MVP integration',
    },
    {
      day: 'DAY 4',
      title: 'MVP → VALIDATE → PITCH',
      subtitle: 'Minimum Viable Product & Business Pitch',
      icon: Rocket,
      color: 'emerald',
      activities: [
        'MVP packaging, deployment & pilot testing',
        'Product validation results synthesis with peer testers',
        '11-point pitch deck preparation (Name, Problem, Solution, Market, Revenue, Impact)',
        'Timed pitch practice before coordinators',
      ],
      output: 'Deployed MVP and 11-slide pitch deck submitted on portal',
    },
    {
      day: 'DAY 5',
      title: 'PITCH → EVALUATE → RECOGNIZE',
      subtitle: 'Grand Finale & Award Ceremony',
      icon: Award,
      color: 'amber',
      activities: [
        'Grand Auditorium presentations (2 min pitch + 1 min rapid Q&A per team)',
        'Jury scoring across 7 weighted criteria in real-time',
        'Live results announcement on portal leaderboard',
        'Certificate distribution & incubation offers by Ratan Tata Innovation Hub',
      ],
      output: 'Winners, Runners-up & Category Awardees recognized with PDF certificates',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="rounded-full bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
            Digital Transformation Journey
          </span>
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            Event Journey & Pathway
          </h1>
          <p className="text-sm text-slate-400 font-medium">
            From registration to final pitch: how ideas evolve into startups across 5 days.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto space-y-8 before:absolute before:inset-0 before:left-8 before:w-0.5 before:bg-slate-800 md:before:left-1/2">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div
                key={step.day}
                className="relative flex flex-col md:flex-row items-start gap-6 group"
              >
                {/* Timeline Icon Badge */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-indigo-400 shadow-xl z-10 md:mx-auto">
                  <Icon className="h-8 w-8" />
                </div>

                {/* Card Content */}
                <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 shadow-lg transition hover:border-indigo-500/40">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-md bg-indigo-500/20 px-3 py-1 text-xs font-extrabold text-indigo-300">
                      {step.day}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{step.subtitle}</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-white">{step.title}</h3>

                  <ul className="space-y-2 text-xs text-slate-300">
                    {step.activities.map((act, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 border-t border-slate-800 flex items-center gap-2 text-xs text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span><strong className="text-slate-200">Expected Outcome:</strong> {step.output}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl hover:scale-105 transition"
          >
            <Rocket className="h-4 w-4" />
            <span>Begin Your Team Journey Now</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
