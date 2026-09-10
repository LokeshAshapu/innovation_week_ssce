'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Target, CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react'

export function PitchSubmissionClient({ teamId, existingSubmission }: { teamId: string; existingSubmission: any }) {
  const router = useRouter()
  const [startupName, setStartupName] = useState(existingSubmission?.startupName || '')
  const [problem, setProblem] = useState(existingSubmission?.problem || '')
  const [solution, setSolution] = useState(existingSubmission?.solution || '')
  const [targetCustomer, setTargetCustomer] = useState(existingSubmission?.targetCustomer || '')
  const [marketOpportunity, setMarketOpportunity] = useState(existingSubmission?.marketOpportunity || '')
  const [competitors, setCompetitors] = useState(existingSubmission?.competitors || '')
  const [usp, setUsp] = useState(existingSubmission?.usp || '')
  const [revenueModel, setRevenueModel] = useState(existingSubmission?.revenueModel || '')
  const [futureScope, setFutureScope] = useState(existingSubmission?.futureScope || '')
  const [impact, setImpact] = useState(existingSubmission?.impact || '')
  const [pitchDeckUrl, setPitchDeckUrl] = useState(existingSubmission?.pitchDeckUrl || '')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg(null)
    setSuccessMsg(null)

    try {
      const res = await fetch('/api/submissions/pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamId,
          startupName,
          problem,
          solution,
          targetCustomer,
          marketOpportunity,
          competitors,
          usp,
          revenueModel,
          futureScope,
          impact,
          pitchDeckUrl,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setSuccessMsg('11-Point Pitch Deck submitted! Your team is ready for Grand Finale. Status: Submitted ✓')
        setTimeout(() => router.push('/dashboard'), 1500)
      } else {
        setErrorMsg(data.error || 'Submission failed')
      }
    } catch (err) {
      console.error(err)
      setErrorMsg('Network error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {successMsg && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 flex items-center gap-3 text-xs text-emerald-300">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 flex items-center gap-3 text-xs text-rose-300">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4">
        
        {/* 1. Startup Name */}
        <div>
          <label className="block text-xs font-bold text-indigo-400 mb-1">1. Startup Name & Brand *</label>
          <input
            type="text"
            required
            value={startupName}
            onChange={(e) => setStartupName(e.target.value)}
            placeholder="e.g. AgriSense AI Solutions"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* 2. Problem Statement */}
        <div>
          <label className="block text-xs font-bold text-indigo-400 mb-1">2. Problem Statement *</label>
          <textarea
            required
            rows={2}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Specific pain point addressed..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* 3. Solution */}
        <div>
          <label className="block text-xs font-bold text-indigo-400 mb-1">3. Proposed Solution *</label>
          <textarea
            required
            rows={2}
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            placeholder="Product / technology approach..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* 4 & 5. Target & Market */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-indigo-400 mb-1">4. Target Customer *</label>
            <input
              type="text"
              required
              value={targetCustomer}
              onChange={(e) => setTargetCustomer(e.target.value)}
              placeholder="e.g. Farmers, SMEs in AP"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-indigo-400 mb-1">6. Market Opportunity (TAM/SAM) *</label>
            <input
              type="text"
              required
              value={marketOpportunity}
              onChange={(e) => setMarketOpportunity(e.target.value)}
              placeholder="e.g. Estimated TAM ₹50 Cr"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* 7 & 8. Competitors & USP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-indigo-400 mb-1">7. Competitor Analysis *</label>
            <input
              type="text"
              required
              value={competitors}
              onChange={(e) => setCompetitors(e.target.value)}
              placeholder="Existing alternatives & gaps"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-indigo-400 mb-1">8. Unique Selling Proposition (USP) *</label>
            <input
              type="text"
              required
              value={usp}
              onChange={(e) => setUsp(e.target.value)}
              placeholder="Core competitive moat"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* 9 & 10. Revenue & Future */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-indigo-400 mb-1">9. Revenue Model *</label>
            <input
              type="text"
              required
              value={revenueModel}
              onChange={(e) => setRevenueModel(e.target.value)}
              placeholder="e.g. Monthly SaaS / Commission"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-indigo-400 mb-1">10. Future Scope & Roadmap *</label>
            <input
              type="text"
              required
              value={futureScope}
              onChange={(e) => setFutureScope(e.target.value)}
              placeholder="Next 12-month expansion plan"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* 11. Impact */}
        <div>
          <label className="block text-xs font-bold text-indigo-400 mb-1">11. Social / Economic Impact *</label>
          <input
            type="text"
            required
            value={impact}
            onChange={(e) => setImpact(e.target.value)}
            placeholder="Employment generation & community benefit..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Pitch Deck File Link */}
        <div>
          <label className="block text-xs font-bold text-indigo-400 mb-1">Final Pitch Deck PDF / Slide Deck Link</label>
          <input
            type="text"
            value={pitchDeckUrl}
            onChange={(e) => setPitchDeckUrl(e.target.value)}
            placeholder="/docs/pitch_deck.pdf or https://drive.google.com/..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-500 transition disabled:opacity-50"
        >
          {isSubmitting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
          <span>Submit 11-Point Business Pitch Deck →</span>
        </button>
      </div>
    </form>
  )
}
