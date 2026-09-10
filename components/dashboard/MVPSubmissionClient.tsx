'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Rocket, CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react'

export function MVPSubmissionClient({ teamId, existingSubmission }: { teamId: string; existingSubmission: any }) {
  const router = useRouter()
  const [description, setDescription] = useState(existingSubmission?.description || '')
  const [features, setFeatures] = useState(existingSubmission?.features || '')
  const [currentUsers, setCurrentUsers] = useState(existingSubmission?.currentUsers || '15 pilot users during Day 4 sprint')
  const [validationResults, setValidationResults] = useState(existingSubmission?.validationResults || '')
  const [improvements, setImprovements] = useState(existingSubmission?.improvements || '')
  const [demoUrl, setDemoUrl] = useState(existingSubmission?.demoUrl || '')
  const [repoUrl, setRepoUrl] = useState(existingSubmission?.repoUrl || '')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg(null)
    setSuccessMsg(null)

    try {
      const res = await fetch('/api/submissions/mvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamId,
          description,
          features,
          currentUsers,
          validationResults,
          improvements,
          demoUrl,
          repoUrl,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setSuccessMsg('MVP details submitted successfully! Status: Submitted ✓')
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
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">MVP Release Description *</label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief summary of your minimum viable product release candidate..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Core MVP Features Implemented *</label>
          <textarea
            required
            rows={3}
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            placeholder="List key functional features available for user testing..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Product Validation & User Feedback *</label>
          <textarea
            required
            rows={3}
            value={validationResults}
            onChange={(e) => setValidationResults(e.target.value)}
            placeholder="Summarize results from pilot users or peer testing feedback..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Current Users / Testers Count</label>
            <input
              type="text"
              value={currentUsers}
              onChange={(e) => setCurrentUsers(e.target.value)}
              placeholder="e.g. 15 pilot users"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Improvements Made Based on Feedback</label>
            <input
              type="text"
              value={improvements}
              onChange={(e) => setImprovements(e.target.value)}
              placeholder="e.g. Added Telugu language support"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Live MVP Demo URL</label>
            <input
              type="url"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              placeholder="https://mvp-demo.vercel.app"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Code Repository URL</label>
            <input
              type="url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/org/mvp-repo"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-600 py-3 text-xs font-bold text-white hover:bg-amber-500 transition disabled:opacity-50"
        >
          {isSubmitting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
          <span>Submit MVP Release Candidate →</span>
        </button>
      </div>
    </form>
  )
}
