'use client'

import { useState } from 'react'
import { Award, CheckCircle2, ShieldCheck, Scale, RefreshCw, ChevronRight, FileText, ExternalLink, Star } from 'lucide-react'

export function EvaluatorPortalClient({ teams, evaluatorName }: { teams: any[]; evaluatorName: string }) {
  const [selectedTeamId, setSelectedTeamId] = useState<string>(teams[0]?.id || '')
  
  // 7 Weighted Criteria scores
  const [scoreInnovation, setScoreInnovation] = useState<number>(18) // Max 20
  const [scoreProblem, setScoreProblem] = useState<number>(14) // Max 15
  const [scoreTechnical, setScoreTechnical] = useState<number>(13) // Max 15
  const [scoreMVP, setScoreMVP] = useState<number>(18) // Max 20
  const [scoreMarket, setScoreMarket] = useState<number>(13) // Max 15
  const [scoreTeamwork, setScoreTeamwork] = useState<number>(9) // Max 10
  const [scoreImpact, setScoreImpact] = useState<number>(4.5) // Max 5

  const [feedback, setFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const selectedTeam = teams.find((t) => t.id === selectedTeamId) || teams[0]

  const totalScore =
    Number(scoreInnovation) +
    Number(scoreProblem) +
    Number(scoreTechnical) +
    Number(scoreMVP) +
    Number(scoreMarket) +
    Number(scoreTeamwork) +
    Number(scoreImpact)

  const handleSubmitScore = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccessMsg(null)

    try {
      const res = await fetch('/api/evaluations/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamId: selectedTeamId,
          scoreInnovation,
          scoreProblem,
          scoreTechnical,
          scoreMVP,
          scoreMarket,
          scoreTeamwork,
          scoreImpact,
          feedback,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setSuccessMsg(`Evaluation recorded! Total score: ${data.totalScore}/100`)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Left: Teams Sidebar List */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Assigned Teams ({teams.length})</h2>
        <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto pr-1">
          {teams.map((t) => {
            const isSelected = t.id === selectedTeamId
            const isEvaluated = t.evaluations.length > 0
            return (
              <button
                key={t.id}
                onClick={() => {
                  setSelectedTeamId(t.id)
                  setSuccessMsg(null)
                }}
                className={`p-4 rounded-xl border text-left transition flex items-center justify-between ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-950/40 text-white shadow-lg'
                    : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-indigo-400 font-bold">{t.teamCode}</span>
                    {isEvaluated && (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        Evaluated ✓
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-white text-sm mt-0.5">{t.ideaSubmission?.startupName || t.name}</h3>
                  <p className="text-[11px] text-slate-400">{t.name} ({t.size} members)</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-500 shrink-0" />
              </button>
            )
          })}
        </div>
      </div>

      {/* Right: Active Scoring Card */}
      {selectedTeam && (
        <div className="lg:col-span-2 space-y-6">
          
          {/* Team Overview Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-indigo-400 font-bold">{selectedTeam.teamCode}</span>
                <h2 className="text-xl font-extrabold text-white">
                  {selectedTeam.ideaSubmission?.startupName || selectedTeam.name}
                </h2>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Calculated Score</span>
                <p className="text-2xl font-black text-amber-400">{Math.round(totalScore * 10) / 10} <span className="text-xs text-slate-400 font-normal">/ 100</span></p>
              </div>
            </div>

            {/* Submissions Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
              <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
                <span className="text-[10px] text-slate-400">Day 2 Idea:</span>
                <p className="font-semibold text-slate-200 truncate">{selectedTeam.ideaSubmission?.domain || 'Submitted'}</p>
              </div>
              <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
                <span className="text-[10px] text-slate-400">Day 3 Prototype:</span>
                <p className="font-semibold text-indigo-300 truncate">{selectedTeam.prototypeSubmission?.type || 'Working Model'}</p>
              </div>
              <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
                <span className="text-[10px] text-slate-400">Day 4 Pitch Deck:</span>
                <p className="font-semibold text-emerald-300 truncate">{selectedTeam.pitchSubmission?.startupName ? '11 Points Deck ✓' : 'Ready'}</p>
              </div>
            </div>

            <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
              <strong className="text-indigo-400">Problem & Solution Overview:</strong>
              <p className="text-slate-400 leading-relaxed">{selectedTeam.ideaSubmission?.problemStatement}</p>
            </div>
          </div>

          {/* Interactive Scoring Form */}
          <form onSubmit={handleSubmitScore} className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">7-Criteria Jury Scoring Card</h3>
              </div>
              <span className="text-xs text-slate-400">Evaluator: <strong>{evaluatorName}</strong></span>
            </div>

            {successMsg && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 flex items-center gap-3 text-xs text-emerald-300">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <div className="space-y-4 text-xs">
              
              {/* Criterion 1 */}
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-white">1. Innovation & Originality (20% Weight)</span>
                  <span className="text-amber-400 font-bold">{scoreInnovation} / 20 Pts</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={20}
                  step={0.5}
                  value={scoreInnovation}
                  onChange={(e) => setScoreInnovation(parseFloat(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>

              {/* Criterion 2 */}
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-white">2. Problem Identification & Relevance (15% Weight)</span>
                  <span className="text-amber-400 font-bold">{scoreProblem} / 15 Pts</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={15}
                  step={0.5}
                  value={scoreProblem}
                  onChange={(e) => setScoreProblem(parseFloat(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>

              {/* Criterion 3 */}
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-white">3. Technical Feasibility (15% Weight)</span>
                  <span className="text-amber-400 font-bold">{scoreTechnical} / 15 Pts</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={15}
                  step={0.5}
                  value={scoreTechnical}
                  onChange={(e) => setScoreTechnical(parseFloat(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>

              {/* Criterion 4 */}
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-white">4. Prototype / MVP Quality (20% Weight)</span>
                  <span className="text-amber-400 font-bold">{scoreMVP} / 20 Pts</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={20}
                  step={0.5}
                  value={scoreMVP}
                  onChange={(e) => setScoreMVP(parseFloat(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>

              {/* Criterion 5 */}
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-white">5. Market Potential & Business Model (15% Weight)</span>
                  <span className="text-amber-400 font-bold">{scoreMarket} / 15 Pts</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={15}
                  step={0.5}
                  value={scoreMarket}
                  onChange={(e) => setScoreMarket(parseFloat(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>

              {/* Criterion 6 */}
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-white">6. Presentation & Teamwork (10% Weight)</span>
                  <span className="text-amber-400 font-bold">{scoreTeamwork} / 10 Pts</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={0.5}
                  value={scoreTeamwork}
                  onChange={(e) => setScoreTeamwork(parseFloat(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>

              {/* Criterion 7 */}
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-white">7. Social / Economic Impact (5% Weight)</span>
                  <span className="text-amber-400 font-bold">{scoreImpact} / 5 Pts</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={5}
                  step={0.5}
                  value={scoreImpact}
                  onChange={(e) => setScoreImpact(parseFloat(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>

            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Jury Remarks & Feedback</label>
              <textarea
                rows={2}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter rapid feedback, strengths and improvement suggestions..."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-xs font-bold text-slate-950 hover:bg-amber-400 transition disabled:opacity-50"
            >
              {isSubmitting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Award className="h-4 w-4" />}
              <span>Save & Submit Jury Evaluation ({Math.round(totalScore * 10) / 10} / 100 Pts) →</span>
            </button>
          </form>

        </div>
      )}

    </div>
  )
}
