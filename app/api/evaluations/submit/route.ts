import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session || !['EVALUATOR', 'ADMIN', 'FACULTY', 'COORDINATOR'].includes(session.role)) {
      return NextResponse.json({ error: 'Unauthorized evaluator access' }, { status: 403 })
    }

    const {
      teamId,
      scoreInnovation,
      scoreProblem,
      scoreTechnical,
      scoreMVP,
      scoreMarket,
      scoreTeamwork,
      scoreImpact,
      feedback,
    } = await request.json()

    if (!teamId) {
      return NextResponse.json({ error: 'Team ID required' }, { status: 400 })
    }

    const totalScore =
      Number(scoreInnovation || 0) +
      Number(scoreProblem || 0) +
      Number(scoreTechnical || 0) +
      Number(scoreMVP || 0) +
      Number(scoreMarket || 0) +
      Number(scoreTeamwork || 0) +
      Number(scoreImpact || 0)

    const evaluation = await db.evaluation.create({
      data: {
        teamId,
        evaluatorId: session.id,
        evaluatorName: session.name,
        scoreInnovation: Number(scoreInnovation || 0),
        scoreProblem: Number(scoreProblem || 0),
        scoreTechnical: Number(scoreTechnical || 0),
        scoreMVP: Number(scoreMVP || 0),
        scoreMarket: Number(scoreMarket || 0),
        scoreTeamwork: Number(scoreTeamwork || 0),
        scoreImpact: Number(scoreImpact || 0),
        totalScore,
        feedback: feedback || '',
      },
    })

    return NextResponse.json({ success: true, evaluation, totalScore })
  } catch (error) {
    console.error('Evaluation submit error:', error)
    return NextResponse.json({ error: 'Failed to record jury evaluation' }, { status: 500 })
  }
}
