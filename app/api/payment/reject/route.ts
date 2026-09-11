import { NextResponse } from 'next/server'
import { PaymentService } from '@/lib/payment'
import { getSession } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session || !['ADMIN', 'COORDINATOR', 'FACULTY'].includes(session.role)) {
      return NextResponse.json({ error: 'Unauthorized. Admin or coordinator access required.' }, { status: 403 })
    }

    const { paymentId, reason } = await request.json()

    if (!paymentId) {
      return NextResponse.json({ error: 'Payment ID is required' }, { status: 400 })
    }

    const updatedPayment = await PaymentService.adminRejectPayment(paymentId, reason)

    return NextResponse.json({
      success: true,
      message: 'Payment rejected successfully.',
      payment: updatedPayment,
    })
  } catch (error) {
    console.error('Payment rejection error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Rejection failed' },
      { status: 400 }
    )
  }
}
