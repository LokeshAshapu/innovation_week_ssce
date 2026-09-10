import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'
import { db } from '@/lib/db'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PitchSubmissionClient } from '@/components/dashboard/PitchSubmissionClient'

export default async function PitchPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const team = await db.team.findFirst({
    where: session.teamId ? { id: session.teamId } : { teamCode: 'IW-2026-1001' },
    include: { pitchSubmission: true },
  })

  if (!team) redirect('/register')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            Day 4 & 5 Submission
          </span>
          <h1 className="text-3xl font-extrabold text-white">Business Pitch Deck</h1>
          <p className="text-xs text-slate-400">
            Fill out the 11-point pitch deck structure required for Grand Finale jury evaluations.
          </p>
        </div>

        <PitchSubmissionClient teamId={team.id} existingSubmission={team.pitchSubmission} />
      </main>

      <Footer />
    </div>
  )
}
