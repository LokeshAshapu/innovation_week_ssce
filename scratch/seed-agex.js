const fs = require('fs')
const path = require('path')
const { PrismaClient } = require('@prisma/client')

const teamAgex = {
  teamCode: 'IW-2026-1001',
  teamName: 'Team Agex',
  paymentMethod: 'CASH',
  utr: null,
  screenshotData: null,
  membersList: [
    { name: 'Lokesh', rollNumber: '23W61A0506', branch: 'CSE', year: '4th Year', email: 'lokeshashapu@gmail.com', phone: '8790846260', isLeader: true },
    { name: 'Divya', rollNumber: '23W61A0515', branch: 'CSE', year: '4th Year', email: null, phone: null, isLeader: false },
    { name: 'Vinay', rollNumber: '23W61A0518', branch: 'CSE', year: '4th Year', email: null, phone: null, isLeader: false }
  ],
  createdAt: new Date().toISOString()
}

fs.writeFileSync(path.join(__dirname, '..', 'prisma', 'persistent_teams.json'), JSON.stringify([teamAgex], null, 2))

const db = new PrismaClient()

async function main() {
  const exists = await db.team.findFirst({ where: { teamCode: 'IW-2026-1001' } })
  if (!exists) {
    await db.team.create({
      data: {
        teamCode: 'IW-2026-1001',
        name: 'Team Agex',
        size: 3,
        status: 'PENDING',
        paymentStatus: 'CASH_PENDING',
        currentStep: 1,
        members: {
          create: teamAgex.membersList.map((m, idx) => ({
            isLeader: idx === 0,
            name: m.name,
            rollNumber: m.rollNumber,
            branch: m.branch,
            year: m.year,
            email: m.email,
            phone: m.phone
          }))
        },
        payments: {
          create: {
            orderId: 'ORD-IW-2026-1001-1001',
            provider: 'OFFLINE_CASH',
            amount: 200,
            status: 'PENDING'
          }
        }
      }
    })
    console.log('Successfully inserted Team Agex into DB!')
  } else {
    console.log('Team Agex already exists in DB.')
  }
}

main().catch(console.error).finally(async () => {
  await db.$disconnect()
})
