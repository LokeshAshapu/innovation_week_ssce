'use client'

import { useState } from 'react'
import { Award, Download, Bell, Sparkles, CheckCircle2, Clock, Calendar, Lightbulb, Cpu, Target, ArrowRight, UserCheck, ShieldCheck, Trophy, Medal } from 'lucide-react'
import { generateCertificatePDF } from '@/lib/certificates'

interface TeamDashboardClientProps {
  team: any
  announcements?: any[]
  eventSettings?: any
}

export function TeamDashboardClient({ team, announcements = [], eventSettings }: TeamDashboardClientProps) {
  const leader = team.members?.find((m: any) => m.isLeader) || team.members?.[0]
  const certificates = team.certificates || []

  // Check if team has an assigned award
  const awardCert = certificates.find((c: any) => c.awardType && c.awardType !== 'PARTICIPATION') || certificates[0]
  const awardType = awardCert?.awardType || 'PARTICIPATION'

  const awardTitleMap: Record<string, { title: string; color: string; badge: string; icon: string }> = {
    WINNER: {
      title: '🏆 CONGRATULATIONS! 1ST PLACE WINNER',
      badge: 'FIRST PLACE WINNER',
      color: 'from-amber-500 via-yellow-500 to-amber-600',
      icon: '🏆',
    },
    RUNNER_UP: {
      title: '🥈 CONGRATULATIONS! RUNNER-UP AWARD (2ND PLACE)',
      badge: 'RUNNER-UP AWARD',
      color: 'from-slate-300 via-slate-100 to-slate-400 text-slate-950',
      icon: '🥈',
    },
    SECOND_RUNNER_UP: {
      title: '🥉 CONGRATULATIONS! SECOND RUNNER-UP (3RD PLACE)',
      badge: '2ND RUNNER-UP',
      color: 'from-amber-700 via-orange-600 to-amber-800',
      icon: '🥉',
    },
    BEST_INNOVATION: {
      title: '💡 CONGRATULATIONS! BEST INNOVATION AWARD',
      badge: 'BEST INNOVATION',
      color: 'from-indigo-600 via-purple-600 to-violet-700',
      icon: '💡',
    },
    BEST_TECH: {
      title: '⚙️ CONGRATULATIONS! BEST TECHNICAL SOLUTION AWARD',
      badge: 'BEST TECHNICAL SOLUTION',
      color: 'from-cyan-600 via-blue-600 to-indigo-700',
      icon: '⚙️',
    },
    BEST_IMPACT: {
      title: '🌍 CONGRATULATIONS! BEST SOCIAL & ECONOMIC IMPACT AWARD',
      badge: 'BEST IMPACT',
      color: 'from-emerald-600 via-teal-600 to-emerald-700',
      icon: '🌍',
    },
  }

  const awardMeta = awardTitleMap[awardType]

  const handleDownloadCert = (member: any) => {
    const cert = certificates.find((c: any) => c.rollNumber === member.rollNumber)
    const certCode = cert?.certCode || `CERT-IW2026-${Math.floor(1000 + Math.random() * 9000)}`
    const memberAward = cert?.awardType || awardType

    const doc = generateCertificatePDF({
      studentName: member.name,
      rollNumber: member.rollNumber,
      teamName: team.name,
      startupName: team.ideaSubmission?.startupName,
      awardType: memberAward,
      certCode,
      issuedDate: '2026-09-25',
    })

    doc.save(`Innovation_Week_2026_Certificate_${member.name.replace(/\s+/g, '_')}.pdf`)
  }

  return (
    <div className="space-y-8">
      
      {/* 1. LIVE AWARD & WINNERS BANNER */}
      {awardMeta && (
        <div className={`rounded-3xl bg-gradient-to-r ${awardMeta.color} p-6 sm:p-8 space-y-3 shadow-2xl text-slate-950`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{awardMeta.icon}</span>
            <div>
              <span className="rounded-full bg-slate-950/20 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white">
                {awardMeta.badge}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {awardMeta.title}
              </h2>
            </div>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-900/90 leading-relaxed">
            The Jury & Department Admin have officially announced the results for <strong>Innovation Week 2026</strong>! Your team <strong>"{team.name}"</strong> has been awarded <strong>{awardMeta.badge}</strong>! Certificates are now available for download below.
          </p>
        </div>
      )}

      {/* 2. ADMIN ANNOUNCEMENTS FEED */}
      {announcements.length > 0 && (
        <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Bell className="h-4 w-4 text-indigo-400" />
            <span>Latest Admin Announcements ({announcements.length})</span>
          </h2>
          <div className="space-y-3">
            {announcements.slice(0, 3).map((a: any) => (
              <div key={a.id} className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{a.title}</span>
                  <span className={`rounded px-2 py-0.5 text-[9px] font-bold ${
                    a.priority === 'URGENT' ? 'bg-rose-500/20 text-rose-300' : 'bg-indigo-500/20 text-indigo-300'
                  }`}>
                    {a.priority}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{a.content}</p>
                <p className="text-[10px] text-slate-500 font-mono">
                  Posted: {new Date(a.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. OFFICIAL CERTIFICATES & AWARDS DOWNLOAD SECTION */}
      <div className="rounded-2xl border border-indigo-500/40 bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-950 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">Event Certificates & Awards</h2>
              <p className="text-xs text-slate-300">
                Official PDF certificates for all registered team members of <strong>{team.name}</strong>
              </p>
            </div>
          </div>

          <span className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 text-xs font-bold text-emerald-400 shrink-0">
            ✓ Official Verified Certificates
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {team.members.map((m: any, idx: number) => {
            const cert = certificates.find((c: any) => c.rollNumber === m.rollNumber)
            const mAward = cert?.awardType || awardType
            const certCode = cert?.certCode || `CERT-IW2026-${1000 + idx}`

            return (
              <div key={m.id || idx} className="rounded-xl bg-slate-950 p-5 border border-slate-800 space-y-3 flex flex-col justify-between shadow-lg">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{m.name}</span>
                    {m.isLeader ? (
                      <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[9px] font-bold text-indigo-300">
                        LEADER 👑
                      </span>
                    ) : (
                      <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-bold text-slate-400">
                        MEMBER
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-mono text-indigo-400">{m.rollNumber}</p>
                  <p className="text-[11px] text-slate-400">{m.branch} {m.diplomaBranch ? `(${m.diplomaBranch})` : ''} • {m.year}</p>

                  <div className="pt-2 border-t border-slate-900 text-xs">
                    <span className="text-[10px] text-slate-500 block">Award Category:</span>
                    <span className="font-bold text-amber-300 text-xs">{mAward.replace(/_/g, ' ')}</span>
                  </div>

                  <div className="text-[10px] text-slate-500 font-mono">
                    Code: {certCode}
                  </div>
                </div>

                <button
                  onClick={() => handleDownloadCert(m)}
                  className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 py-2.5 text-xs font-bold text-white hover:from-indigo-500 hover:to-violet-500 transition shadow-md"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download PDF Certificate</span>
                </button>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
