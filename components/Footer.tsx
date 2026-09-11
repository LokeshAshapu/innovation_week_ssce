import Link from 'next/link'
import { Rocket, ShieldCheck, MapPin, Mail, Phone, ExternalLink } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Rocket className="h-4 w-4" />
              </div>
              <span className="font-bold text-white text-base">INNOVATION WEEK 2026</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              "Build, Pitch & Win Big – Building the Next Generation of Tech Leaders". Five days of intense innovation, prototype development, MVP creation and pitch finale.
            </p>
            <div className="pt-2 text-indigo-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>In Collaboration with Ratan Tata Innovation Hub</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-3">Event Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-indigo-400 transition">Home Overview</Link></li>
              <li><Link href="/about" className="hover:text-indigo-400 transition">About Institution & Dept</Link></li>
              <li><Link href="/programme" className="hover:text-indigo-400 transition">5-Day Schedule</Link></li>
              <li><Link href="/event-journey" className="hover:text-indigo-400 transition">Interactive Event Journey</Link></li>
              <li><Link href="/evaluation" className="hover:text-indigo-400 transition">Jury Evaluation Rubric</Link></li>
              <li><Link href="/leaderboard" className="hover:text-indigo-400 transition">Live Leaderboard</Link></li>
            </ul>
          </div>

          {/* Col 3: Organization */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-3">Organized By</h4>
            <div className="space-y-2 text-slate-300">
              <p className="font-medium text-white">Department of CSE & AI-ML</p>
              <p>Sri Sivani College of Engineering (Autonomous)</p>
              <p className="flex items-center gap-1.5 text-slate-400">
                <MapPin className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                <span>Chilakapalem Jn., NH-16, Srikakulam, AP - 532410</span>
              </p>
            </div>
          </div>

          {/* Col 4: Coordinators */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-3">Key Coordinators</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><strong className="text-slate-200">Student Leads:</strong> A. Lokesh & K. Hareesh</li>
              <li><strong className="text-slate-200">Media Lead:</strong> B. Prasad</li>
              <li><strong className="text-slate-200">Faculty Lead:</strong> Prof. Janaki Bhai Madam</li>
              <li><strong className="text-slate-200">Jury Partner:</strong> Ratan Tata Innovation Hub</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p>© 2026 Department of CSE & AI-ML, Sri Sivani College of Engineering. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-white transition">Admin Portal Login</Link>
            <span>•</span>
            <Link href="/register" className="hover:text-white transition">Team Registration</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
