import Link from 'next/link'
import { Building2, Rocket, ShieldCheck, Target, Award, Users, CheckCircle2, MapPin, Building } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header with Emblem Logo */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-300 backdrop-blur-md">
            <div className="h-5 w-5 rounded-full bg-white p-0.5 shrink-0 flex items-center justify-center">
              <img src="/images/sivani_logo.png" alt="Sri Sivani Logo" className="h-full w-full object-contain" />
            </div>
            <span>SRI SIVANI COLLEGE OF ENGINEERING (AUTONOMOUS)</span>
          </div>
          <h1 className="text-3xl font-black text-white sm:text-5xl">
            About Institution & Department
          </h1>
          <p className="text-base text-indigo-200 font-medium">
            “Build, Pitch & Win Big – Building the Next Generation of Tech Leaders”
          </p>
        </div>

        {/* Campus Building Showcase Image Card */}
        <div className="rounded-3xl border border-indigo-500/30 bg-slate-900 overflow-hidden shadow-2xl relative">
          <div className="relative aspect-[21/9] sm:aspect-[24/9] overflow-hidden">
            <img
              src="/images/sivani_campus.png"
              alt="Sri Sivani College Campus Building"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="rounded bg-indigo-600/90 px-3 py-1 text-xs font-extrabold text-white">
                  AUTONOMOUS CAMPUS
                </span>
                <h2 className="text-2xl font-black text-white sm:text-3xl">Sri Sivani Main Campus Building</h2>
                <p className="text-xs text-slate-300 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-rose-400" />
                  <span>Chilakapalem Jn., NH-16, Srikakulam, AP - 532410</span>
                </p>
              </div>

              <div className="flex items-center gap-3 bg-slate-950/80 p-2.5 rounded-2xl border border-white/10 backdrop-blur-md shrink-0">
                <img src="/images/sivani_logo.png" alt="Sri Sivani Emblem" className="h-10 w-10 object-contain bg-white rounded-xl p-1" />
                <div>
                  <span className="text-xs font-bold text-white block">UGC & JNTUGV</span>
                  <span className="text-[10px] text-amber-400 font-semibold">Autonomous Status</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 space-y-4 hover:border-indigo-500/40 transition">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Event Vision</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              To cultivate an entrepreneurial mindset among engineering and diploma students, empowering them to transform raw ideas into scalable, real-world tech ventures that solve local and national challenges.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 space-y-4 hover:border-violet-500/40 transition">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
              <Rocket className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Event Mission</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Provide a 5-day structured incubator ecosystem featuring expert talks, problem identification, prototype sprints, MVP deployment, business pitching, and direct jury evaluation backed by Ratan Tata Innovation Hub.
            </p>
          </div>
        </div>

        {/* Department Info */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-white p-1.5 shrink-0 border border-indigo-400">
              <img src="/images/sivani_logo.png" alt="Sri Sivani Logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">Department of CSE & AI-ML</h2>
              <p className="text-xs text-indigo-300 font-semibold">Sri Sivani College of Engineering (Autonomous), Srikakulam</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            The Department of Computer Science & Engineering and Artificial Intelligence & Machine Learning at Sri Sivani College of Engineering is dedicated to academic excellence, state-of-the-art research, and industry-oriented practical learning. The department actively encourages student innovation, hackathons, and incubation initiatives.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            <div className="space-y-1">
              <span className="text-xs text-slate-400">Institution Status:</span>
              <p className="text-sm font-bold text-white">Autonomous Engineering College</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-400">Location:</span>
              <p className="text-sm font-bold text-white">Srikakulam, Andhra Pradesh</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-400">Incubation Partner:</span>
              <p className="text-sm font-bold text-emerald-400">Ratan Tata Innovation Hub</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 p-8 sm:p-12 text-center border border-indigo-500/30 space-y-4 shadow-2xl">
          <h3 className="text-2xl font-black text-white sm:text-3xl">Ready to take part in Innovation Week 2026?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Form your team of 3 to 4 members and submit your startup idea today.
          </p>
          <div className="pt-2">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 text-sm font-extrabold text-white shadow-xl hover:scale-105 transition"
            >
              <Rocket className="h-4 w-4" />
              <span>Register Your Team Now</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
