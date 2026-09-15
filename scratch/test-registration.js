const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function testRegistration() {
  console.log('🧪 Testing dummy team registration...')

  const teamCode = 'IW-2026-9999'
  const teamName = 'Test Persistent Innovators'
  const leaderEmail = 'testleader@student.srisivani.ac.in'
  const generatedPassword = 'IW-TEST-99'

  try {
    // 1. Create Team User
    const user = await prisma.user.upsert({
      where: { email: leaderEmail },
      update: { passwordHash: generatedPassword },
      create: {
        email: leaderEmail,
        name: 'Test Leader',
        passwordHash: generatedPassword,
        role: 'STUDENT',
      },
    })

    // 2. Create Team in DB
    const team = await prisma.team.create({
      data: {
        teamCode,
        name: teamName,
        size: 3,
        status: 'PENDING',
        paymentStatus: 'CASH_PENDING',
        currentStep: 1,
        members: {
          create: [
            {
              isLeader: true,
              name: 'Test Leader',
              rollNumber: 'TEST01',
              branch: 'CSE',
              year: '3rd Year',
              email: leaderEmail,
              phone: '9876543210',
            },
            {
              isLeader: false,
              name: 'Test Member 2',
              rollNumber: 'TEST02',
              branch: 'CSE',
              year: '3rd Year',
              email: 'testmember2@student.srisivani.ac.in',
              phone: '9876543211',
            },
            {
              isLeader: false,
              name: 'Test Member 3',
              rollNumber: 'TEST03',
              branch: 'AIML',
              year: '3rd Year',
              email: 'testmember3@student.srisivani.ac.in',
              phone: '9876543212',
            },
          ],
        },
        payments: {
          create: {
            orderId: `ORD-${teamCode}-TEST`,
            provider: 'OFFLINE_CASH',
            amount: 200,
            status: 'PENDING',
          },
        },
      },
    })

    await prisma.user.update({
      where: { id: user.id },
      data: { teamId: team.id },
    })

    // Save backup JSON entry
    const newEntry = {
      teamCode,
      teamName,
      paymentMethod: 'CASH',
      utr: null,
      screenshotData: null,
      membersList: [
        { isLeader: true, name: 'Test Leader', rollNumber: 'TEST01', branch: 'CSE', year: '3rd Year', email: leaderEmail, phone: '9876543210' },
        { isLeader: false, name: 'Test Member 2', rollNumber: 'TEST02', branch: 'CSE', year: '3rd Year', email: 'testmember2@student.srisivani.ac.in', phone: '9876543211' },
        { isLeader: false, name: 'Test Member 3', rollNumber: 'TEST03', branch: 'AIML', year: '3rd Year', email: 'testmember3@student.srisivani.ac.in', phone: '9876543212' },
      ],
      generatedPassword,
      createdAt: new Date().toISOString(),
    }

    const backupPaths = [
      path.join(__dirname, '..', 'prisma', 'persistent_teams.json'),
      '/tmp/registrations_backup.json',
    ]

    for (const bp of backupPaths) {
      try {
        let existing = []
        if (fs.existsSync(bp)) {
          existing = JSON.parse(fs.readFileSync(bp, 'utf8') || '[]')
        }
        existing.push(newEntry)
        fs.writeFileSync(bp, JSON.stringify(existing, null, 2))
      } catch {}
    }

    console.log('✅ Test team successfully created!')
    console.log(`Team Code: ${teamCode} | Name: ${teamName} | Leader Email: ${leaderEmail} | Password: ${generatedPassword}`)

    // Query stats
    const totalTeams = await prisma.team.count()
    const totalMembers = await prisma.teamMember.count()
    console.log(`📊 DB Stats after registration: TEAMS = ${totalTeams}, MEMBERS = ${totalMembers}`)
  } catch (e) {
    console.error('❌ Test registration error:', e)
  } finally {
    await prisma.$disconnect()
  }
}

testRegistration()
