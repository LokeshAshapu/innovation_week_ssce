import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'
import { db } from '@/lib/db'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { MVPSubmissionClient } from '@/components/dashboard/MVPSubmissionClient'

export default async function MVPPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const team = await db.team.findFirst({
    where: session.teamId ? { id: session.teamId } : { teamCode: 'IW-2026-1001' },
    include: { mvpSubmission: true },
  })

  if (!team) redirect('/register')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
            Day 4 Submission
          </span>
          <h1 className="text-3xl font-extrabold text-white">Minimum Viable Product (MVP)</h1>
          <p className="text-xs text-slate-400">
            Submit MVP features, validation results, current user feedback, and live demonstration links.
          </p>
        </div>

        <MVPSubmissionClient teamId={team.id} existingSubmission={team.mvpSubmission} />
      </main>

      <Footer />
    </div>
  )
}
