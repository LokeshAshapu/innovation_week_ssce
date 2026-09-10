'use client'

import { useState } from 'react'
import { MessageSquare, Send, X, Bot, CheckCircle2 } from 'lucide-react'
import { processWhatsAppBotMessage } from '@/lib/whatsapp'

export function WhatsAppQueryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState('')
  const [teamNameOrRoll, setTeamNameOrRoll] = useState('')
  const [topic, setTopic] = useState('Registration & Fees')
  const [question, setQuestion] = useState('')

  // Interactive Bot State
  const [botQuery, setBotQuery] = useState('')
  const [botReply, setBotReply] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSendToWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    try {
      const res = await fetch('/api/whatsapp/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, teamNameOrRoll, topic, question }),
      })

      const data = await res.json()
      if (data.waUrl) {
        window.open(data.waUrl, '_blank')
        onClose()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleTestBot = (e: React.FormEvent) => {
    e.preventDefault()
    if (!botQuery.trim()) return
    const reply = processWhatsAppBotMessage(botQuery)
    setBotReply(reply)
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/85 p-4 sm:p-6 backdrop-blur-md">
      <div className="flex min-h-full items-center justify-center">
        
        {/* Modal Box */}
        <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl space-y-6 my-auto overflow-hidden">
          
          {/* Sticky Modal Title Bar */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-900/95 px-6 py-4 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">WhatsApp Help Desk & Bot</h3>
                <p className="text-[11px] text-slate-400">Direct query to Student Coordinators</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl border border-slate-800 bg-slate-950 p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="px-6 pb-6 space-y-6">
            {/* Direct Form */}
            <form onSubmit={handleSendToWhatsApp} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. A. Lokesh"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Team Name / Roll No.</label>
                  <input
                    type="text"
                    value={teamNameOrRoll}
                    onChange={(e) => setTeamNameOrRoll(e.target.value)}
                    placeholder="e.g. 22CS1A0501"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Query Topic</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Registration & Fees">Registration & Fees</option>
                  <option value="PhonePe Payment Verification">PhonePe Payment Verification</option>
                  <option value="Schedule & Session Timings">Schedule & Session Timings</option>
                  <option value="Diploma Branch Rules">Diploma Branch Rules</option>
                  <option value="General Query">General Query</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Question / Query *</label>
                <textarea
                  required
                  rows={3}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your question here..."
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow-lg transition hover:bg-emerald-500"
              >
                <Send className="h-4 w-4" />
                <span>Send Query Directly to Organizer WhatsApp →</span>
              </button>
            </form>

            {/* WhatsApp Bot Tester */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
                <Bot className="h-4 w-4 text-amber-400" />
                <span>Test Automatic WhatsApp Bot Response</span>
              </div>

              <form onSubmit={handleTestBot} className="flex gap-2">
                <input
                  type="text"
                  value={botQuery}
                  onChange={(e) => setBotQuery(e.target.value)}
                  placeholder="Type keyword e.g. Fee, Schedule, Diploma..."
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-500 shrink-0"
                >
                  Ask Bot
                </button>
              </form>

              {botReply && (
                <div className="rounded-lg bg-slate-900 p-3 border border-slate-800 text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                  {botReply}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
