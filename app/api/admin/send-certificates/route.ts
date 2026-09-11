import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendCertificateEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const teams = await db.team.findMany({
      include: {
        members: true,
        certificates: true,
        ideaSubmission: true,
        evaluations: true,
      },
    })

    let totalStudents = 0
    let certsGenerated = 0
    let emailsSent = 0
    const dispatchResults: Array<{ studentName: string; rollNumber: string; email: string; certCode: string; status: string }> = []

    let certCounter = 1000 + (await db.certificate.count())

    for (const team of teams) {
      // Determine team award type if evaluated
      let defaultAward = 'PARTICIPATION'
      if (team.evaluations.length > 0) {
        const totalScoreAvg = team.evaluations.reduce((acc, curr) => acc + curr.totalScore, 0) / team.evaluations.length
        if (totalScoreAvg >= 90) defaultAward = 'WINNER'
        else if (totalScoreAvg >= 85) defaultAward = 'RUNNER_UP'
        else if (totalScoreAvg >= 80) defaultAward = 'SECOND_RUNNER_UP'
      }

      for (const member of team.members) {
        totalStudents++

        // Check if certificate already exists in DB
        let cert = team.certificates.find((c) => c.rollNumber === member.rollNumber)
        if (!cert) {
          certCounter++
          const certCode = `CERT-IW2026-${certCounter}`
          cert = await db.certificate.create({
            data: {
              teamId: team.id,
              studentName: member.name,
              rollNumber: member.rollNumber,
              awardType: defaultAward,
              certCode,
            },
          })
          certsGenerated++
        }

        // Email address to send certificate to
        const studentEmail = member.email || `${member.rollNumber.toLowerCase()}@student.srisivani.ac.in`

        const mailRes = await sendCertificateEmail({
          studentName: member.name,
          rollNumber: member.rollNumber,
          teamName: team.name,
          email: studentEmail,
          awardType: cert.awardType,
          certCode: cert.certCode,
          startupName: team.ideaSubmission?.startupName,
        })

        if (mailRes.success) {
          emailsSent++
          dispatchResults.push({
            studentName: member.name,
            rollNumber: member.rollNumber,
            email: studentEmail,
            certCode: cert.certCode,
            status: 'SENT',
          })
        } else {
          dispatchResults.push({
            studentName: member.name,
            rollNumber: member.rollNumber,
            email: studentEmail,
            certCode: cert.certCode,
            status: `FAILED (${mailRes.reason || mailRes.error})`,
          })
        }
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      summary: {
        totalTeams: teams.length,
        totalStudents,
        certsGenerated,
        emailsSent,
      },
      results: dispatchResults,
    })
  } catch (error) {
    console.error('Certificate dispatch API error:', error)
    return NextResponse.json(
      { error: `Certificate dispatch error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  return POST(request)
}
