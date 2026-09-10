'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Cpu, CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react'

export function PrototypeSubmissionClient({ teamId, existingSubmission }: { teamId: string; existingSubmission: any }) {
  const router = useRouter()
  const [type, setType] = useState(existingSubmission?.type || 'Software application')
  const [description, setDescription] = useState(existingSubmission?.description || '')
  const [techStack, setTechStack] = useState(existingSubmission?.techStack || 'React, Next.js, Python, Node.js')
  const [githubUrl, setGithubUrl] = useState(existingSubmission?.githubUrl || '')
  const [demoUrl, setDemoUrl] = useState(existingSubmission?.demoUrl || '')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const prototypeOptions = [
    'Software application',
    'Website / Web App',
    'Mobile application',
    'AI/ML solution',
    'IoT prototype',
    'Hardware model',
    'UI/UX clickable prototype',
    'Business process model',
    'Product mock-up',
    'Proof of concept',
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg(null)
    setSuccessMsg(null)

    try {
      const res = await fetch('/api/submissions/prototype', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamId,
          type,
          description,
          techStack,
          githubUrl,
          demoUrl,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setSuccessMsg('Prototype submitted successfully! Status: Submitted ✓')
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
          <label className="block text-xs font-medium text-slate-300 mb-1">Prototype Category / Option *</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
          >
            {prototypeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Prototype Description & Working Proof *</label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what features are functional in your working prototype..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Technologies & Tools Used *</label>
          <input
            type="text"
            required
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="e.g. Next.js, Python, OpenCV, Arduino, Tailwind CSS"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">GitHub / Code Repository URL</label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/org/repo"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Live Demo / Deployed Link</label>
            <input
              type="url"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              placeholder="https://my-prototype-demo.vercel.app"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 text-xs font-bold text-white hover:bg-violet-500 transition disabled:opacity-50"
        >
          {isSubmitting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
          <span>Submit Prototype Details →</span>
        </button>
      </div>
    </form>
  )
}
