import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'
import { db } from '@/lib/db'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { EvaluatorPortalClient } from '@/components/evaluator/EvaluatorPortalClient'

export default async function EvaluatorPage() {
  const session = await getSession()

  // Support direct access for demo
  const currentUserRole = session?.role || 'EVALUATOR'

  let teams: any[] = []
  try {
    teams = await db.team.findMany({
      where: { status: 'APPROVED' },
      include: {
        members: true,
        ideaSubmission: true,
        prototypeSubmission: true,
        mvpSubmission: true,
        pitchSubmission: true,
        evaluations: true,
      },
      orderBy: { teamCode: 'asc' },
    })
  } catch (err) {
    console.error('Failed to load evaluator teams:', err)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
            Jury Scoring Portal
          </span>
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            Evaluator & Jury Dashboard
          </h1>
          <p className="text-xs text-slate-400">
            Score assigned teams across 7 weighted criteria (Innovation, Problem, Tech, MVP, Market, Teamwork, Impact).
          </p>
        </div>

        <EvaluatorPortalClient teams={teams} evaluatorName={session?.name || 'Dr. Jury Evaluator'} />
      </main>

      <Footer />
    </div>
  )
}
