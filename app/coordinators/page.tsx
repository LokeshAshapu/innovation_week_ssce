import { Users, UserCheck, ShieldCheck, Award, Calendar, Camera } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function CoordinatorsPage() {
  const studentCoordinators = [
    { name: 'A. Lokesh', role: 'Student Lead Coordinator', day: 'Day 1 Coordinator' },
    { name: 'P. Hareesh', role: 'Student Co-Coordinator', day: 'Day 1 Coordinator' },
    { name: 'B. Yogeswari', role: 'Student Coordinator', day: 'Day 2 Coordinator' },
    { name: 'K. Raghavendra', role: 'Student Coordinator', day: 'Day 2 Coordinator' },
    { name: 'P. Sony', role: 'Student Coordinator', day: 'Day 3 Coordinator' },
    { name: 'R. Dileep Kumar', role: 'Student Coordinator', day: 'Day 3 Coordinator' },
    { name: 'B. Amrutha', role: 'Student Coordinator', day: 'Day 4 Coordinator' },
    { name: 'Rami Naidu', role: 'Student Coordinator', day: 'Day 4 Coordinator' },
    { name: 'K. Sharvan', role: 'Student Coordinator', day: 'Event Operations' },
    { name: 'B. Prasad', role: 'Media Coordinator', day: 'Media & Documentation' },
  ]

  const facultyCoordinators = [
    { name: 'Prof. Janaki Bhai Madam', dept: 'Dept of CSE & AI-ML', role: 'Faculty Lead' },
    { name: 'Venu Sir', dept: 'Dept of CSE', role: 'Faculty Coordinator' },
    { name: 'Teja Sir', dept: 'Dept of AI-ML', role: 'Faculty Coordinator' },
    { name: 'Shilpa Madam', dept: 'Dept of CSE', role: 'Faculty Coordinator' },
    { name: 'Ammi Naidu Sir', dept: 'Dept of AI-ML', role: 'Faculty Coordinator' },
  ]

  const dayWiseMap = [
    { day: 'Day 1', focus: 'Inaugural & Awareness', leads: 'A. Lokesh & P. Hareesh' },
    { day: 'Day 2', focus: 'Startup Idea Presentation', leads: 'B. Yogeswari & K. Raghavendra' },
    { day: 'Day 3', focus: 'Prototype Development', leads: 'P. Sony & R. Dileep Kumar' },
    { day: 'Day 4', focus: 'MVP Development & Pitch', leads: 'B. Amrutha & Rami Naidu' },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="rounded-full bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
            Event Organizing Team
          </span>
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            Coordinators & Jury Panel
          </h1>
          <p className="text-sm text-slate-400 font-medium">
            Meet the faculty leads, student coordinators, media team, and incubator mentors managing Innovation Week 2026.
          </p>
        </div>

        {/* Day-Wise Responsibilities Card */}
        <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/80 p-6 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-400" />
            <span>Day-Wise Lead Student Coordinators</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dayWiseMap.map((d) => (
              <div key={d.day} className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-indigo-400">{d.day}</span>
                <p className="text-xs text-slate-400">{d.focus}</p>
                <p className="text-sm font-bold text-white pt-1">{d.leads}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Student Coordinators */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-violet-400" />
            <span>Student Coordinators</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {studentCoordinators.map((c) => (
              <div
                key={c.name}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2 hover:border-indigo-500/40 transition"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 font-bold">
                  {c.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{c.name}</h3>
                  <p className="text-[11px] text-indigo-300 font-medium">{c.role}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{c.day}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Faculty Coordinators */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-amber-400" />
            <span>Faculty Coordinators</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {facultyCoordinators.map((fc) => (
              <div
                key={fc.name}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2 hover:border-indigo-500/40 transition"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 font-bold">
                  {fc.name.split(' ')[1]?.charAt(0) || 'F'}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{fc.name}</h3>
                  <p className="text-[11px] text-amber-300 font-medium">{fc.role}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{fc.dept}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jury Coordination Partner */}
        <div className="rounded-2xl border border-emerald-500/30 bg-slate-900 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
              <h2 className="text-xl font-extrabold text-white">Evaluation & Jury Coordination</h2>
            </div>
            <p className="text-sm text-slate-300">
              Evaluations are audited and mentored in collaboration with experts from <strong className="text-emerald-400">Ratan Tata Innovation Hub</strong>.
            </p>
          </div>
          <div className="rounded-xl bg-slate-950 px-6 py-3 border border-emerald-500/30 text-emerald-300 font-bold text-sm">
            Ratan Tata Innovation Hub
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
