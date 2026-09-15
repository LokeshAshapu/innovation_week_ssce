const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function clearDatabase() {
  console.log('🧹 Clearing all dummy teams and test data...')

  try {
    // 1. Delete all student activity and team data
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

    // 2. Delete non-admin / non-faculty users
    await prisma.user.deleteMany({
      where: {
        role: 'STUDENT',
      },
    })

    // 3. Ensure Admin & Faculty Accounts exist
    await prisma.user.upsert({
      where: { email: 'admin@srisivani.ac.in' },
      update: { role: 'ADMIN' },
      create: {
        email: 'admin@srisivani.ac.in',
        name: 'Dr. Head of Department',
        passwordHash: 'admin123',
        role: 'ADMIN',
      },
    })

    await prisma.user.upsert({
      where: { email: 'faculty@srisivani.ac.in' },
      update: { role: 'FACULTY' },
      create: {
        email: 'faculty@srisivani.ac.in',
        name: 'Prof. Janaki Bhai',
        passwordHash: 'faculty123',
        role: 'FACULTY',
      },
    })

    // 4. Ensure Default Event Settings
    await prisma.eventSettings.upsert({
      where: { id: '1' },
      update: {
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
      create: {
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

    // 5. Clear backup JSON files
    const backupPaths = [
      path.join(__dirname, '..', 'prisma', 'persistent_teams.json'),
      path.join(__dirname, '..', 'persistent_teams.json'),
      '/tmp/registrations_backup.json',
    ]

    for (const bp of backupPaths) {
      try {
        fs.writeFileSync(bp, JSON.stringify([], null, 2))
        console.log(`Cleared backup file: ${bp}`)
      } catch (fErr) {
        console.warn(`Could not clear backup file ${bp}:`, fErr)
      }
    }

    console.log('✅ Database successfully cleared! TEAMS: 0, STUDENTS: 0.')
  } catch (err) {
    console.error('❌ Error clearing database:', err)
  } finally {
    await prisma.$disconnect()
  }
}

clearDatabase()
