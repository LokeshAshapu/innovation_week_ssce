import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { title, content, priority, targetRole } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    const announcement = await db.announcement.create({
      data: {
        title,
        content,
        priority: priority || 'NORMAL',
        targetRole: targetRole || 'ALL',
        createdBy: 'Admin / Faculty Lead',
      },
    })

    return NextResponse.json({ success: true, announcement })
  } catch (error) {
    console.error('Announcement create error:', error)
    return NextResponse.json({ error: 'Failed to create announcement' }, { status: 500 })
  }
}
