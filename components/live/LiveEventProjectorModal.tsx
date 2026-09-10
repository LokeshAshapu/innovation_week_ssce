'use client'

import { useState, useEffect } from 'react'
import { Tv, Play, Pause, RotateCcw, X, Clock, Users, Rocket } from 'lucide-react'

export function LiveEventProjectorModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [secondsLeft, setSecondsLeft] = useState(84) // 01:24
  const [isRunning, setIsRunning] = useState(false)
  const [teamIdx, setTeamIdx] = useState(0)

  const liveTeams = [
    { teamName: 'AgriSense AI Innovators', startupName: 'AgriSense AI', code: 'IW-2026-1001', stage: 'DAY 3 PROTOTYPE DEVELOPMENT' },
    { teamName: 'NeuroHealth Bot', startupName: 'NeuroCare Diagnostics', code: 'IW-2026-1002', stage: 'DAY 3 PROTOTYPE DEVELOPMENT' },
    { teamName: 'EcoGrid Tech', startupName: 'EcoGrid Smart Energy', code: 'IW-2026-1003', stage: 'DAY 3 PROTOTYPE DEVELOPMENT' },
    { teamName: 'PolyCraft Diploma Innovators', startupName: 'PolyCraft Auto-Welder', code: 'IW-2026-1004', stage: 'DAY 3 PROTOTYPE DEVELOPMENT' },
  ]

  const current = liveTeams[teamIdx]
  const next = liveTeams[(teamIdx + 1) % liveTeams.length]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1)
      }, 1000)
    } else if (secondsLeft === 0) {
      setIsRunning(false)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, secondsLeft])

  if (!isOpen) return null

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 p-6 backdrop-blur-2xl">
      <div className="w-full max-w-5xl rounded-3xl border border-indigo-500/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-8 shadow-2xl space-y-8 relative overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/40">
              <Tv className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-wider text-white">INNOVATION WEEK 2026</h2>
              <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-xs font-bold text-indigo-300">
                PROJECTOR STAGE MODE
              </span>
            </div>
          </div>

          <button onClick={onClose} className="rounded-xl border border-slate-800 p-2 text-slate-400 hover:bg-slate-800 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Big Stage Banner */}
        <div className="text-center space-y-2">
          <span className="rounded-full bg-amber-500/20 px-4 py-1.5 text-xs font-extrabold text-amber-300 border border-amber-500/40 tracking-widest uppercase">
            {current.stage}
          </span>
          <h1 className="text-4xl font-black text-white sm:text-6xl tracking-tight pt-2">{current.startupName}</h1>
          <p className="text-sm font-bold text-slate-300">{current.teamName} ({current.code})</p>
        </div>

        {/* Big Projector Digital Clock Display */}
        <div className="rounded-3xl bg-slate-950 p-8 border-2 border-indigo-500/30 text-center space-y-2 shadow-2xl">
          <span className="text-xs font-extrabold uppercase text-slate-400 tracking-widest">PITCH COUNTDOWN</span>
          <p className="text-7xl font-black font-mono text-cyan-400 sm:text-8xl tracking-widest drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            {formatTime(secondsLeft)}
          </p>
        </div>

        {/* Next Team Banner */}
        <div className="rounded-2xl bg-slate-900/80 p-4 border border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-semibold uppercase tracking-wider">UP NEXT ON STAGE:</span>
          <div className="text-right">
            <strong className="text-white font-extrabold text-sm">{next.startupName}</strong>
            <span className="text-slate-400 ml-2">({next.teamName})</span>
          </div>
        </div>

        {/* Live Controls */}
        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-2 rounded-2xl px-8 py-3.5 text-xs font-bold text-white shadow-xl transition ${
              isRunning ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'
            }`}
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{isRunning ? 'Pause Timer' : 'Start Pitch Timer'}</span>
          </button>

          <button
            onClick={() => {
              setIsRunning(false)
              setSecondsLeft(180)
            }}
            className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3.5 text-xs font-semibold text-slate-300 hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset 3 Min</span>
          </button>

          <button
            onClick={() => {
              setIsRunning(false)
              setSecondsLeft(180)
              setTeamIdx((prev) => (prev + 1) % liveTeams.length)
            }}
            className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3.5 text-xs font-bold text-white hover:bg-indigo-500"
          >
            <span>Next Team →</span>
          </button>
        </div>

      </div>
    </div>
  )
}
