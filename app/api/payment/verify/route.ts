import { NextResponse } from 'next/server'
import { PaymentService } from '@/lib/payment'

export async function POST(request: Request) {
  try {
    const { orderId, utr, transactionId } = await request.json()

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
    }

    const updatedPayment = await PaymentService.submitUtrVerification({
      orderId,
      utr,
      transactionId,
    })

    return NextResponse.json({
      success: true,
      message: 'Payment verification submitted successfully. Waiting for coordinator approval.',
      payment: updatedPayment,
    })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Verification failed' },
      { status: 400 }
    )
  }
}
