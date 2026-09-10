import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { teamId, description, features, currentUsers, validationResults, improvements, demoUrl, repoUrl } = await request.json()

    if (!teamId || !description || !features || !validationResults) {
      return NextResponse.json({ error: 'Missing required MVP details' }, { status: 400 })
    }

    const submission = await db.mVPSubmission.upsert({
      where: { teamId },
      update: {
        description,
        features,
        currentUsers,
        validationResults,
        improvements,
        demoUrl,
        repoUrl,
      },
      create: {
        teamId,
        description,
        features,
        currentUsers,
        validationResults,
        improvements,
        demoUrl,
        repoUrl,
      },
    })

    await db.team.update({
      where: { id: teamId },
      data: { currentStep: Math.max(5, 5) },
    })

    return NextResponse.json({ success: true, submission })
  } catch (error) {
    console.error('MVP submission error:', error)
    return NextResponse.json({ error: 'Failed to submit MVP' }, { status: 500 })
  }
}
