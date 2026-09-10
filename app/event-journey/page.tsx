import Link from 'next/link'
import { Rocket, Lightbulb, Target, Cpu, Award, CheckCircle2, ChevronRight, Sparkles, Flag, ArrowRight, ShieldCheck, Star } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { TiltCard } from '@/components/ui/TiltCard'

export default function EventJourneyPage() {
  const steps = [
    {
      day: 'DAY 1',
      title: 'LEARN → INSPIRE → FORM TEAMS',
      subtitle: 'Entrepreneurship Awareness & Ecosystem Briefing',
      icon: Lightbulb,
      badgeColor: 'from-indigo-500 to-cyan-500',
      textColor: 'text-indigo-400',
      glowColor: 'group-hover:shadow-indigo-500/20',
      borderColor: 'group-hover:border-indigo-500/50',
      activities: [
        'Students assemble in Auditorium & complete attendance check-in',
        'Formal inauguration & Innovation Week roadmap walkthrough',
        'Expert Keynote session by Guest Founder / Entrepreneur',
        'Incubation ecosystem briefing (Ratan Tata Hub & startup schemes)',
        'Team formation (3–4 members) & domain focus selection',
      ],
      output: 'Teams formed, problem domain identified & registered on portal',
    },
    {
      day: 'DAY 2',
      title: 'IDENTIFY → DESIGN → PRESENT',
      subtitle: 'Startup Idea Pitch Sprint',
      icon: Target,
      badgeColor: 'from-violet-500 to-purple-500',
      textColor: 'text-violet-400',
      glowColor: 'group-hover:shadow-violet-500/20',
      borderColor: 'group-hover:border-violet-500/50',
      activities: [
        'Team workspace setup & pitch presentation uploads',
        '3-minute startup idea presentations before evaluating jury panel',
        'Structure: Problem → Solution → Target Audience → Business USP → Impact',
        'Expert mentor feedback & greenlight for prototype build',
      ],
      output: 'Problem statement & business model approved for prototype build',
    },
    {
      day: 'DAY 3',
      title: 'BUILD → DEMONSTRATE → IMPROVE',
      subtitle: 'Hands-on Prototype Sprint',
      icon: Cpu,
      badgeColor: 'from-cyan-500 to-blue-500',
      textColor: 'text-cyan-400',
      glowColor: 'group-hover:shadow-cyan-500/20',
      borderColor: 'group-hover:border-cyan-500/50',
      activities: [
        'Intensive lab sprint (Software, Mobile, AI/ML, IoT, Hardware & UI/UX)',
        'Faculty mentor code reviews, architecture guidance & debugging',
        'Working proof-of-concept assembly & rapid iteration',
        '1-minute live tech demonstration preview',
      ],
      output: 'Working prototype assembled ready for MVP integration',
    },
    {
      day: 'DAY 4',
      title: 'MVP → VALIDATE → PITCH',
      subtitle: 'Minimum Viable Product & Business Validation',
      icon: Rocket,
      badgeColor: 'from-emerald-500 to-teal-500',
      textColor: 'text-emerald-400',
      glowColor: 'group-hover:shadow-emerald-500/20',
      borderColor: 'group-hover:border-emerald-500/50',
      activities: [
        'MVP packaging, deployment & peer pilot testing',
        'User validation feedback synthesis & metrics collection',
        '11-point slide pitch deck finalization (Problem, Solution, Market, Revenue)',
        'Mock pitch drill before student coordinators',
      ],
      output: 'Live MVP deployed and 11-slide pitch deck submitted on portal',
    },
    {
      day: 'DAY 5',
      title: 'PITCH → EVALUATE → RECOGNIZE',
      subtitle: 'Grand Finale & Incubation Offers',
      icon: Award,
      badgeColor: 'from-amber-500 to-yellow-500',
      textColor: 'text-amber-400',
      glowColor: 'group-hover:shadow-amber-500/20',
      borderColor: 'group-hover:border-amber-500/50',
      activities: [
        'Grand Auditorium pitch presentations (2 min pitch + 1 min rapid Q&A per team)',
        'Jury evaluation across 7 weighted criteria in real-time',
        'Live leaderboard results publication',
        'Certificate distribution & incubation offers by Ratan Tata Innovation Hub',
      ],
      output: 'Winners & Category Awardees recognized with PDF Certificates & Hub Support',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Ambient background glows */}
      <div className="relative overflow-hidden pt-12 pb-24">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-indigo-600/10 via-violet-600/10 to-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          
          {/* Header section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-300 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>5-DAY ACTION-PACKED HACKATHON ROADMAP</span>
            </div>
            <h1 className="text-4xl font-black text-white sm:text-6xl tracking-tight leading-tight">
              The Innovation <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-400 bg-clip-text text-transparent">
                Event Journey
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
              Follow the day-by-day roadmap from team formation to prototyping, MVP validation, and grand auditorium pitching before industry leaders.
            </p>
          </div>

          {/* Interactive Timeline */}
          <div className="relative space-y-12 before:absolute before:inset-0 before:left-6 before:w-1 before:bg-gradient-to-b before:from-indigo-500 before:via-purple-500 before:to-amber-500 md:before:left-1/2 md:before:-translate-x-1/2">
            {steps.map((step, idx) => {
              const Icon = step.icon
              const isEven = idx % 2 === 0

              return (
                <div
                  key={step.day}
                  className={`relative flex flex-col md:flex-row items-center gap-8 group ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Badge Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl transition group-hover:scale-110 group-hover:border-indigo-400">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${step.badgeColor} text-white shadow-md`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Spacer for two column balance on desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card Content Container */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0">
                    <div className={`rounded-3xl border border-slate-800/80 bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 space-y-5 shadow-2xl transition-all duration-300 ${step.borderColor} ${step.glowColor} hover:-translate-y-1`}>
                      
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className={`inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r ${step.badgeColor} px-3.5 py-1 text-xs font-black text-white shadow-md uppercase tracking-wider`}>
                          <Flag className="h-3.5 w-3.5" />
                          {step.day}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">{step.subtitle}</span>
                      </div>

                      <h3 className="text-xl font-black text-white tracking-tight">{step.title}</h3>

                      <div className="space-y-2.5 pt-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Schedule & Activities:</p>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                          {step.activities.map((act, i) => (
                            <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                              <span className={`h-1.5 w-1.5 rounded-full ${step.textColor} mt-2 shrink-0 bg-current`} />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-slate-800/80 flex items-start gap-3 text-xs sm:text-sm text-emerald-400 font-semibold bg-emerald-500/5 p-3.5 rounded-xl border border-emerald-500/20">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                        <div>
                          <span className="text-emerald-300 font-bold uppercase text-[11px] block tracking-wider">Day Outcome:</span>
                          <span className="text-slate-200">{step.output}</span>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              )
            })}
          </div>

          {/* Bottom Banner Call to Action */}
          <div className="relative rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/80 via-slate-900/90 to-violet-950/80 p-8 sm:p-12 text-center space-y-6 shadow-2xl backdrop-blur-xl overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 bg-indigo-500/10 blur-3xl pointer-events-none" />
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-bold text-amber-300">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span>LIMITED SPOTS • 3–4 MEMBERS PER TEAM</span>
            </div>
            
            <h2 className="text-3xl font-black text-white sm:text-4xl">Ready to Take On the Challenge?</h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Gather your teammates, refine your vision, and compete for incubation opportunities with the Ratan Tata Innovation Hub.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/register"
                className="group flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 px-8 py-4 text-sm font-extrabold text-white shadow-2xl shadow-indigo-600/40 transition hover:scale-105"
              >
                <Rocket className="h-4 w-4" />
                <span>Register Your Team Now</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </main>
      </div>

      <Footer />
    </div>
  )
}
