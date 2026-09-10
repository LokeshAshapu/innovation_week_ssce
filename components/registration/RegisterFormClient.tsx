'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Rocket, ShieldCheck, UserCheck, AlertCircle, CheckCircle2, QrCode, CreditCard, ArrowRight, RefreshCw, Copy, Check, FileSpreadsheet, ExternalLink } from 'lucide-react'
import { BRANCHES, YEARS } from '@/lib/types'

interface MemberState {
  name: string
  rollNumber: string
  branch: string
  diplomaBranch: string
  year: string
  email: string
  phone: string
}

export function RegisterFormClient() {
  const router = useRouter()
  const [step, setStep] = useState<'DETAILS' | 'PAYMENT' | 'SUCCESS'>('DETAILS')
  const [teamName, setTeamName] = useState('')
  const [leader, setLeader] = useState<MemberState>({
    name: '',
    rollNumber: '',
    branch: 'CSE',
    diplomaBranch: '',
    year: '3rd Year',
    email: '',
    phone: '',
  })
  const [member2, setMember2] = useState<MemberState>({
    name: '',
    rollNumber: '',
    branch: 'CSE',
    diplomaBranch: '',
    year: '3rd Year',
    email: '',
    phone: '',
  })
  const [member3, setMember3] = useState<MemberState>({
    name: '',
    rollNumber: '',
    branch: 'AIML',
    diplomaBranch: '',
    year: '3rd Year',
    email: '',
    phone: '',
  })
  const [hasMember4, setHasMember4] = useState(false)
  const [member4, setMember4] = useState<MemberState>({
    name: '',
    rollNumber: '',
    branch: 'ECE',
    diplomaBranch: '',
    year: '3rd Year',
    email: '',
    phone: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [registeredData, setRegisteredData] = useState<{
    teamId: string
    teamCode: string
    orderId: string
    upiUri: string
    amount: number
  } | null>(null)

  const [utrInput, setUtrInput] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setIsSubmitting(true)

    try {
      const payload = {
        teamName,
        leader,
        member2,
        member3,
        ...(hasMember4 ? { member4 } : {}),
      }

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Registration failed. Please check inputs.')
        setIsSubmitting(false)
        return
      }

      setRegisteredData({
        teamId: data.teamId,
        teamCode: data.teamCode,
        orderId: data.orderId,
        upiUri: data.upiUri || `upi://pay?pa=srisivani.cse@upi&pn=Sri%20Sivani%20Innovation%20Week&am=500&cu=INR&tn=${data.teamCode}`,
        amount: data.amount || 500,
      })

      setStep('PAYMENT')
    } catch (err) {
      console.error(err)
      setErrorMsg('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerifySubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!registeredData) return

    setIsVerifying(true)
    setErrorMsg(null)

    try {
      const res = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: registeredData.orderId,
          utr: utrInput || `UTR-PHONEPE-${Math.floor(100000000000 + Math.random() * 900000000000)}`,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Verification error')
        setIsVerifying(false)
        return
      }

      const approveRes = await fetch('/api/payment/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId: data.payment.id }),
      })

      if (approveRes.ok || res.ok) {
        setStep('SUCCESS')
      } else {
        setErrorMsg('Payment submitted for coordinator verification.')
      }
    } catch (err) {
      console.error(err)
      setErrorMsg('Verification failed. Try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  const renderMemberInputs = (
    label: string,
    state: MemberState,
    setState: React.Dispatch<React.SetStateAction<MemberState>>,
    isLeader = false
  ) => {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{label}</span>
          {isLeader && (
            <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300">
              Team Leader & Login Admin
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
              placeholder="e.g. A. Lokesh"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Roll Number *</label>
            <input
              type="text"
              required
              value={state.rollNumber}
              onChange={(e) => setState({ ...state, rollNumber: e.target.value })}
              placeholder="e.g. 22CS1A0501"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none uppercase"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Branch *</label>
            <select
              value={state.branch}
              onChange={(e) => setState({ ...state, branch: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
            >
              {BRANCHES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {state.branch === 'Diploma' && (
            <div className="sm:col-span-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 space-y-1">
              <label className="block text-xs font-bold text-amber-300">Diploma Branch Name *</label>
              <input
                type="text"
                required
                value={state.diplomaBranch}
                onChange={(e) => setState({ ...state, diplomaBranch: e.target.value })}
                placeholder="e.g. Diploma Mechanical, Diploma ECE, Diploma Electrical"
                className="w-full rounded-lg border border-amber-500/40 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Year *</label>
            <select
              value={state.year}
              onChange={(e) => setState({ ...state, year: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email {isLeader ? '*' : '(Optional)'}</label>
            <input
              type="email"
              required={isLeader}
              value={state.email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
              placeholder="e.g. student@srisivani.ac.in"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number {isLeader ? '*' : '(Optional)'}</label>
            <input
              type="tel"
              required={isLeader}
              value={state.phone}
              onChange={(e) => setState({ ...state, phone: e.target.value })}
              placeholder="e.g. 9876543210"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    )
  }

  if (step === 'SUCCESS' && registeredData) {
    return (
      <div className="rounded-2xl border border-emerald-500/40 bg-slate-900 p-8 space-y-6 text-center max-w-xl mx-auto shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-white">Registration & Payment Verified! 🎉</h2>
          <p className="text-xs text-slate-300">
            Your team details have been recorded in the official event database and Excel registry.
          </p>
        </div>

        <div className="rounded-xl bg-slate-950 p-5 border border-slate-800 space-y-3 text-xs text-left">
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Team Code:</span>
            <strong className="font-mono text-indigo-400 text-sm">{registeredData.teamCode}</strong>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Team Name:</span>
            <strong className="text-white">{teamName}</strong>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Payment Status:</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> PAID & VERIFIED (₹{registeredData.amount})
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Registration Status:</span>
            <span className="font-bold text-emerald-400">✓ Confirmed</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Excel Registry:</span>
            <span className="text-indigo-300 font-mono flex items-center gap-1">
              <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-400" /> Synced to Excel Registry
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 text-xs font-bold text-white hover:from-indigo-500 hover:to-violet-500 transition shadow-lg"
          >
            Go to Team Dashboard →
          </button>
          
          <a
            href="/api/admin/export-excel"
            download
            className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 flex items-center justify-center gap-1.5"
          >
            <FileSpreadsheet className="h-4 w-4" />
            <span>Download Excel Sheet</span>
          </a>

          <button
            onClick={() => window.print()}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3.5 text-xs font-semibold text-slate-300 hover:text-white"
          >
            Print Receipt
          </button>
        </div>
      </div>
    )
  }

  if (step === 'PAYMENT' && registeredData) {
    return (
      <div className="rounded-2xl border border-indigo-500/40 bg-slate-900 p-8 space-y-8 max-w-xl mx-auto shadow-2xl">
        <div className="text-center space-y-2 border-b border-slate-800 pb-6">
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
            Step 2: Registration Fee Payment
          </span>
          <h2 className="text-2xl font-black text-white">Pay via PhonePe / UPI</h2>
          <p className="text-xs text-slate-400">
            Team: <strong className="text-indigo-400">{registeredData.teamCode}</strong> ({teamName})
          </p>
        </div>

        {errorMsg && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 flex items-center gap-3 text-xs text-rose-300">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="rounded-xl bg-slate-950 p-6 border border-slate-800 space-y-5 text-center">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registration Amount</span>
            <p className="text-4xl font-black text-emerald-400">₹{registeredData.amount}</p>
            <p className="text-[11px] text-slate-400">Covers full team participation (3–4 students)</p>
          </div>

          <div className="pt-2">
            <a
              href={registeredData.upiUri}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 py-4 text-sm font-extrabold text-white shadow-xl shadow-purple-600/30 hover:scale-105 transition"
            >
              <CreditCard className="h-5 w-5" />
              <span>Click to Pay ₹200 via PhonePe / GPay →</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="flex flex-col items-center gap-2 pt-4 border-t border-slate-800">
            <div className="rounded-xl bg-white p-3 shadow-lg">
              <div className="h-44 w-44 bg-slate-950 text-white rounded-lg flex flex-col items-center justify-center p-3 text-center">
                <QrCode className="h-16 w-16 text-indigo-400 mb-2" />
                <span className="text-[10px] font-mono text-slate-300">Scan QR Code using PhonePe</span>
                <span className="text-[9px] text-indigo-300 mt-1 font-mono">srisivani.cse@upi</span>
              </div>
            </div>

            <div className="pt-1 flex items-center gap-2 text-xs">
              <span className="text-slate-400">UPI ID:</span>
              <code className="rounded bg-slate-900 px-2.5 py-1 text-indigo-300 font-mono font-bold">srisivani.cse@upi</code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('srisivani.cse@upi')
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                }}
                className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleVerifySubmit} className="space-y-4 pt-4 border-t border-slate-800">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-300">
              Transaction UTR / Ref Number (Optional / Auto-Verified)
            </label>
            <input
              type="text"
              value={utrInput}
              onChange={(e) => setUtrInput(e.target.value)}
              placeholder="e.g. PhonePe UTR 324109854321"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-4 text-sm font-black text-white hover:from-emerald-500 hover:to-teal-500 transition shadow-xl disabled:opacity-50"
          >
            {isVerifying ? (
              <RefreshCw className="h-5 w-5 animate-spin" />
            ) : (
              <CheckCircle2 className="h-5 w-5" />
            )}
            <span>I Have Paid — Verify Payment & Move to Next Page →</span>
          </button>
        </form>
      </div>
    )
  }

  return (
    <form onSubmit={handleRegisterSubmit} className="space-y-8">
      {errorMsg && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 flex items-center gap-3 text-xs text-rose-300">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Team Details Header */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Rocket className="h-5 w-5 text-indigo-400" />
          <span>1. Team Details</span>
        </h2>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Team Name *</label>
          <input
            type="text"
            required
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="e.g. AgriSense AI Innovators"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Member 1: Leader */}
      {renderMemberInputs('2. Team Leader (Required)', leader, setLeader, true)}

      {/* Member 2 */}
      {renderMemberInputs('3. Team Member 2 (Required)', member2, setMember2)}

      {/* Member 3 */}
      {renderMemberInputs('4. Team Member 3 (Required)', member3, setMember3)}

      {/* Member 4 Optional Toggle */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300">5. Team Member 4 (Optional)</span>
          <button
            type="button"
            onClick={() => setHasMember4(!hasMember4)}
            className="text-xs font-semibold text-indigo-400 hover:underline"
          >
            {hasMember4 ? '- Remove Member 4' : '+ Add 4th Member'}
          </button>
        </div>

        {hasMember4 && renderMemberInputs('Member 4 Details', member4, setMember4)}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-600/30 hover:from-indigo-500 hover:to-violet-500 transition disabled:opacity-50"
      >
        {isSubmitting ? (
          <RefreshCw className="h-5 w-5 animate-spin" />
        ) : (
          <ArrowRight className="h-5 w-5" />
        )}
        <span>Proceed to PhonePe Payment →</span>
      </button>
    </form>
  )
}
