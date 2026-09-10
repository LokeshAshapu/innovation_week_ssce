import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      teamId,
      startupName,
      problemStatement,
      proposedSolution,
      targetUsers,
      usp,
      businessPotential,
      impact,
      domain,
      techStack,
      pptUrl,
    } = body

    if (!teamId || !startupName || !problemStatement || !proposedSolution) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const submission = await db.ideaSubmission.upsert({
      where: { teamId },
      update: {
        startupName,
        problemStatement,
        proposedSolution,
        targetUsers,
        usp,
        businessPotential,
        impact,
        domain,
        techStack,
        pptUrl,
        status: 'SUBMITTED',
      },
      create: {
        teamId,
        startupName,
        problemStatement,
        proposedSolution,
        targetUsers,
        usp,
        businessPotential,
        impact,
        domain,
        techStack,
        pptUrl,
        status: 'SUBMITTED',
      },
    })

    await db.team.update({
      where: { id: teamId },
      data: { currentStep: Math.max(3, 3) },
    })

    return NextResponse.json({ success: true, submission })
  } catch (error) {
    console.error('Idea submission error:', error)
    return NextResponse.json({ error: 'Failed to submit idea' }, { status: 500 })
  }
}
