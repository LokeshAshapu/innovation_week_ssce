'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Users,
  CreditCard,
  Lightbulb,
  Cpu,
  Rocket,
  Target,
  Award,
  BarChart2,
  CheckCircle2,
  Clock,
  Search,
  Download,
  Play,
  Pause,
  RotateCcw,
  Bell,
  Settings,
  ShieldCheck,
  Check,
  X,
  Plus,
  FileSpreadsheet,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { exportToCSV } from '@/lib/export'
import { generateCertificatePDF } from '@/lib/certificates'

interface AdminDashboardClientProps {
  stats: {
    totalTeams: number
    totalMembers: number
    paidTeamsCount: number
    pendingPaymentsCount: number
    ideasCount: number
    prototypesCount: number
    mvpsCount: number
    pitchesCount: number
    evaluationsCount: number
  }
  teams: any[]
  payments: any[]
  settings: any
}

export function AdminDashboardClient({ stats, teams, payments, settings }: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'TEAMS' | 'PAYMENTS' | 'TIMER' | 'ANNOUNCEMENTS' | 'CERTIFICATES' | 'SETTINGS'>('OVERVIEW')

  // Search & Filter state for teams
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('ALL')

  // Presentation Timer State
  const [timerSeconds, setTimerSeconds] = useState(180) // 3 minutes total
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0)

  // Announcements State
  const [annTitle, setAnnTitle] = useState('')
  const [annContent, setAnnContent] = useState('')
  const [annPriority, setAnnPriority] = useState('NORMAL')
  const [annMsg, setAnnMsg] = useState<string | null>(null)

  // Settings state
  const [feeAmount, setFeeAmount] = useState(settings?.regFee || 500)
  const [upiId, setUpiId] = useState(settings?.upiId || 'srisivani.cse@upi')
  const [resultsPublished, setResultsPublished] = useState(settings?.resultsPublished ?? true)

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1)
      }, 1000)
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerRunning, timerSeconds])

  // Recharts Data Prep
  const branchCounts: Record<string, number> = {}
  teams.forEach((t) => {
    t.members.forEach((m: any) => {
      const b = m.branch || 'CSE'
      branchCounts[b] = (branchCounts[b] || 0) + 1
    })
  })

  const branchChartData = Object.keys(branchCounts).map((key) => ({
    name: key,
    students: branchCounts[key],
  }))

  const paymentPieData = [
    { name: 'Paid', value: stats.paidTeamsCount, color: '#10b981' },
    { name: 'Pending / Unpaid', value: stats.pendingPaymentsCount, color: '#f59e0b' },
  ]

  const submissionBarData = [
    { stage: 'Ideas', count: stats.ideasCount },
    { stage: 'Prototypes', count: stats.prototypesCount },
    { stage: 'MVPs', count: stats.mvpsCount },
    { stage: 'Pitches', count: stats.pitchesCount },
  ]

  // Filtered Teams
  const filteredTeams = teams.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.teamCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.members.some((m: any) => m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesBranch =
      selectedBranch === 'ALL' || t.members.some((m: any) => m.branch === selectedBranch)

    return matchesSearch && matchesBranch
  })

  // Payment Approve handler
  const handleApprovePayment = async (paymentId: string) => {
    try {
      const res = await fetch('/api/payment/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId }),
      })
      if (res.ok) {
        window.location.reload()
      }
    } catch (e) {
      console.error(e)
    }
  }

  // Announcement Publish handler
  const handlePublishAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault()
    setAnnMsg(null)
    try {
      const res = await fetch('/api/announcements/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: annTitle, content: annContent, priority: annPriority }),
      })
      if (res.ok) {
        setAnnMsg('Announcement published!')
        setAnnTitle('')
        setAnnContent('')
      }
    } catch (e) {
      console.error(e)
    }
  }

  // CSV Export Handlers
  const handleExportTeams = () => {
    const data = teams.map((t) => ({
      'Team Code': t.teamCode,
      'Team Name': t.name,
      'Leader Name': t.members.find((m: any) => m.isLeader)?.name || t.members[0]?.name,
      'Leader Roll': t.members.find((m: any) => m.isLeader)?.rollNumber || t.members[0]?.rollNumber,
      'Leader Branch': t.members.find((m: any) => m.isLeader)?.branch || t.members[0]?.branch,
      'Team Size': t.size,
      'Payment Status': t.paymentStatus,
      'Registration Status': t.status,
    }))
    exportToCSV(data, 'Innovation_Week_2026_Teams')
  }

  const handleExportStudents = () => {
    const studentList: any[] = []
    teams.forEach((t) => {
      t.members.forEach((m: any) => {
        studentList.push({
          'Team Code': t.teamCode,
          'Team Name': t.name,
          'Student Name': m.name,
          'Roll Number': m.rollNumber,
          Branch: m.branch,
          'Diploma Branch': m.diplomaBranch || 'N/A',
          Year: m.year,
          Role: m.isLeader ? 'Leader' : 'Member',
          Email: m.email || '',
          Phone: m.phone || '',
        })
      })
    })
    exportToCSV(studentList, 'Innovation_Week_2026_Students')
  }

  return (
    <div className="space-y-8">
      
      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'OVERVIEW' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <BarChart2 className="h-4 w-4" />
          <span>Analytics & Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('TEAMS')}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'TEAMS' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Team Management ({teams.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('PAYMENTS')}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'PAYMENTS' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <CreditCard className="h-4 w-4" />
          <span>Payments Verification</span>
        </button>

        <button
          onClick={() => setActiveTab('TIMER')}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'TIMER' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Clock className="h-4 w-4 text-amber-400" />
          <span>Live Presentation Timer (3 Min)</span>
        </button>

        <button
          onClick={() => setActiveTab('ANNOUNCEMENTS')}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'ANNOUNCEMENTS' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Bell className="h-4 w-4" />
          <span>Announcements</span>
        </button>

        <button
          onClick={() => setActiveTab('CERTIFICATES')}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'CERTIFICATES' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Award className="h-4 w-4" />
          <span>Certificates</span>
        </button>

        <button
          onClick={() => setActiveTab('SETTINGS')}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'SETTINGS' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </button>
      </div>

      {/* SECTION 26: EXECUTIVE STATS OVERVIEW */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-8">
          
          {/* Top 9 Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-center">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Teams</span>
              <p className="text-xl font-extrabold text-white mt-1">{stats.totalTeams}</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-center">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Students</span>
              <p className="text-xl font-extrabold text-indigo-400 mt-1">{stats.totalMembers}</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-center">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Paid</span>
              <p className="text-xl font-extrabold text-emerald-400 mt-1">{stats.paidTeamsCount}</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-center">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Pending</span>
              <p className="text-xl font-extrabold text-amber-400 mt-1">{stats.pendingPaymentsCount}</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-center">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Ideas</span>
              <p className="text-xl font-extrabold text-violet-400 mt-1">{stats.ideasCount}</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-center">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Prototypes</span>
              <p className="text-xl font-extrabold text-cyan-400 mt-1">{stats.prototypesCount}</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-center">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">MVPs</span>
              <p className="text-xl font-extrabold text-rose-400 mt-1">{stats.mvpsCount}</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-center">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Pitches</span>
              <p className="text-xl font-extrabold text-emerald-300 mt-1">{stats.pitchesCount}</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-center">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Evaluated</span>
              <p className="text-xl font-extrabold text-amber-300 mt-1">{stats.evaluationsCount}</p>
            </div>
          </div>

          {/* Recharts Data Visualizations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Chart 1: Students by Branch */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-indigo-400" />
                <span>Student Distribution by Branch</span>
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={branchChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                    <Bar dataKey="students" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Challenge Submission Pipeline */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Rocket className="h-4 w-4 text-violet-400" />
                <span>Innovation Challenge Submission Progress</span>
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={submissionBarData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="stage" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                    <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Export Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-800">
            <button
              onClick={handleExportTeams}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-white"
            >
              <FileSpreadsheet className="h-4 w-4 text-emerald-400" />
              <span>Export Teams CSV</span>
            </button>
            <button
              onClick={handleExportStudents}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-white"
            >
              <FileSpreadsheet className="h-4 w-4 text-indigo-400" />
              <span>Export Students CSV</span>
            </button>
          </div>
        </div>
      )}

      {/* SECTION 27: ADMIN TEAM MANAGEMENT */}
      {activeTab === 'TEAMS' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search team, code or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="ALL">All Branches</option>
                <option value="CSE">CSE</option>
                <option value="AIML">AIML</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
                <option value="Diploma">Diploma</option>
              </select>

              <button
                onClick={handleExportTeams}
                className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white hover:bg-indigo-500"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Code</th>
                    <th className="p-3.5">Team & Startup Name</th>
                    <th className="p-3.5">Leader & Roll</th>
                    <th className="p-3.5">Branch</th>
                    <th className="p-3.5">Size</th>
                    <th className="p-3.5">Payment</th>
                    <th className="p-3.5">Idea</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {filteredTeams.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-800/40">
                      <td className="p-3.5 font-mono text-indigo-400 font-bold">{t.teamCode}</td>
                      <td className="p-3.5">
                        <p className="font-bold text-white">{t.name}</p>
                        <p className="text-[11px] text-slate-400">{t.ideaSubmission?.startupName || 'No idea yet'}</p>
                      </td>
                      <td className="p-3.5">
                        <p className="font-medium text-slate-200">{t.members.find((m: any) => m.isLeader)?.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{t.members.find((m: any) => m.isLeader)?.rollNumber}</p>
                      </td>
                      <td className="p-3.5">
                        <span className="rounded bg-slate-950 px-2 py-1 border border-slate-800 font-mono text-[11px]">
                          {t.members.find((m: any) => m.isLeader)?.branch}
                        </span>
                      </td>
                      <td className="p-3.5 font-semibold text-slate-200">{t.size}</td>
                      <td className="p-3.5">
                        <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                          t.paymentStatus === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {t.paymentStatus}
                        </span>
                      </td>
                      <td className="p-3.5">
                        {t.ideaSubmission ? (
                          <span className="text-emerald-400 font-bold text-[11px]">Submitted ✓</span>
                        ) : (
                          <span className="text-slate-500 text-[11px]">Pending</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* PAYMENTS VERIFICATION */}
      {activeTab === 'PAYMENTS' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-white">Payment Orders & Verification</h2>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Order ID</th>
                    <th className="p-3.5">Team</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Provider</th>
                    <th className="p-3.5">UTR / Txn ID</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/40">
                      <td className="p-3.5 font-mono text-indigo-400 font-bold">{p.orderId}</td>
                      <td className="p-3.5 font-bold text-white">{p.team?.name}</td>
                      <td className="p-3.5 font-bold text-emerald-400">₹{p.amount}</td>
                      <td className="p-3.5 text-slate-400">{p.provider}</td>
                      <td className="p-3.5 font-mono text-slate-300">{p.utr || p.transactionId || 'Pending UTR'}</td>
                      <td className="p-3.5">
                        <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                          p.status === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="p-3.5">
                        {p.status !== 'SUCCESS' ? (
                          <button
                            onClick={() => handleApprovePayment(p.id)}
                            className="rounded bg-emerald-600 px-3 py-1 text-[11px] font-bold text-white hover:bg-emerald-500"
                          >
                            Approve Payment ✓
                          </button>
                        ) : (
                          <span className="text-emerald-400 font-bold text-[11px]">Verified ✓</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 25: LIVE PRESENTATION TIMER */}
      {activeTab === 'TIMER' && (
        <div className="rounded-2xl border border-indigo-500/40 bg-slate-900 p-8 space-y-8 max-w-2xl mx-auto shadow-2xl">
          <div className="text-center space-y-2">
            <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
              Live Pitch Manager (2 Min Pitch + 1 Min Q&A)
            </span>
            <h2 className="text-2xl font-extrabold text-white">Live Presentation Timer</h2>
            <p className="text-xs text-slate-400">Current Pitching Team: <strong className="text-white">{teams[currentQueueIndex]?.name || 'AgriSense AI'}</strong></p>
          </div>

          {/* Big Countdown Timer */}
          <div className="rounded-2xl bg-slate-950 p-8 border border-slate-800 text-center space-y-2">
            <p className="text-6xl font-black font-mono text-indigo-400">
              {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
            </p>
            <p className="text-xs text-slate-400">
              {timerSeconds > 60 ? '⏱️ Presentation Phase (2 Minutes)' : '💬 Rapid Jury Q&A Feedback Phase (1 Minute)'}
            </p>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-bold text-white shadow-lg transition ${
                isTimerRunning ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'
              }`}
            >
              {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{isTimerRunning ? 'Pause Pitch Timer' : 'Start Pitch Timer'}</span>
            </button>

            <button
              onClick={() => {
                setIsTimerRunning(false)
                setTimerSeconds(180)
              }}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-xs font-semibold text-slate-300 hover:text-white"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset 3 Min</span>
            </button>

            <button
              onClick={() => {
                setIsTimerRunning(false)
                setTimerSeconds(180)
                setCurrentQueueIndex((prev) => (prev + 1) % teams.length)
              }}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white hover:bg-indigo-500"
            >
              <span>Next Team →</span>
            </button>
          </div>
        </div>
      )}

      {/* SECTION 28: ANNOUNCEMENTS */}
      {activeTab === 'ANNOUNCEMENTS' && (
        <div className="space-y-6 max-w-xl mx-auto">
          <form onSubmit={handlePublishAnnouncement} className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <h2 className="text-base font-bold text-white">Publish New Announcement</h2>

            {annMsg && <p className="text-xs text-emerald-400 font-bold">{annMsg}</p>}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Title *</label>
              <input
                type="text"
                required
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                placeholder="e.g. Day 3 Lab Allocation Details"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Priority</label>
              <select
                value={annPriority}
                onChange={(e) => setAnnPriority(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
              >
                <option value="NORMAL">NORMAL</option>
                <option value="URGENT">URGENT</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Content *</label>
              <textarea
                required
                rows={3}
                value={annContent}
                onChange={(e) => setAnnContent(e.target.value)}
                placeholder="Details..."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs text-white"
              />
            </div>

            <button type="submit" className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white hover:bg-indigo-500">
              Publish Announcement →
            </button>
          </form>
        </div>
      )}

      {/* SECTION 30: CERTIFICATES */}
      {activeTab === 'CERTIFICATES' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-white">Bulk Certificate Generator</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.slice(0, 6).map((t) => (
              <div key={t.id} className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-indigo-400 font-bold">{t.teamCode}</span>
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                    WINNER
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm">{t.members[0]?.name}</h3>
                <p className="text-xs text-slate-400">Team: {t.name}</p>
                <button
                  onClick={() => {
                    const doc = generateCertificatePDF({
                      studentName: t.members[0]?.name || 'Student',
                      rollNumber: t.members[0]?.rollNumber || '22CS1A0501',
                      teamName: t.name,
                      startupName: t.ideaSubmission?.startupName,
                      awardType: 'WINNER',
                      certCode: `CERT-IW26-${t.teamCode.split('-')[2]}-01`,
                    })
                    doc.save(`Certificate_${t.members[0]?.name}.pdf`)
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2 text-xs font-bold text-white hover:bg-indigo-500"
                >
                  <Award className="h-4 w-4" />
                  <span>Download PDF Certificate</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 35: ADMIN SETTINGS */}
      {activeTab === 'SETTINGS' && (
        <div className="space-y-6 max-w-xl mx-auto rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-bold text-white">Event Configuration Settings</h2>
          
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Registration Fee (₹)</label>
              <input
                type="number"
                value={feeAmount}
                onChange={(e) => setFeeAmount(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Payment Recipient UPI ID</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-medium text-slate-300">Publish Final Results on Leaderboard</span>
              <button
                type="button"
                onClick={() => setResultsPublished(!resultsPublished)}
                className={`rounded-lg px-4 py-2 text-xs font-bold ${
                  resultsPublished ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {resultsPublished ? 'Published ✓' : 'Hidden'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
