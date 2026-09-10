import { Award, CheckCircle2, ShieldCheck, Scale } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function EvaluationPage() {
  const criteria = [
    { title: 'Innovation & Originality', weight: '20%', maxScore: 20, desc: 'Novelty of the solution, uniqueness of approach, and differentiation from existing marketplace alternatives.' },
    { title: 'Problem Identification & Relevance', weight: '15%', maxScore: 15, desc: 'Clarity of the target pain point, depth of user understanding, and local/national relevance.' },
    { title: 'Technical Feasibility', weight: '15%', maxScore: 15, desc: 'Soundness of technical architecture, feasibility of execution, stack selection, and realistic scalability.' },
    { title: 'Prototype / MVP Quality', weight: '20%', maxScore: 20, desc: 'Completeness of working demonstration, code/hardware quality, user experience, and feature execution.' },
    { title: 'Market Potential & Business Model', weight: '15%', maxScore: 15, desc: 'Viability of revenue streams, unit economics, customer acquisition strategy, and market size.' },
    { title: 'Presentation & Teamwork', weight: '10%', maxScore: 10, desc: 'Clarity of 3-minute pitch, confidence, adherence to time limit, handling jury Q&A, and team cohesion.' },
    { title: 'Social/Economic Impact', weight: '5%', maxScore: 5, desc: 'Contribution towards employment generation, regional development, sustainability, or social good.' },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="rounded-full bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
            Jury Evaluation System
          </span>
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            Evaluation Criteria & Rubric
          </h1>
          <p className="text-sm text-slate-400 font-medium">
            All registered teams are evaluated by jury members using the following 7 weighted criteria totaling 100%.
          </p>
        </div>

        {/* Weighted Score Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
          <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-indigo-400" />
              <h2 className="text-base font-bold text-white">Weighted Evaluation Framework</h2>
            </div>
            <span className="rounded-md bg-indigo-500/20 px-2.5 py-1 text-xs font-bold text-indigo-300">Total: 100% (100 Points)</span>
          </div>

          <div className="divide-y divide-slate-800">
            {criteria.map((c, i) => (
              <div key={c.title} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-800/40 transition">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-indigo-400">0{i + 1}.</span>
                    <h3 className="font-bold text-white text-base">{c.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Weightage</span>
                    <p className="text-lg font-extrabold text-indigo-400">{c.weight}</p>
                  </div>
                  <div className="rounded-xl bg-slate-950 px-4 py-2 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400">Max Points</span>
                    <p className="text-sm font-bold text-white">{c.maxScore} Pts</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lock note */}
        <div className="rounded-xl border border-amber-500/30 bg-slate-900/60 p-6 flex items-start gap-4 text-xs text-slate-300">
          <ShieldCheck className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-white text-sm">Evaluation Locking Policy</h4>
            <p className="mt-1 leading-relaxed text-slate-400">
              Evaluators enter scores directly on their jury portal during live pitch sessions. Once submitted, scores are locked server-side and cannot be modified unless unlocked by the administrator. Total weighted scores are calculated automatically out of 100 points.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
