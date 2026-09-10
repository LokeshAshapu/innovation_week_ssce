import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const {
      teamId,
      startupName,
      problem,
      solution,
      targetCustomer,
      marketOpportunity,
      competitors,
      usp,
      revenueModel,
      futureScope,
      impact,
      pitchDeckUrl,
    } = await request.json()

    if (!teamId || !startupName || !problem || !solution) {
      return NextResponse.json({ error: 'Missing required pitch deck fields' }, { status: 400 })
    }

    const submission = await db.pitchSubmission.upsert({
      where: { teamId },
      update: {
        startupName,
        problem,
        solution,
        targetCustomer: targetCustomer || 'General Users',
        marketOpportunity: marketOpportunity || 'Regional Market',
        competitors: competitors || 'Traditional Options',
        usp: usp || 'Unique features',
        revenueModel: revenueModel || 'Subscription',
        futureScope: futureScope || 'Scaling across AP',
        impact: impact || 'Community development',
        pitchDeckUrl,
      },
      create: {
        teamId,
        startupName,
        problem,
        solution,
        targetCustomer: targetCustomer || 'General Users',
        marketOpportunity: marketOpportunity || 'Regional Market',
        competitors: competitors || 'Traditional Options',
        usp: usp || 'Unique features',
        revenueModel: revenueModel || 'Subscription',
        futureScope: futureScope || 'Scaling across AP',
        impact: impact || 'Community development',
        pitchDeckUrl,
      },
    })

    return NextResponse.json({ success: true, submission })
  } catch (error) {
    console.error('Pitch submission error:', error)
    return NextResponse.json({ error: 'Failed to submit pitch' }, { status: 500 })
  }
}
