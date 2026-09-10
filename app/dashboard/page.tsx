import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'
import { db } from '@/lib/db'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Rocket, CheckCircle2, Clock, Calendar, Lightbulb, Cpu, Target, Award, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react'

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }

  let team: any = null

  try {
    // Find team for current user or default to AgriSense AI team
    team = session.teamId
      ? await db.team.findUnique({
          where: { id: session.teamId },
          include: {
            members: true,
            payments: true,
            ideaSubmission: true,
            prototypeSubmission: true,
            mvpSubmission: true,
            pitchSubmission: true,
            certificates: true,
          },
        })
      : null

    if (!team) {
      // Fallback to first seeded team for demo viewing
      team = await db.team.findFirst({
        where: { teamCode: 'IW-2026-1001' },
        include: {
          members: true,
          payments: true,
          ideaSubmission: true,
          prototypeSubmission: true,
          mvpSubmission: true,
          pitchSubmission: true,
          certificates: true,
        },
      })
    }
  } catch (err) {
    console.error('Failed to query dashboard team data:', err)
  }

  if (!team) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p>No registered team found. <Link href="/register" className="text-indigo-400 underline">Register a team here</Link>.</p>
      </div>
    )
  }

  const leader = team.members.find((m) => m.isLeader) || team.members[0]
  const payment = team.payments[0]

  // Calculate progress step (1 to 5)
  let currentStep = 1
  if (team.paymentStatus === 'SUCCESS') currentStep = 2
  if (team.ideaSubmission) currentStep = 3
  if (team.prototypeSubmission) currentStep = 4
  if (team.mvpSubmission && team.pitchSubmission) currentStep = 5

  const progressPercent = (currentStep / 5) * 100

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome Banner */}
        <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-violet-950/80 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-indigo-500/20 px-2.5 py-1 text-xs font-mono font-bold text-indigo-300">
                {team.teamCode}
              </span>
              <span className="rounded-md bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                ✓ {team.paymentStatus === 'SUCCESS' ? 'Registration Confirmed' : 'Payment Pending'}
              </span>
            </div>

            <h1 className="text-2xl font-extrabold text-white sm:text-4xl">
              Welcome, {leader.name}!
            </h1>
            <p className="text-xs text-slate-300">
              Team: <strong className="text-white">{team.name}</strong> | Size: {team.size} Students
            </p>
          </div>

          <div className="rounded-xl bg-slate-950/80 p-4 border border-slate-800 space-y-1 text-right text-xs shrink-0">
            <span className="text-slate-400">Overall Event Progress</span>
            <p className="text-2xl font-black text-indigo-400">{Math.round(progressPercent)}%</p>
            <span className="text-[10px] text-slate-400">Step {currentStep} of 5 Completed</span>
          </div>
        </div>

        {/* SECTION 19: VISUAL EVENT PROGRESS TRACKER */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-400" />
            <span>Event Progress Stepper</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            
            {/* Step 1 */}
            <div className={`rounded-xl border p-4 space-y-2 ${currentStep >= 1 ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-slate-800 bg-slate-950'}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">DAY 1</span>
                {currentStep >= 1 ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Clock className="h-4 w-4 text-slate-500" />}
              </div>
              <p className="text-xs font-bold text-white">Team Registered</p>
              <p className="text-[11px] text-slate-400">Awareness & Ecosystem</p>
            </div>

            {/* Step 2 */}
            <div className={`rounded-xl border p-4 space-y-2 ${currentStep >= 2 ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-slate-800 bg-slate-950'}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">DAY 2</span>
                {team.ideaSubmission ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Clock className="h-4 w-4 text-slate-500" />}
              </div>
              <p className="text-xs font-bold text-white">Idea Submitted</p>
              <p className="text-[11px] text-slate-400">{team.ideaSubmission ? 'Submitted ✓' : 'Pending'}</p>
            </div>

            {/* Step 3 */}
            <div className={`rounded-xl border p-4 space-y-2 ${currentStep >= 3 ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-slate-800 bg-slate-950'}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">DAY 3</span>
                {team.prototypeSubmission ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Clock className="h-4 w-4 text-slate-500" />}
              </div>
              <p className="text-xs font-bold text-white">Prototype Build</p>
              <p className="text-[11px] text-slate-400">{team.prototypeSubmission ? 'Submitted ✓' : 'Pending'}</p>
            </div>

            {/* Step 4 */}
            <div className={`rounded-xl border p-4 space-y-2 ${currentStep >= 4 ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-slate-800 bg-slate-950'}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">DAY 4</span>
                {team.mvpSubmission ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Clock className="h-4 w-4 text-slate-500" />}
              </div>
              <p className="text-xs font-bold text-white">MVP & Pitch</p>
              <p className="text-[11px] text-slate-400">{team.mvpSubmission ? 'Submitted ✓' : 'Pending'}</p>
            </div>

            {/* Step 5 */}
            <div className={`rounded-xl border p-4 space-y-2 ${currentStep >= 5 ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-slate-800 bg-slate-950'}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">DAY 5</span>
                {team.certificates.length > 0 ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Award className="h-4 w-4 text-amber-400" />}
              </div>
              <p className="text-xs font-bold text-white">Grand Finale</p>
              <p className="text-[11px] text-slate-400">{team.certificates.length > 0 ? 'Evaluated ✓' : 'Pitch Ready'}</p>
            </div>

          </div>
        </div>

        {/* Quick Challenge Submission Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <Link
            href="/dashboard/idea"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-3 hover:border-indigo-500/50 transition group"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <Lightbulb className="h-5 w-5" />
              </div>
              {team.ideaSubmission ? (
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Submitted ✓
                </span>
              ) : (
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Action Needed</span>
              )}
            </div>
            <div>
              <h3 className="font-bold text-white text-base group-hover:text-indigo-400 transition">Day 2: Idea Submission</h3>
              <p className="text-xs text-slate-400 mt-1">Problem, solution, target users, USP & pitch deck.</p>
            </div>
            <div className="pt-2 text-xs font-semibold text-indigo-400 flex items-center gap-1">
              <span>Open Form</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/dashboard/prototype"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-3 hover:border-indigo-500/50 transition group"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                <Cpu className="h-5 w-5" />
              </div>
              {team.prototypeSubmission ? (
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Submitted ✓
                </span>
              ) : (
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Action Needed</span>
              )}
            </div>
            <div>
              <h3 className="font-bold text-white text-base group-hover:text-violet-400 transition">Day 3: Prototype Build</h3>
              <p className="text-xs text-slate-400 mt-1">GitHub repository, demo URL & prototype proof.</p>
            </div>
            <div className="pt-2 text-xs font-semibold text-indigo-400 flex items-center gap-1">
              <span>Open Form</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/dashboard/mvp"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-3 hover:border-indigo-500/50 transition group"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <Rocket className="h-5 w-5" />
              </div>
              {team.mvpSubmission ? (
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Submitted ✓
                </span>
              ) : (
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Action Needed</span>
              )}
            </div>
            <div>
              <h3 className="font-bold text-white text-base group-hover:text-amber-400 transition">Day 4: MVP Release</h3>
              <p className="text-xs text-slate-400 mt-1">Minimum viable product features & user validation.</p>
            </div>
            <div className="pt-2 text-xs font-semibold text-indigo-400 flex items-center gap-1">
              <span>Open Form</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/dashboard/pitch"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-3 hover:border-indigo-500/50 transition group"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Target className="h-5 w-5" />
              </div>
              {team.pitchSubmission ? (
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Submitted ✓
                </span>
              ) : (
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Action Needed</span>
              )}
            </div>
            <div>
              <h3 className="font-bold text-white text-base group-hover:text-emerald-400 transition">Day 4: Business Pitch</h3>
              <p className="text-xs text-slate-400 mt-1">11-point pitch deck structure for jury finale.</p>
            </div>
            <div className="pt-2 text-xs font-semibold text-indigo-400 flex items-center gap-1">
              <span>Open Form</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

        </div>

        {/* Team Members Grid */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-indigo-400" />
            <span>Registered Team Members</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.members.map((m) => (
              <div key={m.id} className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{m.name}</span>
                  {m.isLeader && (
                    <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[9px] font-bold text-indigo-300">
                      LEADER
                    </span>
                  )}
                </div>
                <p className="text-xs font-mono text-indigo-400">{m.rollNumber}</p>
                <p className="text-xs text-slate-400">{m.branch} {m.diplomaBranch ? `(${m.diplomaBranch})` : ''} • {m.year}</p>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}
