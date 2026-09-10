'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Rocket, ShieldCheck, UserCheck, AlertCircle, CheckCircle2, QrCode, CreditCard, ArrowRight, RefreshCw, Copy, Check, FileSpreadsheet, ExternalLink, Banknote, Upload, Image as ImageIcon, Mail } from 'lucide-react'
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
  const [step, setStep] = useState<'DETAILS' | 'SUCCESS'>('DETAILS')
  const [teamName, setTeamName] = useState('')
  
  // Required Members (Leader + 2 Members = 3 Students)
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

  // Optional 4th Member (Team size 3 to 4 max)
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

  // Payment Options
  const [paymentMethod, setPaymentMethod] = useState<'PHONEPE' | 'CASH'>('PHONEPE')
  const [utrInput, setUtrInput] = useState('')
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [registeredData, setRegisteredData] = useState<{
    teamId: string
    teamCode: string
    orderId: string
    amount: number
    paymentMethod: 'CASH' | 'PHONEPE'
  } | null>(null)

  const [copied, setCopied] = useState(false)

  // Handle Image File Upload for Payment Screenshot
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('Image size must be under 5MB.')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setReceiptPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (paymentMethod === 'PHONEPE') {
      if (!utrInput || utrInput.trim().length < 4) {
        setErrorMsg('Please enter your PhonePe Transaction UTR / Ref Number.')
        return
      }
      if (!receiptPreview) {
        setErrorMsg('Please upload a screenshot or image of your PhonePe payment.')
        return
      }
    }

    setIsSubmitting(true)

    try {
      const payload = {
        teamName,
        leader,
        member2,
        member3,
        ...(hasMember4 ? { member4 } : {}),
        paymentMethod,
        utr: paymentMethod === 'PHONEPE' ? utrInput.trim() : undefined,
        receiptUrl: paymentMethod === 'PHONEPE' ? receiptPreview : undefined,
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
        amount: data.amount || 200,
        paymentMethod: data.paymentMethod || paymentMethod,
      })

      setStep('SUCCESS')
    } catch (err) {
      console.error(err)
      setErrorMsg('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
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
              Team Leader & Primary Contact
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
            <label className="block text-xs font-medium text-slate-300 mb-1">Email (Receives Confirmation Mail) *</label>
            <input
              type="email"
              required
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
              placeholder="e.g. 6301451462"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    )
  }

  if (step === 'SUCCESS' && registeredData) {
    const isCash = registeredData.paymentMethod === 'CASH'
    return (
      <div className="rounded-2xl border border-indigo-500/40 bg-slate-900 p-8 space-y-6 text-center max-w-xl mx-auto shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-white">Team Registration Submitted! 🎉</h2>
          <p className="text-xs text-slate-300">
            A confirmation email has been dispatched from <strong className="text-indigo-400">lokeshashapu@gmail.com</strong> to your team emails!
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
            <span className="text-slate-400">Payment Option:</span>
            <span className={`font-bold ${isCash ? 'text-amber-400' : 'text-emerald-400'}`}>
              {isCash ? '💵 Cash Payment Option' : '📱 PhonePe / UPI'}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Status:</span>
            <span className={`font-bold ${isCash ? 'text-amber-400' : 'text-emerald-400'}`}>
              {isCash ? 'Spot Reserved (Pay Cash to Confirm)' : '✓ Verified & Confirmed'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Confirmation Mail:</span>
            <span className="text-indigo-300 font-mono flex items-center gap-1">
              <Mail className="h-3.5 w-3.5 text-indigo-400" /> Sent from lokeshashapu@gmail.com
            </span>
          </div>
        </div>

        {isCash && (
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-xs text-amber-200 text-left space-y-1">
            <strong className="font-bold flex items-center gap-1.5 text-amber-300">
              <Banknote className="h-4 w-4" /> To Confirm Your Spot:
            </strong>
            <p>
              Please pay <strong>₹{registeredData.amount} cash</strong> to the Student Coordinators.
            </p>
          </div>
        )}

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
            <span>Excel Registry</span>
          </a>
        </div>
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

      {/* PAYMENT METHOD SELECTION (CASH OR PHONEPE) */}
      <div className="rounded-xl border border-indigo-500/40 bg-slate-900 p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-indigo-400" />
              <span>6. Registration Fee Payment Option</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Registration Fee: ₹200 per team (3–4 students)</p>
          </div>

          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
            ₹200 / Team
          </span>
        </div>

        {/* Radio Option Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setPaymentMethod('PHONEPE')}
            className={`rounded-xl border p-4 text-left transition flex items-center gap-3 ${
              paymentMethod === 'PHONEPE'
                ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10'
                : 'border-slate-800 bg-slate-950 hover:border-slate-700'
            }`}
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${paymentMethod === 'PHONEPE' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'}`}>
              <QrCode className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">PhonePe / UPI</p>
              <p className="text-[11px] text-slate-400">Scan QR Code, enter UTR & upload image</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('CASH')}
            className={`rounded-xl border p-4 text-left transition flex items-center gap-3 ${
              paymentMethod === 'CASH'
                ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                : 'border-slate-800 bg-slate-950 hover:border-slate-700'
            }`}
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${paymentMethod === 'CASH' ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-400'}`}>
              <Banknote className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Pay Cash</p>
              <p className="text-[11px] text-slate-400">Pay cash at CSE Department desk to confirm</p>
            </div>
          </button>
        </div>

        {/* CASH OPTION INSTRUCTIONS */}
        {paymentMethod === 'CASH' && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 space-y-2 text-xs text-amber-200">
            <h3 className="font-bold text-amber-300 flex items-center gap-2 text-sm">
              <Banknote className="h-4 w-4" /> Cash Payment Spot Reservation
            </h3>
            <p className="leading-relaxed">
              Upon clicking proceed below, your team spot will be reserved. To confirm your spot, please pay <strong>₹200 cash</strong> to the Student Coordinators.
            </p>
            <p className="text-[11px] text-amber-400 font-mono pt-1">
              ✉️ An official confirmation mail will be automatically sent from <strong>lokeshashapu@gmail.com</strong> to all team member emails.
            </p>
          </div>
        )}

        {/* PHONEPE OPTION INSTRUCTIONS & INPUTS */}
        {paymentMethod === 'PHONEPE' && (
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-6">
              <div className="space-y-2 text-center sm:text-left">
                <span className="rounded bg-indigo-500/20 px-2.5 py-1 text-xs font-mono font-bold text-indigo-300">
                  PhonePe Mobile: 6301451462
                </span>
                <h3 className="text-lg font-bold text-white">Scan QR Code or Use Mobile Number</h3>
                <p className="text-xs text-slate-400">
                  UPI ID: <code className="text-indigo-400 font-mono font-bold">srisivani.cse@upi</code>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText('srisivani.cse@upi')
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                  }}
                  className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:underline"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'UPI ID Copied!' : 'Copy UPI ID'}</span>
                </button>
              </div>

              {/* QR Code Graphic */}
              <div className="rounded-xl bg-white p-3 shadow-xl shrink-0">
                <div className="h-36 w-36 bg-slate-950 text-white rounded-lg flex flex-col items-center justify-center p-2 text-center">
                  <QrCode className="h-14 w-14 text-indigo-400 mb-1" />
                  <span className="text-[9px] font-mono text-slate-300">Scan PhonePe QR</span>
                  <span className="text-[8px] text-indigo-300 font-mono">₹200 / Team</span>
                </div>
              </div>
            </div>

            {/* Inputs: Transaction ID & Image Upload */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Transaction UTR / Ref Number *
                </label>
                <input
                  type="text"
                  required={paymentMethod === 'PHONEPE'}
                  value={utrInput}
                  onChange={(e) => setUtrInput(e.target.value)}
                  placeholder="e.g. PhonePe UTR 324109854321"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Upload Payment Screenshot / Image *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-300 file:mr-3 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
                />
              </div>
            </div>

            {receiptPreview && (
              <div className="rounded-lg border border-indigo-500/30 bg-slate-900 p-3 space-y-2">
                <span className="text-xs font-bold text-indigo-400 flex items-center gap-1">
                  <ImageIcon className="h-4 w-4" /> Screenshot Image Preview:
                </span>
                <img src={receiptPreview} alt="Payment Receipt" className="max-h-40 rounded-lg border border-slate-800 mx-auto object-contain" />
              </div>
            )}
          </div>
        )}
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
        <span>
          {paymentMethod === 'CASH'
            ? 'Reserve Spot & Dispatch Confirmation Emails →'
            : 'Submit Registration & Send Confirmation Mails →'}
        </span>
      </button>
    </form>
  )
}
