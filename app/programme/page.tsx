import { db } from '@/lib/db'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ProgrammeScheduleClient } from '@/components/programme/ProgrammeScheduleClient'

export const dynamic = 'force-dynamic'

export default async function ProgrammePage() {
  let days: any[] = []
  try {
    days = await db.programmeDay.findMany({
      orderBy: { dayNumber: 'asc' },
      include: {
        sessions: true,
      },
    })
  } catch (err) {
    console.error('Failed to query programme days:', err)
  }

  // Fallback data if DB query returns empty array
  if (!days || days.length === 0) {
    days = [
      {
        id: 'day-1',
        dayNumber: 1,
        title: 'INAUGURAL & ENTREPRENEURSHIP AWARENESS',
        theme: 'Understanding Entrepreneurship, Innovation and the Startup Ecosystem',
        date: 'Day 1 (Saturday, 19th Sept)',
        sessions: [
          { id: 's1', dayId: 'day-1', timeSlot: '9:30–9:40 AM', sessionTitle: 'Gathering & Attendance', activityDetails: 'Students assemble in seminar hall; attendance and registration', responsibility: 'Student Coordinators (A. Lokesh & K. Hareesh)', expectedOutput: '100% Student Presence & Registration Verification' },
          { id: 's2', dayId: 'day-1', timeSlot: '10:40–11:00 AM', sessionTitle: 'Expert Keynote Talk', activityDetails: 'Interactive session by entrepreneur/startup founder', responsibility: 'Guest Speaker', expectedOutput: 'Inspiration & mind-shift towards problem solving' },
          { id: 's3', dayId: 'day-1', timeSlot: '11:05–11:35 AM', sessionTitle: 'Startup Ecosystem Session', activityDetails: 'Incubation centers, funding, mentors, and Ratan Tata Hub support', responsibility: 'Incubator Lead', expectedOutput: 'Knowledge of Ratan Tata Innovation Hub & Startup India schemes' },
        ],
      },
      {
        id: 'day-2',
        dayNumber: 2,
        title: 'STARTUP IDEA PRESENTATION',
        theme: 'Problem Identification, Solution Design and Business Model',
        date: 'Day 2 (Monday, 21st Sept)',
        sessions: [
          { id: 's4', dayId: 'day-2', timeSlot: '2:00–2:05 PM', sessionTitle: 'Assembly & Attendance', activityDetails: 'Roll call and team seating', responsibility: 'Student Coordinators (B. Yogeswari & K. Raghavendra)', expectedOutput: 'All teams present' },
          { id: 's5', dayId: 'day-2', timeSlot: '2:25–3:50 PM', sessionTitle: 'Startup Idea Presentations', activityDetails: 'Rapid 3-minute pitch rounds per team before evaluation panel', responsibility: 'Evaluators & Faculty', expectedOutput: 'Problem statements and solutions presented' },
        ],
      },
      {
        id: 'day-3',
        dayNumber: 3,
        title: 'PROTOTYPE DEVELOPMENT',
        theme: 'Converting Startup Ideas into Working Prototypes',
        date: 'Day 3 (Tuesday, 22nd Sept)',
        sessions: [
          { id: 's6', dayId: 'day-3', timeSlot: '2:00–2:05 PM', sessionTitle: 'Assembly & Lab Setup', activityDetails: 'Attendance and lab allocation', responsibility: 'Student Coordinators (P. Sony & R. Dileep Kumar)', expectedOutput: 'Lab setup ready' },
          { id: 's7', dayId: 'day-3', timeSlot: '2:15–3:20 PM', sessionTitle: 'Prototype Development Sprint', activityDetails: 'Hands-on coding, UI design, circuit assembly and model building', responsibility: 'Team Members', expectedOutput: 'Working prototype ready for demo' },
        ],
      },
      {
        id: 'day-4',
        dayNumber: 4,
        title: 'MVP DEVELOPMENT & BUSINESS PITCH',
        theme: 'Product Validation, Minimum Viable Product and Startup Pitch',
        date: 'Day 4 (Wednesday, 23rd Sept)',
        sessions: [
          { id: 's8', dayId: 'day-4', timeSlot: '2:00–2:05 PM', sessionTitle: 'Assembly', activityDetails: 'Attendance & lab check-in', responsibility: 'Student Coordinators (B. Amrutha & Rami Naidu)', expectedOutput: 'Teams assembled' },
          { id: 's9', dayId: 'day-4', timeSlot: '2:25–3:05 PM', sessionTitle: 'MVP Packaging & Deployment', activityDetails: 'Deploying web/mobile apps, packaging models, preparing live demos', responsibility: 'Team Members', expectedOutput: 'Live demo URL / MVP package ready' },
        ],
      },
      {
        id: 'day-5',
        dayNumber: 5,
        title: 'GRAND FINALE & AWARDS CEREMONY',
        theme: 'Final Startup Presentation, Evaluation and Recognition',
        date: 'Day 5 (Thursday & Friday, 24th–25th Sept)',
        sessions: [
          { id: 's10', dayId: 'day-5', timeSlot: '2:00–2:05 PM', sessionTitle: 'Auditorium Assembly', activityDetails: 'Teams, faculty, guests and jury take seats', responsibility: 'All Coordinators', expectedOutput: 'Full venue readiness' },
          { id: 's11', dayId: 'day-5', timeSlot: '2:15–3:15 PM', sessionTitle: 'Grand Finale Startup Pitches', activityDetails: 'Live 3-minute pitch pitches (2m pitch + 1m rapid Q&A) per team', responsibility: 'Jury & Teams', expectedOutput: 'Real-time scores recorded in portal' },
        ],
      },
    ]
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="rounded-full bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
            Official 5-Day Schedule (19th – 25th Sept 2026 • Sept 20th Sunday Holiday)
          </span>
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            Innovation Week Programme
          </h1>
          <p className="text-sm text-slate-400 font-medium">
            Explore daily sessions, timings, activity guidelines, coordinator responsibilities and expected deliverables. Note: 20th September (Sunday) is a holiday.
          </p>
        </div>

        {/* Interactive Schedule Component */}
        <ProgrammeScheduleClient days={days} />
      </main>

      <Footer />
    </div>
  )
}
