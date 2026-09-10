import { db } from '@/lib/db'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Award, Trophy, Medal, Star, Lock, ShieldCheck } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function LeaderboardPage() {
  let settings: any = null
  let teams: any[] = []

  try {
    settings = await db.eventSettings.findUnique({ where: { id: '1' } })
    teams = await db.team.findMany({
      where: { status: 'APPROVED' },
      include: {
        ideaSubmission: true,
        evaluations: true,
        certificates: true,
      },
    })
  } catch (err) {
    console.error('Failed to load leaderboard data:', err)
  }

  const resultsPublished = settings?.resultsPublished ?? true

  // Calculate average scores and sort teams
  const rankedTeams = teams.map((team) => {
    const totalEv = team.evaluations.length
    const avgScore = totalEv > 0
      ? team.evaluations.reduce((sum, ev) => sum + ev.totalScore, 0) / totalEv
      : 0
    const topAward = team.certificates[0]?.awardType || (avgScore > 90 ? 'WINNER' : avgScore > 85 ? 'RUNNER_UP' : 'PARTICIPATION')

    return {
      id: team.id,
      code: team.teamCode,
      name: team.name,
      startupName: team.ideaSubmission?.startupName || team.name,
      domain: team.ideaSubmission?.domain || 'Innovation',
      avgScore: Math.round(avgScore * 10) / 10,
      award: topAward,
    }
  }).sort((a, b) => b.avgScore - a.avgScore)

  const awardBadgeMap: Record<string, { label: string; color: string; icon: typeof Trophy }> = {
    WINNER: { label: '🥇 1st Place Winner', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40', icon: Trophy },
    RUNNER_UP: { label: '🥈 Runner-Up', color: 'bg-slate-400/20 text-slate-200 border-slate-400/40', icon: Medal },
    SECOND_RUNNER_UP: { label: '🥉 2nd Runner-Up', color: 'bg-amber-700/20 text-amber-400 border-amber-700/40', icon: Medal },
    BEST_INNOVATION: { label: '💡 Best Innovation', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40', icon: Star },
    BEST_TECH: { label: '⚡ Best Technical Solution', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40', icon: Star },
    BEST_IMPACT: { label: '🌍 Best Social Impact', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', icon: Star },
    BEST_BUSINESS: { label: '📊 Best Business Model', color: 'bg-violet-500/20 text-violet-300 border-violet-500/40', icon: Star },
    BEST_PROTOTYPE: { label: '🛠️ Best Prototype', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40', icon: Star },
    PARTICIPATION: { label: '✨ Recognition', color: 'bg-slate-800 text-slate-400 border-slate-700', icon: Award },
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
            Official Standings & Winners
          </span>
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            Innovation Week Leaderboard
          </h1>
          <p className="text-sm text-slate-400 font-medium">
            Final startup venture rankings computed automatically from weighted jury evaluations out of 100 points.
          </p>
        </div>

        {!resultsPublished ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center space-y-4 max-w-xl mx-auto">
            <Lock className="h-12 w-12 text-indigo-400 mx-auto" />
            <h2 className="text-xl font-bold text-white">Results Pending Announcement</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              The jury evaluation results will be officially published by the Administrator during the Day 5 Grand Finale Valedictory ceremony.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl">
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-400" />
                <h2 className="text-base font-bold text-white">Final Jury Rankings</h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">100% Weighted Score Scale</span>
            </div>

            <div className="divide-y divide-slate-800">
              {rankedTeams.map((t, idx) => {
                const badge = awardBadgeMap[t.award] || awardBadgeMap['PARTICIPATION']
                const isTop3 = idx < 3

                return (
                  <div
                    key={t.id}
                    className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:bg-slate-800/40 ${
                      idx === 0 ? 'bg-amber-500/5' : idx === 1 ? 'bg-slate-400/5' : idx === 2 ? 'bg-amber-700/5' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank Number */}
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-extrabold text-base border ${
                        idx === 0 ? 'bg-amber-500 text-slate-950 border-amber-400' :
                        idx === 1 ? 'bg-slate-300 text-slate-950 border-slate-200' :
                        idx === 2 ? 'bg-amber-700 text-white border-amber-600' :
                        'bg-slate-950 text-slate-400 border-slate-800'
                      }`}>
                        #{idx + 1}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-base">{t.startupName}</h3>
                          <span className="text-[11px] text-slate-400">({t.name})</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="font-mono text-indigo-400">{t.code}</span>
                          <span>•</span>
                          <span>Domain: {t.domain}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                      <span className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-bold ${badge.color}`}>
                        {badge.label}
                      </span>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Weighted Score</span>
                        <p className="text-xl font-black text-white">{t.avgScore} <span className="text-xs font-normal text-slate-400">/ 100</span></p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
