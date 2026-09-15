import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Innovation Week 2026 Database...')

  // 1. Clean existing records
  await prisma.auditLog.deleteMany()
  await prisma.attendance.deleteMany()
  await prisma.certificate.deleteMany()
  await prisma.presentationQueue.deleteMany()
  await prisma.evaluation.deleteMany()
  await prisma.pitchSubmission.deleteMany()
  await prisma.mVPSubmission.deleteMany()
  await prisma.prototypeSubmission.deleteMany()
  await prisma.ideaSubmission.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.teamMember.deleteMany()
  await prisma.team.deleteMany()
  await prisma.user.deleteMany()
  await prisma.announcement.deleteMany()
  await prisma.programmeSession.deleteMany()
  await prisma.programmeDay.deleteMany()
  await prisma.eventSettings.deleteMany()

  // 2. Default Event Settings
  await prisma.eventSettings.create({
    data: {
      id: '1',
      eventName: 'Innovation Week 2026',
      collegeName: 'Sri Sivani College of Engineering (Autonomous), Srikakulam',
      deptName: 'Department of CSE & AI-ML',
      regFee: 200,
      upiId: 'srisivani.cse@upi',
      recipientName: 'Sri Sivani Innovation Week',
      phonePeEnabled: true,
      regOpen: true,
      resultsPublished: true,
    },
  })

  // 3. System Accounts
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@srisivani.ac.in',
      name: 'Dr. Head of Department',
      passwordHash: 'admin123',
      role: 'ADMIN',
    },
  })

  await prisma.user.create({
    data: {
      email: 'faculty@srisivani.ac.in',
      name: 'Prof. Janaki Bhai',
      passwordHash: 'faculty123',
      role: 'FACULTY',
    },
  })

  await prisma.user.create({
    data: {
      email: 'coordinator@srisivani.ac.in',
      name: 'A. Lokesh (Student Coordinator)',
      passwordHash: 'coordinator123',
      role: 'COORDINATOR',
    },
  })

  const evaluator1 = await prisma.user.create({
    data: {
      email: 'jury1@ratantatahub.org',
      name: 'Dr. V. Ramanathan (Ratan Tata Innovation Hub)',
      passwordHash: 'jury123',
      role: 'EVALUATOR',
    },
  })

  const evaluator2 = await prisma.user.create({
    data: {
      email: 'jury2@startupindia.org',
      name: 'Smt. K. Anitha (Serial Entrepreneur & Mentor)',
      passwordHash: 'jury123',
      role: 'EVALUATOR',
    },
  })

  // 4. Official Programme Schedule (Days 1 to 5)
  const day1 = await prisma.programmeDay.create({
    data: {
      dayNumber: 1,
      title: 'INAUGURAL & ENTREPRENEURSHIP AWARENESS',
      theme: 'Understanding Entrepreneurship, Innovation and the Startup Ecosystem',
      date: 'Day 1 (Saturday, 19th Sept)',
      sessions: {
        create: [
          {
            timeSlot: '9:30–9:40 AM',
            sessionTitle: 'Gathering & Attendance',
            activityDetails: 'Students assemble in seminar hall; attendance and registration',
            responsibility: 'Student Coordinators (A. Lokesh & K. Hareesh)',
            expectedOutput: '100% Student Presence & Registration Verification',
          },
          {
            timeSlot: '9:50–10:15 AM',
            sessionTitle: 'Welcome Address',
            activityDetails: 'Welcome address and introduction to Innovation Week',
            responsibility: 'Student Coordinators',
            expectedOutput: 'Event orientation and goals shared',
          },
          {
            timeSlot: '10:20–10:30 AM',
            sessionTitle: 'Inauguration',
            activityDetails: 'Formal inauguration ceremony',
            responsibility: 'Faculty / Management',
            expectedOutput: 'Official launch of Innovation Week 2026',
          },
          {
            timeSlot: '10:30–10:40 AM',
            sessionTitle: 'Programme Overview',
            activityDetails: 'Theme, objectives, rules and five-day activities walkthrough',
            responsibility: 'Student Coordinators',
            expectedOutput: 'Teams aware of rules, rubrics and deadlines',
          },
          {
            timeSlot: '10:40–11:00 AM',
            sessionTitle: 'Expert Keynote Talk',
            activityDetails: 'Interactive session by entrepreneur/startup founder',
            responsibility: 'Guest Speaker',
            expectedOutput: 'Inspiration & mind-shift towards problem solving',
          },
          {
            timeSlot: '11:05–11:35 AM',
            sessionTitle: 'Startup Ecosystem Session',
            activityDetails: 'Startups, incubation centers, funding, mentors, government support and commercialization',
            responsibility: 'Guest Speaker / Incubator Lead',
            expectedOutput: 'Knowledge of Ratan Tata Innovation Hub & Startup India schemes',
          },
          {
            timeSlot: '11:40–11:50 AM',
            sessionTitle: 'Interactive Discussion',
            activityDetails: 'Students interact with guest speaker',
            responsibility: 'Student Coordinators',
            expectedOutput: 'Clarification of startup & innovation concepts',
          },
          {
            timeSlot: '11:50 AM–12:10 PM',
            sessionTitle: 'Innovation Challenge Briefing',
            activityDetails: 'Day 2 problem identification, team formation and presentation requirements',
            responsibility: 'Student Coordinators',
            expectedOutput: 'Problem statement guidelines distributed',
          },
          {
            timeSlot: '12:15–12:50 PM',
            sessionTitle: 'Day Closure & Brainstorming',
            activityDetails: 'Team brainstorming and Day 2 pitch preparation instructions',
            responsibility: 'Student Coordinators',
            expectedOutput: 'Teams formed, domains identified, ready for Day 2 pitch',
          },
        ],
      },
    },
  })

  await prisma.programmeDay.create({
    data: {
      dayNumber: 2,
      title: 'STARTUP IDEA PRESENTATION',
      theme: 'Problem Identification, Solution Design and Business Model',
      date: 'Day 2 (Monday, 21st Sept)',
      sessions: {
        create: [
          {
            timeSlot: '2:00–2:05 PM',
            sessionTitle: 'Assembly & Attendance',
            activityDetails: 'Roll call and team seating',
            responsibility: 'Student Coordinators (B. Yogeswari & K. Raghavendra)',
            expectedOutput: 'All teams present',
          },
          {
            timeSlot: '2:05–2:15 PM',
            sessionTitle: 'Day 2 Kick-off & Presentation Guidelines',
            activityDetails: 'Walkthrough of presentation format: Problem -> Solution -> Target Users -> USP -> Business Potential -> Impact',
            responsibility: 'Student Coordinators',
            expectedOutput: 'Pitching rules confirmed',
          },
          {
            timeSlot: '2:15–2:25 PM',
            sessionTitle: 'Pitch Preparation & Team Setup',
            activityDetails: 'Final check of slides and deck uploads',
            responsibility: 'Team Leaders',
            expectedOutput: 'Decks loaded on central projector',
          },
          {
            timeSlot: '2:25–3:50 PM',
            sessionTitle: 'Startup Idea Presentations',
            activityDetails: 'Rapid 3-minute pitch rounds per team before evaluation panel',
            responsibility: 'Student Coordinators & Evaluators',
            expectedOutput: 'Problem statements and solutions presented',
          },
          {
            timeSlot: '3:50–4:00 PM',
            sessionTitle: 'Evaluation, Feedback & Next Steps',
            activityDetails: 'Jury feedback and greenlight for prototype phase',
            responsibility: 'Evaluators & Faculty',
            expectedOutput: 'Selected ideas approved for Day 3 prototype build',
          },
        ],
      },
    },
  })

  await prisma.programmeDay.create({
    data: {
      dayNumber: 3,
      title: 'PROTOTYPE DEVELOPMENT',
      theme: 'Converting Startup Ideas into Working Prototypes',
      date: 'Day 3 (Tuesday, 22nd Sept)',
      sessions: {
        create: [
          {
            timeSlot: '2:00–2:05 PM',
            sessionTitle: 'Assembly & Attendance',
            activityDetails: 'Attendance and lab allocation',
            responsibility: 'Student Coordinators (P. Sony & R. Dileep Kumar)',
            expectedOutput: 'Lab setup ready',
          },
          {
            timeSlot: '2:05–2:15 PM',
            sessionTitle: 'Prototype Briefing',
            activityDetails: 'Overview of prototype options (Software, AI/ML, IoT, UI/UX, Hardware, Mockups)',
            responsibility: 'Faculty Mentors',
            expectedOutput: 'Technical roadmap finalized',
          },
          {
            timeSlot: '2:15–3:20 PM',
            sessionTitle: 'Sprint 1: Intensive Development',
            activityDetails: 'Hands-on coding, UI design, circuit assembly and model building',
            responsibility: 'Team Members',
            expectedOutput: 'Core functionality working',
          },
          {
            timeSlot: '3:20–3:35 PM',
            sessionTitle: 'Mentor Interaction & Code Review',
            activityDetails: 'Faculty & mentors review progress and troubleshoot roadblocks',
            responsibility: 'Faculty Coordinators',
            expectedOutput: 'Technical guidance delivered',
          },
          {
            timeSlot: '3:35–3:50 PM',
            sessionTitle: 'Sprint 2: Refinement',
            activityDetails: 'Bug fixing, styling, and prototype polishing',
            responsibility: 'Team Members',
            expectedOutput: 'Working prototype ready for demo',
          },
          {
            timeSlot: '3:50–4:00 PM',
            sessionTitle: 'Prototype Demonstration & Day Closure',
            activityDetails: 'Quick 1-minute working proof-of-concept preview',
            responsibility: 'Student Coordinators',
            expectedOutput: 'Prototypes validated for MVP phase',
          },
        ],
      },
    },
  })

  await prisma.programmeDay.create({
    data: {
      dayNumber: 4,
      title: 'MVP DEVELOPMENT & BUSINESS PITCH',
      theme: 'Product Validation, Minimum Viable Product and Startup Pitch',
      date: 'Day 4 (Wednesday, 23rd Sept)',
      sessions: {
        create: [
          {
            timeSlot: '2:00–2:05 PM',
            sessionTitle: 'Assembly',
            activityDetails: 'Attendance & lab check-in',
            responsibility: 'Student Coordinators (B. Amrutha & Rami Naidu)',
            expectedOutput: 'Teams assembled',
          },
          {
            timeSlot: '2:05–2:15 PM',
            sessionTitle: 'MVP Briefing & Business Model Alignment',
            activityDetails: 'Connecting prototype to real customer validation and unit economics',
            responsibility: 'Faculty Coordinators',
            expectedOutput: '11-point pitch deck structure clarified',
          },
          {
            timeSlot: '2:15–3:05 PM',
            sessionTitle: 'MVP Packaging & Deployment',
            activityDetails: 'Deploying web/mobile apps, packaging models, preparing live demos',
            responsibility: 'Team Members',
            expectedOutput: 'Live demo URL / MVP package ready',
          },
          {
            timeSlot: '3:05–3:25 PM',
            sessionTitle: 'Product Validation & Feedback Synthesis',
            activityDetails: 'Testing MVP with peer teams and recording user feedback',
            responsibility: 'Team Leaders',
            expectedOutput: 'Validation metrics documented',
          },
          {
            timeSlot: '3:25–3:55 PM',
            sessionTitle: 'Business Pitch Preparation & Practice',
            activityDetails: 'Drafting 11-slide pitch deck and timed rehearsal',
            responsibility: 'Team Pitchers',
            expectedOutput: 'Pitch deck uploaded to portal',
          },
          {
            timeSlot: '3:55–4:00 PM',
            sessionTitle: 'Final Instructions for Finale',
            activityDetails: 'Briefing on Grand Finale jury presentation rules',
            responsibility: 'Student Coordinators',
            expectedOutput: 'Grand Finale queue finalized',
          },
        ],
      },
    },
  })

  await prisma.programmeDay.create({
    data: {
      dayNumber: 5,
      title: 'GRAND FINALE & AWARDS CEREMONY',
      theme: 'Final Startup Presentation, Evaluation and Recognition',
      date: 'Day 5 (Thursday & Friday, 24th–25th Sept)',
      sessions: {
        create: [
          {
            timeSlot: '2:00–2:05 PM',
            sessionTitle: 'Assembly in Main Auditorium',
            activityDetails: 'Teams, faculty, guests and jury take seats',
            responsibility: 'All Coordinators',
            expectedOutput: 'Full venue readiness',
          },
          {
            timeSlot: '2:05–2:15 PM',
            sessionTitle: 'Final Briefing',
            activityDetails: 'Jury introduction and final presentation countdown rules',
            responsibility: 'Faculty Coordinators',
            expectedOutput: 'Jury scoring panels activated',
          },
          {
            timeSlot: '2:15–3:15 PM',
            sessionTitle: 'Grand Finale Startup Pitches',
            activityDetails: 'Live 3-minute pitch pitches (2m pitch + 1m rapid Q&A) per team',
            responsibility: 'Jury & Teams',
            expectedOutput: 'Real-time scores recorded in portal',
          },
          {
            timeSlot: '3:15–3:30 PM',
            sessionTitle: 'Jury Interaction & Deliberation',
            activityDetails: 'Jury reviews weighted scores across 7 criteria',
            responsibility: 'Jury Members',
            expectedOutput: 'Final leaderboard compiled',
          },
          {
            timeSlot: '3:30–3:40 PM',
            sessionTitle: 'Results Announcement',
            activityDetails: 'Admin publishes live results on portal',
            responsibility: 'Admin & Faculty',
            expectedOutput: 'Winners & awardees revealed',
          },
          {
            timeSlot: '3:47–3:55 PM',
            sessionTitle: 'Prize & Certificate Distribution',
            activityDetails: 'Trophies, certificates and incubator acceleration offers presented',
            responsibility: 'Management & Guest Dignitaries',
            expectedOutput: 'Certificates generated & distributed',
          },
          {
            timeSlot: '3:55–4:00 PM',
            sessionTitle: 'Valedictory & Vote of Thanks',
            activityDetails: 'Concluding remarks and photo session',
            responsibility: 'Student Coordinators',
            expectedOutput: 'Innovation Week 2026 successfully concluded',
          },
        ],
      },
    },
  })

  // 5. Announcements
  await prisma.announcement.createMany({
    data: [
      {
        title: '🚀 Innovation Week 2026 Registration Open!',
        content: 'Form your team of 3 to 4 members and register before the deadline. Fee is ₹200 per team.',
        priority: 'URGENT',
        targetRole: 'ALL',
        createdBy: 'Admin',
      },
      {
        title: '📋 Pitch Deck Template Released for Day 2',
        content: 'Check the evaluation rubric and structure your 6-slide idea pitch: Problem -> Solution -> Target Users -> USP -> Business Potential -> Impact.',
        priority: 'NORMAL',
        targetRole: 'STUDENT',
        createdBy: 'Faculty Coordinator',
      },
      {
        title: '🏆 Ratan Tata Innovation Hub Mentorship Sessions Announced',
        content: 'Top 5 teams will receive direct incubation support and seed grant guidance from Ratan Tata Innovation Hub mentors on Day 5.',
        priority: 'NORMAL',
        targetRole: 'ALL',
        createdBy: 'Admin',
      },
    ],
  })

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
