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

  let totalTeams = 0
  let totalMembers = 0
  let paidTeamsCount = 0
  let pendingPaymentsCount = 0
  let ideasCount = 0
  let prototypesCount = 0
  let mvpsCount = 0
  let pitchesCount = 0
  let evaluationsCount = 0
  let allTeams: any[] = []
  let payments: any[] = []
  let settings: any = null

  try {
    const res = await Promise.all([
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
    totalTeams = res[0]
    totalMembers = res[1]
    paidTeamsCount = res[2]
    pendingPaymentsCount = res[3]
    ideasCount = res[4]
    prototypesCount = res[5]
    mvpsCount = res[6]
    pitchesCount = res[7]
    evaluationsCount = res[8]
    allTeams = res[9]
    payments = res[10]
    settings = res[11]
  } catch (err) {
    console.error('Failed to load admin data:', err)
  }

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
