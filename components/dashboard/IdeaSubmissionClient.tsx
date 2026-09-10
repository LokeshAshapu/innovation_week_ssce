'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lightbulb, CheckCircle2, RefreshCw, AlertCircle, Upload, Link as LinkIcon } from 'lucide-react'

export function IdeaSubmissionClient({ teamId, existingSubmission }: { teamId: string; existingSubmission: any }) {
  const router = useRouter()
  const [startupName, setStartupName] = useState(existingSubmission?.startupName || '')
  const [problemStatement, setProblemStatement] = useState(existingSubmission?.problemStatement || '')
  const [proposedSolution, setProposedSolution] = useState(existingSubmission?.proposedSolution || '')
  const [targetUsers, setTargetUsers] = useState(existingSubmission?.targetUsers || '')
  const [usp, setUsp] = useState(existingSubmission?.usp || '')
  const [businessPotential, setBusinessPotential] = useState(existingSubmission?.businessPotential || '')
  const [impact, setImpact] = useState(existingSubmission?.impact || '')
  const [domain, setDomain] = useState(existingSubmission?.domain || 'AI & Smart Systems')
  const [techStack, setTechStack] = useState(existingSubmission?.techStack || '')
  const [pptUrl, setPptUrl] = useState(existingSubmission?.pptUrl || '')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg(null)
    setSuccessMsg(null)

    try {
      const res = await fetch('/api/submissions/idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamId,
          startupName,
          problemStatement,
          proposedSolution,
          targetUsers,
          usp,
          businessPotential,
          impact,
          domain,
          techStack,
          pptUrl,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setSuccessMsg('Startup Idea submitted successfully! Status: Submitted ✓')
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Startup Venture Name *</label>
            <input
              type="text"
              required
              value={startupName}
              onChange={(e) => setStartupName(e.target.value)}
              placeholder="e.g. AgriSense AI"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Problem Domain *</label>
            <input
              type="text"
              required
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="e.g. AI & Smart Agriculture, HealthTech, EV"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Problem Statement *</label>
          <textarea
            required
            rows={3}
            value={problemStatement}
            onChange={(e) => setProblemStatement(e.target.value)}
            placeholder="Clearly describe the real-world problem, target pain point and current inefficiency..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Proposed Solution *</label>
          <textarea
            required
            rows={3}
            value={proposedSolution}
            onChange={(e) => setProposedSolution(e.target.value)}
            placeholder="Explain how your solution works, core features and methodology..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Target Users / Customers *</label>
            <input
              type="text"
              required
              value={targetUsers}
              onChange={(e) => setTargetUsers(e.target.value)}
              placeholder="e.g. Small farmers, local businesses, students"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Unique Selling Proposition (USP) *</label>
            <input
              type="text"
              required
              value={usp}
              onChange={(e) => setUsp(e.target.value)}
              placeholder="What makes your solution unique vs competitors?"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Business Potential & Revenue Model *</label>
            <input
              type="text"
              required
              value={businessPotential}
              onChange={(e) => setBusinessPotential(e.target.value)}
              placeholder="e.g. SaaS subscription fee, hardware sales"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Social / Economic Impact *</label>
            <input
              type="text"
              required
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
              placeholder="Expected positive outcome for community..."
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Pitch Deck PPT / Drive Link</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={pptUrl}
              onChange={(e) => setPptUrl(e.target.value)}
              placeholder="https://drive.google.com/... or /docs/presentation.pdf"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white hover:bg-indigo-500 transition disabled:opacity-50"
        >
          {isSubmitting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
          <span>Submit Startup Idea →</span>
        </button>
      </div>
    </form>
  )
}
