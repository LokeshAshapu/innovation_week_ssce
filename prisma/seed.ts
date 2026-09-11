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
      date: 'Day 1 (Monday)',
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
      date: 'Day 2 (Tuesday)',
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
      date: 'Day 3 (Wednesday)',
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
      date: 'Day 4 (Thursday)',
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
      date: 'Day 5 (Friday)',
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

  // 6. Sample Teams (10 realistic teams across CSE, AIML, ECE, EEE, MECH, CIVIL, Diploma)
  const sampleTeamsData = [
    {
      code: 'IW-2026-1001',
      name: 'AgriSense AI',
      leaderName: 'A. Lokesh',
      leaderRoll: '22CS1A0501',
      branch: 'CSE',
      year: '3rd Year',
      startupName: 'AgriSense AI Solutions',
      domain: 'AI & Smart Agriculture',
      problem: 'Small farmers lose 30-40% of crop yield due to unpredicted pest attacks and soil nutrient deficiencies in North Coastal AP.',
      solution: 'IoT soil sensor nodes combined with a multilingual AI mobile app that provides real-time crop disease diagnosis from camera photos.',
      usp: 'Low-cost offline AI model working in Telugu audio format for rural farmers.',
      score: 91.5,
      award: 'WINNER',
    },
    {
      code: 'IW-2026-1002',
      name: 'NeuroHealth Bot',
      leaderName: 'K. Hareesh',
      leaderRoll: '22AI1A0502',
      branch: 'AIML',
      year: '3rd Year',
      startupName: 'NeuroCare Diagnostics',
      domain: 'Healthcare & AI',
      problem: 'Delayed detection of early-stage neurological tremors and stroke symptoms in primary health centers.',
      solution: 'Computer vision web tool that analyzes hand stability and speech patterns using webcams for preliminary triage.',
      usp: 'Instant screening under 30 seconds with 94% validated accuracy.',
      score: 87.0,
      award: 'RUNNER_UP',
    },
    {
      code: 'IW-2026-1003',
      name: 'EcoGrid Tech',
      leaderName: 'B. Yogeswari',
      leaderRoll: '23EC1A0401',
      branch: 'ECE',
      year: '2nd Year',
      startupName: 'EcoGrid Smart Energy',
      domain: 'Clean Tech & Renewable Energy',
      problem: 'High electricity wastage in college hostels and lab buildings due to unmonitored lighting and AC loads.',
      solution: 'Smart retrofitted relay switches with micro-grid energy metering dashboard.',
      usp: 'Non-invasive clamp sensors that install in under 10 minutes per distribution board.',
      score: 83.5,
      award: 'SECOND_RUNNER_UP',
    },
    {
      code: 'IW-2026-1004',
      name: 'PolyCraft Diploma Innovators',
      leaderName: 'K. Raghavendra',
      leaderRoll: '21DIP101',
      branch: 'Diploma',
      diplomaBranch: 'Diploma Mechanical & Automation',
      year: '3rd Year',
      startupName: 'PolyCraft Auto-Welder',
      domain: 'Hardware & Automation',
      problem: 'Manual welding errors in small rural fabrication workshops causing structural failures.',
      solution: 'Portable 3-axis mini automated arc-welding jig with motorized wire feeder.',
      usp: 'Costs 80% less than imported robotic welding arms.',
      score: 81.0,
      award: 'BEST_PROTOTYPE',
    },
    {
      code: 'IW-2026-1005',
      name: 'AquaPurify Labs',
      leaderName: 'P. Sony',
      leaderRoll: '23CE1A0105',
      branch: 'CIVIL',
      year: '2nd Year',
      startupName: 'AquaClean Bio-Filters',
      domain: 'Environmental & Social Impact',
      problem: 'High fluorosis and ground water contamination in coastal villages around Srikakulam district.',
      solution: 'Low-cost bio-char and coconut shell activated carbon gravity water purifiers for household use.',
      usp: 'Zero electricity needed, maintenance cost under ₹50/month.',
      score: 84.0,
      award: 'BEST_IMPACT',
    },
    {
      code: 'IW-2026-1006',
      name: 'FleetTrack Logistics',
      leaderName: 'R. Dileep',
      leaderRoll: '22ME1A0302',
      branch: 'MECH',
      year: '3rd Year',
      startupName: 'SmartFleet Logistics',
      domain: 'Logistics & Supply Chain',
      problem: 'Local freight drivers suffer fuel theft and inaccurate route tracking during long inter-city runs.',
      solution: 'GPS + fuel level ultrasonic sensor telemetry box with real-time whatsapp alerts for fleet owners.',
      usp: 'Integrated anti-tamper fuel cap alarm system.',
      score: 79.5,
      award: 'BEST_BUSINESS',
    },
    {
      code: 'IW-2026-1007',
      name: 'CyberShield Edu',
      leaderName: 'B. Amrutha',
      leaderRoll: '24CS1A0512',
      branch: 'CSE',
      year: '1st Year',
      startupName: 'CyberGuard Academy',
      domain: 'EdTech & Cybersecurity',
      problem: 'Lack of practical hands-on phishing defense training for non-technical college staff.',
      solution: 'Gamified phishing simulator web portal that trains staff through realistic simulated email attacks.',
      usp: 'Automated regional language bite-sized micro-learning modules.',
      score: 76.0,
      award: 'PARTICIPATION',
    },
    {
      code: 'IW-2026-1008',
      name: 'ChargeMobility',
      leaderName: 'K. Sharvan',
      leaderRoll: '22EE1A0208',
      branch: 'EEE',
      year: '3rd Year',
      startupName: 'ChargeMobilityEV',
      domain: 'EV Infrastructure',
      problem: 'Scarcity of charging points for two-wheeler EV delivery executives in Tier-2 and Tier-3 towns.',
      solution: 'Peer-to-peer EV battery swapping station network for local kirana store owners.',
      usp: 'Plug-and-play AC charger setup with UPI pay-per-use kiosk.',
      score: 82.5,
      award: 'BEST_TECH',
    },
    {
      code: 'IW-2026-1009',
      name: 'MedAssist AI',
      leaderName: 'Rami Naidu',
      leaderRoll: '23AI1A0540',
      branch: 'AIML',
      year: '2nd Year',
      startupName: 'MedAssist Prescription AI',
      domain: 'Healthcare IT',
      problem: 'Doctor handwriting misinterpretation leading to medication errors at local pharmacies.',
      solution: 'OCR handwriting parser trained on regional medical prescriptions that outputs structured drug lists.',
      usp: 'High accuracy on cursive Indian doctor handwriting.',
      score: 78.0,
      award: 'PARTICIPATION',
    },
    {
      code: 'IW-2026-1010',
      name: 'MediWaste Trace',
      leaderName: 'B. Prasad',
      leaderRoll: '22CS1A0599',
      branch: 'CSE',
      year: '3rd Year',
      startupName: 'CleanMed Waste Tracker',
      domain: 'Health & Sanitation',
      problem: 'Illegal dumping of bio-medical waste from small clinics without chain-of-custody tracking.',
      solution: 'QR-tagged bio-waste bag scanning app with GPS timestamp verification for waste disposal contractors.',
      usp: 'Tamper-proof audit logs for municipal health compliance.',
      score: 77.5,
      award: 'PARTICIPATION',
    },
  ]

  let orderCounter = 1

  for (const tData of sampleTeamsData) {
    // Create Team Leader User
    const userEmail = `${tData.name.toLowerCase().replace(/[^a-z0-9]/g, '')}@student.srisivani.ac.in`
    const user = await prisma.user.create({
      data: {
        email: userEmail,
        name: tData.leaderName,
        passwordHash: 'student123',
        role: 'STUDENT',
      },
    })

    // Create Team
    const team = await prisma.team.create({
      data: {
        teamCode: tData.code,
        name: tData.name,
        size: 4,
        status: 'APPROVED',
        paymentStatus: 'SUCCESS',
        currentStep: 5,
        members: {
          create: [
            {
              isLeader: true,
              name: tData.leaderName,
              rollNumber: tData.leaderRoll,
              branch: tData.branch,
              diplomaBranch: tData.diplomaBranch,
              year: tData.year,
              email: userEmail,
              phone: '6301451462',
            },
            {
              isLeader: false,
              name: `${tData.leaderName.split(' ')[0]} Member 2`,
              rollNumber: `${tData.code.replace('IW-2026-', 'RN')}-02`,
              branch: tData.branch,
              diplomaBranch: tData.diplomaBranch,
              year: tData.year,
              email: `m2_${tData.code.toLowerCase()}@student.srisivani.ac.in`,
              phone: '9876543211',
            },
            {
              isLeader: false,
              name: `${tData.leaderName.split(' ')[0]} Member 3`,
              rollNumber: `${tData.code.replace('IW-2026-', 'RN')}-03`,
              branch: tData.branch,
              diplomaBranch: tData.diplomaBranch,
              year: tData.year,
              email: `m3_${tData.code.toLowerCase()}@student.srisivani.ac.in`,
              phone: '9876543212',
            },
            {
              isLeader: false,
              name: `${tData.leaderName.split(' ')[0]} Member 4`,
              rollNumber: `${tData.code.replace('IW-2026-', 'RN')}-04`,
              branch: tData.branch,
              diplomaBranch: tData.diplomaBranch,
              year: tData.year,
              email: `m4_${tData.code.toLowerCase()}@student.srisivani.ac.in`,
              phone: '9876543213',
            },
          ],
        },
      },
    })

    // Link user to team
    await prisma.user.update({
      where: { id: user.id },
      data: { teamId: team.id },
    })

    // Create Verified Payment
    await prisma.payment.create({
      data: {
        teamId: team.id,
        orderId: `ORD-${tData.code}`,
        provider: 'UPI_INTENT',
        amount: 500,
        transactionId: `TXN${Math.floor(100000000 + Math.random() * 900000000)}`,
        utr: `UTR${Math.floor(100000000000 + Math.random() * 900000000000)}`,
        status: 'SUCCESS',
        verifiedAt: new Date(),
      },
    })

    // Create Submissions (Day 2 to Day 4)
    await prisma.ideaSubmission.create({
      data: {
        teamId: team.id,
        startupName: tData.startupName,
        problemStatement: tData.problem,
        proposedSolution: tData.solution,
        targetUsers: 'Local businesses, farmers & institutions in Srikakulam region',
        usp: tData.usp,
        businessPotential: 'High scalability with B2B & subscription revenue stream',
        impact: 'Improves efficiency and economic output for local community',
        domain: tData.domain,
        techStack: 'React, Next.js, Node.js, Python, IoT/Hardware',
        pptUrl: `/docs/sample_pitch_${tData.code}.pdf`,
        status: 'APPROVED',
      },
    })

    await prisma.prototypeSubmission.create({
      data: {
        teamId: team.id,
        type: tData.branch === 'Diploma' ? 'Hardware model' : 'Software application',
        description: `Working prototype demonstration for ${tData.startupName}.`,
        techStack: 'TypeScript, Tailwind CSS, Python, SQLite/PostgreSQL',
        githubUrl: `https://github.com/srisivani-innovation/${tData.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
        demoUrl: `https://${tData.name.toLowerCase().replace(/[^a-z0-9]/g, '')}-demo.vercel.app`,
        mentorFeedback: 'Excellent initial proof of concept. Refine UI workflow for pitch finale.',
      },
    })

    await prisma.mVPSubmission.create({
      data: {
        teamId: team.id,
        description: `Minimum Viable Product release candidate for ${tData.startupName}.`,
        features: 'Core authentication, main problem-solving dashboard, real-time alert triggers, reporting export.',
        validationResults: 'Tested with 15 pilot users during Day 4 validation sprint. 92% satisfaction score.',
        improvements: 'Added multilingual Telugu interface option based on user feedback.',
        demoUrl: `https://${tData.name.toLowerCase().replace(/[^a-z0-9]/g, '')}-demo.vercel.app`,
        repoUrl: `https://github.com/srisivani-innovation/${tData.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      },
    })

    await prisma.pitchSubmission.create({
      data: {
        teamId: team.id,
        startupName: tData.startupName,
        problem: tData.problem,
        solution: tData.solution,
        targetCustomer: 'Tier-2/3 District Enterprises and Regional Consumers',
        marketOpportunity: 'Estimated TAM ₹50 Cr in Andhra Pradesh district hubs',
        competitors: 'Traditional manual vendors & costly metro solutions',
        usp: tData.usp,
        revenueModel: 'Freemium / Monthly SaaS subscription fee',
        futureScope: 'Expand pilot across North Coastal AP districts',
        impact: 'Direct economic boost and employment generation',
        pitchDeckUrl: `/docs/sample_pitch_${tData.code}.pdf`,
      },
    })

    // Create Jury Evaluation
    await prisma.evaluation.create({
      data: {
        teamId: team.id,
        evaluatorId: evaluator1.id,
        evaluatorName: evaluator1.name,
        scoreInnovation: (tData.score * 0.20),
        scoreProblem: (tData.score * 0.15),
        scoreTechnical: (tData.score * 0.15),
        scoreMVP: (tData.score * 0.20),
        scoreMarket: (tData.score * 0.15),
        scoreTeamwork: (tData.score * 0.10),
        scoreImpact: (tData.score * 0.05),
        totalScore: tData.score,
        feedback: `Strong presentation by ${tData.leaderName}. ${tData.usp} is commendable.`,
      },
    })

    // Presentation Queue
    await prisma.presentationQueue.create({
      data: {
        teamId: team.id,
        presentationOrder: orderCounter++,
        status: orderCounter === 2 ? 'PRESENTING' : orderCounter < 2 ? 'COMPLETED' : 'WAITING',
      },
    })

    // Certificates
    await prisma.certificate.create({
      data: {
        teamId: team.id,
        studentName: tData.leaderName,
        rollNumber: tData.leaderRoll,
        awardType: tData.award,
        certCode: `CERT-IW26-${tData.code.split('-')[2]}-01`,
      },
    })
  }

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
