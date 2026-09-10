import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { teamId, type, description, techStack, githubUrl, demoUrl, screenshots } = await request.json()

    if (!teamId || !type || !description) {
      return NextResponse.json({ error: 'Missing required prototype details' }, { status: 400 })
    }

    const submission = await db.prototypeSubmission.upsert({
      where: { teamId },
      update: {
        type,
        description,
        techStack: techStack || 'TypeScript, React, Python',
        githubUrl,
        demoUrl,
        screenshots,
      },
      create: {
        teamId,
        type,
        description,
        techStack: techStack || 'TypeScript, React, Python',
        githubUrl,
        demoUrl,
        screenshots,
      },
    })

    await db.team.update({
      where: { id: teamId },
      data: { currentStep: Math.max(4, 4) },
    })

    return NextResponse.json({ success: true, submission })
  } catch (error) {
    console.error('Prototype submission error:', error)
    return NextResponse.json({ error: 'Failed to submit prototype' }, { status: 500 })
  }
}
