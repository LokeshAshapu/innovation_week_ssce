import { NextResponse } from 'next/server'
import { db, ensureTablesExist } from '@/lib/db'

export async function POST(request: Request) {
  try {
    await ensureTablesExist()
    const body = await request.json()
    const { teamId, awardType } = body

    if (!teamId || !awardType) {
      return NextResponse.json(
        { error: 'Missing teamId or awardType parameters.' },
        { status: 400 }
      )
    }

    const team = await db.team.findUnique({
      where: { id: teamId },
      include: { members: true, certificates: true },
    })

    if (!team) {
      return NextResponse.json(
        { error: 'Team not found.' },
        { status: 404 }
      )
    }

    let certCounter = 1000 + (await db.certificate.count())
    const updatedCerts: any[] = []

    for (const member of team.members) {
      let cert = team.certificates.find((c) => c.rollNumber === member.rollNumber)
      if (cert) {
        cert = await db.certificate.update({
          where: { id: cert.id },
          data: { awardType },
        })
      } else {
        certCounter++
        const certCode = `CERT-IW2026-${certCounter}`
        cert = await db.certificate.create({
          data: {
            teamId: team.id,
            studentName: member.name,
            rollNumber: member.rollNumber,
            awardType,
            certCode,
          },
        })
      }
      updatedCerts.push(cert)
    }

    return NextResponse.json({
      success: true,
      teamId: team.id,
      teamName: team.name,
      awardType,
      certificates: updatedCerts,
    })
  } catch (error) {
    console.error('Error in set-team-award API route:', error)
    return NextResponse.json(
      { error: `Failed to set team award: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    )
  }
}
