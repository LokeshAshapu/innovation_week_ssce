import Link from 'next/link'
import { Building2, Rocket, ShieldCheck, Target, Award, Users, CheckCircle2 } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="rounded-full bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
            About The Event & Department
          </span>
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            Innovation Week 2026
          </h1>
          <p className="text-base text-slate-300 font-medium">
            “From Idea to Startup – Building the Next Generation of Entrepreneurs”
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Event Vision</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              To cultivate an entrepreneurial mindset among engineering and diploma students, empowering them to transform raw ideas into scalable, real-world tech ventures that solve local and national challenges.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
              <Rocket className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Event Mission</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Provide a 5-day structured incubator ecosystem featuring expert talks, problem identification, prototype sprints, MVP deployment, business pitching, and direct jury evaluation backed by Ratan Tata Innovation Hub.
            </p>
          </div>
        </div>

        {/* Department & Club Info */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 space-y-6">
          <div className="flex items-center gap-3">
            <Building2 className="h-7 w-7 text-indigo-400" />
            <div>
              <h2 className="text-2xl font-extrabold text-amber-400">TPO Cell</h2>
              <p className="text-sm text-slate-200 font-bold">Dept. of CSE & AI-ML</p>
              <p className="text-xs text-slate-400 font-medium">Sri Sivani College of Engineering (Autonomous), Srikakulam</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            TPO Cell, operated under the Department of Computer Science & Engineering and Artificial Intelligence & Machine Learning at Sri Sivani College of Engineering, is dedicated to nurturing technical talent, innovation, and startup readiness among students.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            <div className="space-y-1">
              <span className="text-xs text-slate-400">Organized By:</span>
              <p className="text-sm font-bold text-amber-400">TPO Cell</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-400">Department:</span>
              <p className="text-sm font-semibold text-white">Dept. of CSE & AI-ML</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-400">Incubation Partner:</span>
              <p className="text-sm font-semibold text-emerald-400">Ratan Tata Innovation Hub</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-r from-indigo-900/50 via-slate-900 to-violet-900/50 p-8 text-center border border-indigo-500/30 space-y-4">
          <h3 className="text-xl font-bold text-white">Ready to take part in Innovation Week 2026?</h3>
          <p className="text-xs text-slate-300 max-w-lg mx-auto">
            Form your team of 4 to 5 members and submit your startup idea today.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-indigo-500"
          >
            <Rocket className="h-4 w-4" />
            <span>Register Team Now</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
