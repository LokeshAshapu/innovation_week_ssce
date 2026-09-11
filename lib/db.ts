import { PrismaClient } from '@prisma/client'
import path from 'path'
import fs from 'fs'

function getDatabaseUrl() {
  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    const tmpDbPath = '/tmp/storage.db'
    try {
      if (!fs.existsSync(tmpDbPath)) {
        const origDbPath = path.join(process.cwd(), 'storage.db')
        if (fs.existsSync(origDbPath)) {
          fs.copyFileSync(origDbPath, tmpDbPath)
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

