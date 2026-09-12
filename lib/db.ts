import { PrismaClient } from '@prisma/client'
import path from 'path'
import fs from 'fs'

function getDatabaseUrl() {
  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    const tmpDbPath = '/tmp/storage.db'
    try {
      if (!fs.existsSync(tmpDbPath)) {
        const candidatePaths = [
          path.join(process.cwd(), 'prisma', 'storage.db'),
          path.join(process.cwd(), 'storage.db'),
          path.join(process.cwd(), 'prisma', 'dev.db'),
        ]
        for (const candidate of candidatePaths) {
          if (fs.existsSync(candidate)) {
            fs.copyFileSync(candidate, tmpDbPath)
            break
          }
        }
      }
      return `file:${tmpDbPath}`
    } catch (err) {
      console.warn('Vercel /tmp db copy notice:', err)
    }
  }
  return process.env.DATABASE_URL || 'file:./storage.db'
}

const activeDbUrl = getDatabaseUrl()
process.env.DATABASE_URL = activeDbUrl

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: activeDbUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

let isInitialized = false

export async function ensureTablesExist() {
  if (isInitialized) return
  try {
    const ddl = `
      CREATE TABLE IF NOT EXISTS "User" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "email" TEXT NOT NULL UNIQUE,
          "passwordHash" TEXT NOT NULL,
          "name" TEXT NOT NULL,
          "role" TEXT NOT NULL DEFAULT 'STUDENT',
          "teamId" TEXT,
          "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS "Team" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "teamCode" TEXT NOT NULL UNIQUE,
          "name" TEXT NOT NULL UNIQUE,
          "size" INTEGER NOT NULL DEFAULT 4,
          "status" TEXT NOT NULL DEFAULT 'PENDING',
          "paymentStatus" TEXT NOT NULL DEFAULT 'PENDING',
          "currentStep" INTEGER NOT NULL DEFAULT 1,
          "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS "TeamMember" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "teamId" TEXT NOT NULL,
          "isLeader" BOOLEAN NOT NULL DEFAULT 0,
          "name" TEXT NOT NULL,
          "rollNumber" TEXT NOT NULL UNIQUE,
          "branch" TEXT NOT NULL,
          "diplomaBranch" TEXT,
          "year" TEXT NOT NULL,
          "email" TEXT,
          "phone" TEXT,
          "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "Payment" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "teamId" TEXT NOT NULL,
          "orderId" TEXT NOT NULL UNIQUE,
          "provider" TEXT NOT NULL,
          "amount" REAL NOT NULL,
          "transactionId" TEXT,
          "utr" TEXT,
          "status" TEXT NOT NULL DEFAULT 'PENDING',
          "receiptUrl" TEXT,
          "screenshotData" TEXT,
          "rejectedReason" TEXT,
          "verifiedAt" DATETIME,
          "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "IdeaSubmission" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "teamId" TEXT NOT NULL UNIQUE,
          "startupName" TEXT NOT NULL,
          "problemStatement" TEXT NOT NULL,
          "proposedSolution" TEXT NOT NULL,
          "targetUsers" TEXT NOT NULL,
          "usp" TEXT NOT NULL,
          "businessPotential" TEXT NOT NULL,
          "impact" TEXT NOT NULL,
          "domain" TEXT NOT NULL,
          "techStack" TEXT,
          "pptUrl" TEXT,
          "status" TEXT NOT NULL DEFAULT 'SUBMITTED',
          "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "PrototypeSubmission" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "teamId" TEXT NOT NULL UNIQUE,
          "type" TEXT NOT NULL,
          "description" TEXT NOT NULL,
          "techStack" TEXT NOT NULL,
          "githubUrl" TEXT,
          "demoUrl" TEXT,
          "fileUrl" TEXT,
          "screenshots" TEXT,
          "mentorFeedback" TEXT,
          "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "MVPSubmission" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "teamId" TEXT NOT NULL UNIQUE,
          "description" TEXT NOT NULL,
          "features" TEXT NOT NULL,
          "currentUsers" TEXT,
          "validationResults" TEXT NOT NULL,
          "improvements" TEXT,
          "demoUrl" TEXT,
          "repoUrl" TEXT,
          "mvpFileUrl" TEXT,
          "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "PitchSubmission" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "teamId" TEXT NOT NULL UNIQUE,
          "startupName" TEXT NOT NULL,
          "problem" TEXT NOT NULL,
          "solution" TEXT NOT NULL,
          "targetCustomer" TEXT NOT NULL,
          "marketOpportunity" TEXT NOT NULL,
          "competitors" TEXT NOT NULL,
          "usp" TEXT NOT NULL,
          "revenueModel" TEXT NOT NULL,
          "futureScope" TEXT NOT NULL,
          "impact" TEXT NOT NULL,
          "pitchDeckUrl" TEXT,
          "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "Evaluation" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "teamId" TEXT NOT NULL,
          "evaluatorId" TEXT NOT NULL,
          "evaluatorName" TEXT NOT NULL,
          "scoreInnovation" REAL NOT NULL,
          "scoreProblem" REAL NOT NULL,
          "scoreTechnical" REAL NOT NULL,
          "scoreMVP" REAL NOT NULL,
          "scoreMarket" REAL NOT NULL,
          "scoreTeamwork" REAL NOT NULL,
          "scoreImpact" REAL NOT NULL,
          "totalScore" REAL NOT NULL,
          "feedback" TEXT,
          "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
          FOREIGN KEY ("evaluatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "PresentationQueue" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "teamId" TEXT NOT NULL UNIQUE,
          "presentationOrder" INTEGER NOT NULL DEFAULT 0,
          "status" TEXT NOT NULL DEFAULT 'WAITING',
          "timerStartedAt" DATETIME,
          "timerDuration" INTEGER NOT NULL DEFAULT 180,
          "isPaused" BOOLEAN NOT NULL DEFAULT 0,
          "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "Announcement" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "title" TEXT NOT NULL,
          "content" TEXT NOT NULL,
          "priority" TEXT NOT NULL DEFAULT 'NORMAL',
          "targetRole" TEXT NOT NULL DEFAULT 'ALL',
          "createdBy" TEXT NOT NULL,
          "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS "ProgrammeDay" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "dayNumber" INTEGER NOT NULL UNIQUE,
          "title" TEXT NOT NULL,
          "theme" TEXT NOT NULL,
          "date" TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "ProgrammeSession" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "dayId" TEXT NOT NULL,
          "timeSlot" TEXT NOT NULL,
          "sessionTitle" TEXT NOT NULL,
          "activityDetails" TEXT NOT NULL,
          "responsibility" TEXT NOT NULL,
          "expectedOutput" TEXT NOT NULL,
          FOREIGN KEY ("dayId") REFERENCES "ProgrammeDay" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "Certificate" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "teamId" TEXT NOT NULL,
          "studentName" TEXT NOT NULL,
          "rollNumber" TEXT NOT NULL UNIQUE,
          "awardType" TEXT NOT NULL,
          "certCode" TEXT NOT NULL UNIQUE,
          "issuedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "EventSettings" (
          "id" TEXT NOT NULL PRIMARY KEY DEFAULT '1',
          "eventName" TEXT NOT NULL DEFAULT 'Innovation Week 2026',
          "collegeName" TEXT NOT NULL DEFAULT 'Sri Sivani College of Engineering (Autonomous), Srikakulam',
          "deptName" TEXT NOT NULL DEFAULT 'Department of CSE & AI-ML',
          "regFee" REAL NOT NULL DEFAULT 500,
          "upiId" TEXT NOT NULL DEFAULT 'srisivani.cse@upi',
          "recipientName" TEXT NOT NULL DEFAULT 'Sri Sivani Innovation Week',
          "phonePeEnabled" BOOLEAN NOT NULL DEFAULT 1,
          "regOpen" BOOLEAN NOT NULL DEFAULT 1,
          "resultsPublished" BOOLEAN NOT NULL DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS "Attendance" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "teamId" TEXT NOT NULL,
          "memberId" TEXT NOT NULL,
          "dayNumber" INTEGER NOT NULL,
          "status" TEXT NOT NULL DEFAULT 'PRESENT',
          "markedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
          FOREIGN KEY ("memberId") REFERENCES "TeamMember" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "AuditLog" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "userId" TEXT NOT NULL,
          "action" TEXT NOT NULL,
          "entity" TEXT NOT NULL,
          "entityId" TEXT,
          "details" TEXT,
          "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
      );
    `
    const statements = ddl.split(';').map((s) => s.trim()).filter((s) => s.length > 0)
    for (const stmt of statements) {
      await db.$executeRawUnsafe(stmt).catch((err) => console.warn('DDL init stmt note:', err))
    }

    // Re-hydrate persistent registrations if available
    try {
      const candidatePaths = [
        path.join(process.cwd(), 'prisma', 'persistent_teams.json'),
        path.join(process.cwd(), 'persistent_teams.json'),
        '/tmp/registrations_backup.json',
      ]
      let combinedList: any[] = []
      for (const p of candidatePaths) {
        if (fs.existsSync(p)) {
          try {
            const fileContent = fs.readFileSync(p, 'utf8')
            const parsed = JSON.parse(fileContent || '[]')
            if (Array.isArray(parsed)) {
              combinedList = [...combinedList, ...parsed]
            }
          } catch {}
        }
      }

      for (const item of combinedList) {
        const exists = await db.team.findFirst({ where: { teamCode: item.teamCode } })
        if (!exists && item.membersList && item.membersList.length >= 3) {
          const isCash = item.paymentMethod === 'CASH'
          await db.team.create({
            data: {
              teamCode: item.teamCode,
              name: item.teamName,
              size: item.membersList.length,
              status: 'PENDING',
              paymentStatus: isCash ? 'CASH_PENDING' : 'VERIFICATION_REQUIRED',
              currentStep: 1,
              members: {
                create: item.membersList.map((m: any, idx: number) => ({
                  isLeader: m.isLeader !== undefined ? m.isLeader : idx === 0,
                  name: m.name.trim(),
                  rollNumber: m.rollNumber.trim().toUpperCase(),
                  branch: m.branch,
                  diplomaBranch: m.diplomaBranch || null,
                  year: m.year,
                  email: m.email || null,
                  phone: m.phone || null,
                })),
              },
              payments: {
                create: {
                  orderId: `ORD-${item.teamCode}-${Date.now().toString().slice(-4)}`,
                  provider: isCash ? 'OFFLINE_CASH' : 'PHONEPE_UPI',
                  amount: 200,
                  utr: item.utr || null,
                  receiptUrl: item.screenshotData || null,
                  screenshotData: item.screenshotData || null,
                  status: isCash ? 'PENDING' : 'VERIFICATION_REQUIRED',
                },
              },
            },
          }).catch((err) => console.warn('Rehydrate team note:', err))
        }
      }
    } catch (rErr) {
      console.warn('Backup rehydrate notice:', rErr)
    }

    // Clean out any legacy seed dummy teams if present
    try {
      const dummyNames = [
        'AgriSense AI',
        'NeuroHealth Bot',
        'EcoGrid Tech',
        'PolyCraft Diploma Innovators',
        'AquaPurify Labs',
        'FleetTrack Logistics',
        'CyberShield Edu',
        'ChargeMobility',
        'MedAssist AI',
        'MediWaste Trace',
      ]
      await db.team
        .deleteMany({
          where: { name: { in: dummyNames } },
        })
        .catch(() => null)
    } catch (e) {
      console.warn('Purge dummy note:', e)
    }

    isInitialized = true
  } catch (e) {
    console.error('Failed to auto-create schema tables:', e)
  }
}


