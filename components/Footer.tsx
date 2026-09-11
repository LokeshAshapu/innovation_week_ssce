import Link from 'next/link'
import { Rocket, ShieldCheck, MapPin, Mail, Phone, ExternalLink, Building } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Col 1: About Institution & Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white p-1 border border-indigo-400/50 shadow-md">
                <img
                  src="/images/sivani_logo.png"
                  alt="Sri Sivani College Emblem"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-white text-sm block">INNOVATION WEEK 2026</span>
                <span className="text-[10px] text-indigo-400 font-semibold uppercase">Sri Sivani College of Engg.</span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-[11px]">
              "Build, Pitch & Win Big – Building the Next Generation of Tech Leaders". Five days of intense innovation, prototype development, MVP creation and pitch finale.
            </p>

            <div className="pt-1 text-indigo-300 font-semibold flex items-center gap-1.5 text-[11px]">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>In Collaboration with Ratan Tata Innovation Hub</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Event Navigation</h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/" className="hover:text-indigo-400 transition">Home Overview</Link></li>
              <li><Link href="/about" className="hover:text-indigo-400 transition">About Campus & Dept</Link></li>
              <li><Link href="/programme" className="hover:text-indigo-400 transition">5-Day Schedule</Link></li>
              <li><Link href="/event-journey" className="hover:text-indigo-400 transition">Interactive Event Journey</Link></li>
              <li><Link href="/evaluation" className="hover:text-indigo-400 transition">Jury Evaluation Rubric</Link></li>
              <li><Link href="/leaderboard" className="hover:text-indigo-400 transition">Live Leaderboard</Link></li>
            </ul>
          </div>

          {/* Col 3: Organization */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Organized By</h4>
            <div className="space-y-2 text-slate-300">
              <p className="font-bold text-indigo-200">Department of CSE & AI-ML</p>
              <p className="text-slate-300 font-semibold">Sri Sivani College of Engineering <span className="text-amber-400">(Autonomous)</span></p>
              <p className="flex items-start gap-1.5 text-slate-400 text-[11px] pt-1">
                <MapPin className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Chilakapalem Jn., NH-16, Srikakulam, AP - 532410</span>
              </p>
            </div>
          </div>

          {/* Col 4: Coordinators */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Key Coordinators</h4>
            <ul className="space-y-2 text-slate-300">
              <li><strong className="text-slate-200">Student Leads:</strong> A. Lokesh & K. Hareesh</li>
              <li><strong className="text-slate-200">Operations:</strong> V. Aravind & K. Sharvan</li>
              <li><strong className="text-slate-200">Media Lead:</strong> B. Prasad</li>
              <li><strong className="text-slate-200">Faculty Lead:</strong> Prof. Janaki Bhai Madam</li>
              <li><strong className="text-slate-200">Jury Partner:</strong> Ratan Tata Innovation Hub</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p>© 2026 Department of CSE & AI-ML, Sri Sivani College of Engineering. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-white transition font-medium">Admin Portal Login</Link>
            <span>•</span>
            <Link href="/register" className="hover:text-white transition font-medium">Team Registration</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
