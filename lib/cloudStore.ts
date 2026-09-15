import fs from 'fs'
import path from 'path'

const STORE_OBJECT_ID = 'ff808181a09d98f701a0a5afb71511bb'
const STORE_URL = `https://api.restful-api.dev/objects/${STORE_OBJECT_ID}`

export interface PersistentTeamRecord {
  teamCode: string
  teamName: string
  paymentMethod: string
  utr?: string | null
  screenshotData?: string | null
  membersList: Array<{
    name: string
    rollNumber: string
    branch: string
    diplomaBranch?: string | null
    year: string
    email?: string | null
    phone?: string | null
    isLeader?: boolean
  }>
  generatedPassword?: string
  loginEmail?: string
  createdAt?: string
}

export async function fetchTeamsFromCloudStore(): Promise<PersistentTeamRecord[]> {
  const teams: PersistentTeamRecord[] = []

  // 1. Try fetching from Cloud Store API
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4000)

    const res = await fetch(STORE_URL, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
      cache: 'no-store',
    })
    clearTimeout(timeoutId)

    if (res.ok) {
      const payload = await res.json()
      if (payload?.data?.teams && Array.isArray(payload.data.teams)) {
        return payload.data.teams
      }
    }
  } catch (err) {
    console.warn('[CloudStore] Cloud fetch notice:', err)
  }

  // 2. Fallback: Read local backup JSON files
  const candidatePaths = [
    path.join(process.cwd(), 'prisma', 'persistent_teams.json'),
    path.join(process.cwd(), 'persistent_teams.json'),
    '/tmp/registrations_backup.json',
  ]

  for (const p of candidatePaths) {
    try {
      if (fs.existsSync(p)) {
        const content = fs.readFileSync(p, 'utf8')
        const parsed = JSON.parse(content || '[]')
        if (Array.isArray(parsed) && parsed.length > 0) {
          for (const item of parsed) {
            if (!teams.some((t) => t.teamCode === item.teamCode)) {
              teams.push(item)
            }
          }
        }
      }
    } catch {}
  }

  return teams
}

export async function saveTeamsToCloudStore(teams: PersistentTeamRecord[]): Promise<boolean> {
  // 1. Write to local backup JSON files first
  const candidatePaths = [
    '/tmp/registrations_backup.json',
    path.join(process.cwd(), 'prisma', 'persistent_teams.json'),
    path.join(process.cwd(), 'persistent_teams.json'),
  ]

  for (const p of candidatePaths) {
    try {
      fs.writeFileSync(p, JSON.stringify(teams, null, 2))
    } catch {}
  }

  // 2. Sync to Remote Cloud Store API
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const res = await fetch(STORE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: 'Innovation Week 2026 Production Teams Store',
        data: {
          teams,
          lastSyncedAt: new Date().toISOString(),
        },
      }),
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    return res.ok
  } catch (err) {
    console.warn('[CloudStore] Cloud save notice:', err)
    return false
  }
}
