import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { TeamRegistrationSchema } from '@/lib/types'
import { PaymentService } from '@/lib/payment'
import { createSession } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // 1. Zod schema validation
    const validationResult = TeamRegistrationSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validationResult.error.flatten() },
        { status: 400 }
      )
    }

    const { teamName, leader, member2, member3, member4 } = validationResult.data

    // Collect all members into an array (minimum 3, maximum 4)
    const membersList = [leader, member2, member3]
    if (member4 && member4.name && member4.rollNumber) {
      membersList.push(member4)
    }

    // 2. Duplicate Team Name Check
    const existingTeam = await db.team.findFirst({
      where: { name: { equals: teamName.trim() } },
    })

    if (existingTeam) {
      return NextResponse.json(
        { error: `Team name "${teamName}" is already registered. Please choose a unique team name.` },
        { status: 400 }
      )
    }

    // 3. Duplicate Roll Number Check within submission
    const rollNumbers = membersList.map((m) => m.rollNumber.trim().toUpperCase())
    const uniqueRollsInSubmission = new Set(rollNumbers)
    if (uniqueRollsInSubmission.size !== rollNumbers.length) {
      return NextResponse.json(
        { error: 'Duplicate roll numbers found within your team members.' },
        { status: 400 }
      )
    }

    // 4. Duplicate Roll Number Check against Database
    const existingMembers = await db.teamMember.findMany({
      where: {
        rollNumber: { in: rollNumbers },
      },
    })

    if (existingMembers.length > 0) {
      const duplicateRolls = existingMembers.map((m) => m.rollNumber).join(', ')
      return NextResponse.json(
        { error: `The following roll number(s) are already registered in another team: ${duplicateRolls}` },
        { status: 400 }
      )
    }

    // 5. Create Team Code (IW-2026-XXXX)
    const count = await db.team.count()
    const teamCode = `IW-2026-${1001 + count}`

    // 6. Create User Account for Team Leader
    const leaderEmail = leader.email && leader.email.trim() !== ''
      ? leader.email.trim().toLowerCase()
      : `${teamName.toLowerCase().replace(/[^a-z0-9]/g, '')}@student.srisivani.ac.in`

    let user = await db.user.findUnique({ where: { email: leaderEmail } })
    if (!user) {
      user = await db.user.create({
        data: {
          email: leaderEmail,
          name: leader.name,
          passwordHash: 'student123',
          role: 'STUDENT',
        },
      })
    }

    // 7. Create Team in DB
    const team = await db.team.create({
      data: {
        teamCode,
        name: teamName.trim(),
        size: membersList.length,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        currentStep: 1,
        members: {
          create: membersList.map((m, idx) => ({
            isLeader: idx === 0,
            name: m.name.trim(),
            rollNumber: m.rollNumber.trim().toUpperCase(),
            branch: m.branch,
            diplomaBranch: m.branch === 'Diploma' ? m.diplomaBranch : null,
            year: m.year,
            email: m.email || null,
            phone: m.phone || null,
          })),
        },
      },
    })

    // Link user to team
    await db.user.update({
      where: { id: user.id },
      data: { teamId: team.id },
    })

    // Auto-login team leader session
    await createSession(user.id)

    const { paymentMethod = 'PHONEPE', utr, receiptUrl } = body

    const isCash = paymentMethod === 'CASH'
    const regFee = Number(process.env.NEXT_PUBLIC_REGISTRATION_FEE || 200)

    // 8. Create Payment Record
    const orderId = `ORD-${teamCode}-${Date.now().toString().slice(-4)}`
    const payment = await db.payment.create({
      data: {
        teamId: team.id,
        orderId,
        provider: isCash ? 'OFFLINE_CASH' : 'PHONEPE_UPI',
        amount: regFee,
        utr: utr || null,
        receiptUrl: receiptUrl || null,
        status: isCash ? 'PENDING' : 'SUCCESS',
        verifiedAt: isCash ? null : new Date(),
      },
    })

    // Update Team Payment Status
    await db.team.update({
      where: { id: team.id },
      data: {
        paymentStatus: isCash ? 'CASH_PENDING' : 'SUCCESS',
        currentStep: isCash ? 1 : 2,
      },
    })

    // 9. Dispatch Styled Confirmation Email from lokeshashapu@gmail.com
    const { sendRegistrationEmail } = await import('@/lib/email')
    await sendRegistrationEmail({
      teamName: teamName.trim(),
      teamCode,
      paymentMethod: isCash ? 'CASH' : 'PHONEPE',
      utr: utr || undefined,
      receiptUrl: receiptUrl || undefined,
      members: membersList,
      amount: regFee,
    }).catch((emailErr) => {
      console.error('Failed to send confirmation email:', emailErr)
    })

    return NextResponse.json({
      success: true,
      teamId: team.id,
      teamCode: team.teamCode,
      orderId,
      amount: regFee,
      paymentMethod,
    })
  } catch (error) {
    console.error('Registration server error:', error)
    return NextResponse.json(
      { error: 'Server error during team registration. Please try again.' },
      { status: 500 }
    )
  }
}
