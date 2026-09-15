import { NextResponse } from 'next/server'
import { destroySession } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    await destroySession()
    return NextResponse.json({ success: true, message: 'Logged out successfully' })
  } catch (error) {
    console.error('Logout route error:', error)
    return NextResponse.json({ success: true, message: 'Logged out' })
  }
}

export async function GET(request: Request) {
  return POST(request)
}
