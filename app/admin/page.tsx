import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'
import { db } from '@/lib/db'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient'

export default async function AdminPage() {
  const session = await getSession()

  // Verify role or default to admin view for demo
  const userRole = session?.role || 'ADMIN'

  const [
    totalTeams,
    totalMembers,
    paidTeamsCount,
    pendingPaymentsCount,
    ideasCount,
    prototypesCount,
    mvpsCount,
    pitchesCount,
    evaluationsCount,
    allTeams,
    payments,
    settings,
  ] = await Promise.all([
    db.team.count(),
    db.teamMember.count(),
    db.team.count({ where: { paymentStatus: 'SUCCESS' } }),
    db.team.count({ where: { paymentStatus: { in: ['PENDING', 'INITIATED', 'VERIFICATION_REQUIRED'] } } }),
    db.ideaSubmission.count(),
    db.prototypeSubmission.count(),
    db.mVPSubmission.count(),
    db.pitchSubmission.count(),
    db.evaluation.count(),
    db.team.findMany({
      include: {
        members: true,
        payments: true,
        ideaSubmission: true,
        evaluations: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
    db.payment.findMany({
      include: { team: true },
      orderBy: { createdAt: 'desc' },
    }),
    db.eventSettings.findUnique({ where: { id: '1' } }),
  ])

  const stats = {
    totalTeams,
    totalMembers,
    paidTeamsCount,
    pendingPaymentsCount,
    ideasCount,
    prototypesCount,
    mvpsCount,
    pitchesCount,
    evaluationsCount,
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="rounded-full bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
              Admin & Operations Suite
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-1">Management Control Center</h1>
            <p className="text-xs text-slate-400">Sri Sivani College of Engineering • Dept of CSE & AI-ML</p>
          </div>
        </div>

        <AdminDashboardClient stats={stats} teams={allTeams} payments={payments} settings={settings} />
      </main>

      <Footer />
    </div>
  )
}
