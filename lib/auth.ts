import { cookies } from 'next/headers'
import { db } from './db'
import { SessionUser } from './types'

const AUTH_COOKIE_NAME = 'iw2026_session'

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME)?.value
    if (!sessionCookie) return null

    const user = await db.user.findUnique({
      where: { id: sessionCookie },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        teamId: true,
      },
    })

    if (!user) return null

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as SessionUser['role'],
      teamId: user.teamId,
    }
  } catch (error) {
    console.error('Session retrieval error:', error)
    return null
  }
}

export async function createSession(userId: string) {
  const cookieStore = await cookies()
  cookieStore.set(AUTH_COOKIE_NAME, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete(AUTH_COOKIE_NAME)
}
