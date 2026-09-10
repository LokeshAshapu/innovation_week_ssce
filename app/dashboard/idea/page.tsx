import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'
import { db } from '@/lib/db'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { IdeaSubmissionClient } from '@/components/dashboard/IdeaSubmissionClient'

export default async function IdeaPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const team = await db.team.findFirst({
    where: session.teamId ? { id: session.teamId } : { teamCode: 'IW-2026-1001' },
    include: { ideaSubmission: true },
  })

  if (!team) redirect('/register')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="rounded-full bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
            Day 2 Submission
          </span>
          <h1 className="text-3xl font-extrabold text-white">Startup Idea Presentation</h1>
          <p className="text-xs text-slate-400">
            Define your startup name, problem statement, solution design, target users, USP & business potential.
          </p>
        </div>

        <IdeaSubmissionClient teamId={team.id} existingSubmission={team.ideaSubmission} />
      </main>

      <Footer />
    </div>
  )
}
