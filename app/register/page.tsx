import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RegisterFormClient } from '@/components/registration/RegisterFormClient'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-4">
          <span className="rounded-full bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
            Team Registration Portal
          </span>
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            Register Your Startup Team
          </h1>
          <p className="text-sm text-slate-400 font-medium max-w-xl mx-auto">
            Register a team of 4 to 5 students. Team Leaders will receive dashboard credentials to submit ideas, prototypes, MVPs & pitch decks.
          </p>
        </div>

        <RegisterFormClient />
      </main>

      <Footer />
    </div>
  )
}
