import { db } from './db'

export interface InitiatePaymentParams {
  teamId: string
  amount: number
  provider: 'PHONEPE' | 'UPI_INTENT' | 'OFFLINE'
}

export interface VerifyPaymentParams {
  orderId: string
  utr?: string
  transactionId?: string
}

export class PaymentService {
  static generateUpiUri(upiId: string, recipientName: string, amount: number, orderId: string): string {
    const encodedName = encodeURIComponent(recipientName)
    const note = encodeURIComponent(`Innovation Week 2026 Registration ${orderId}`)
    return `upi://pay?pa=${upiId}&pn=${encodedName}&am=${amount}&tr=${orderId}&tn=${note}&cu=INR`
  }

  static async initiatePayment({ teamId, amount, provider }: InitiatePaymentParams) {
    const team = await db.team.findUnique({
      where: { id: teamId },
    })

    if (!team) {
      throw new Error('Team not found')
    }

    const orderId = `ORD-IW26-${team.teamCode.replace('IW-2026-', '')}-${Math.floor(100 + Math.random() * 900)}`

    // Create or update existing pending payment
    const payment = await db.payment.create({
      data: {
        teamId,
        orderId,
        provider,
        amount,
        status: provider === 'OFFLINE' ? 'INITIATED' : 'PENDING',
      },
    })

    await db.team.update({
      where: { id: teamId },
      data: {
        paymentStatus: 'INITIATED',
      },
    })

    return {
      payment,
      orderId,
      upiUri: PaymentService.generateUpiUri(
        process.env.PAYMENT_UPI_ID || 'srisivani.cse@upi',
        process.env.PAYMENT_RECIPIENT_NAME || 'Sri Sivani Innovation Week',
        amount,
        orderId
      ),
    }
  }

  static async submitUtrVerification({ orderId, utr, transactionId }: VerifyPaymentParams) {
    const payment = await db.payment.findUnique({
      where: { orderId },
      include: { team: true },
    })

    if (!payment) {
      throw new Error('Payment record not found')
    }

    const updatedPayment = await db.payment.update({
      where: { id: payment.id },
      data: {
        utr: utr || payment.utr,
        transactionId: transactionId || payment.transactionId,
        status: 'VERIFICATION_REQUIRED',
      },
    })

    await db.team.update({
      where: { id: payment.teamId },
      data: {
        paymentStatus: 'VERIFICATION_REQUIRED',
      },
    })

    return updatedPayment
  }

  static async adminApprovePayment(paymentId: string) {
    const payment = await db.payment.findUnique({
      where: { id: paymentId },
    })

    if (!payment) {
      throw new Error('Payment record not found')
    }

    const now = new Date()

    const updatedPayment = await db.payment.update({
      where: { id: paymentId },
      data: {
        status: 'SUCCESS',
        verifiedAt: now,
      },
    })

    await db.team.update({
      where: { id: payment.teamId },
      data: {
        paymentStatus: 'SUCCESS',
        status: 'APPROVED',
        currentStep: Math.max(payment.teamId ? 2 : 1, 2),
      },
    })

    return updatedPayment
  }

  static async adminRejectPayment(paymentId: string, reason?: string) {
    const payment = await db.payment.findUnique({
      where: { id: paymentId },
    })

    if (!payment) {
      throw new Error('Payment record not found')
    }

    const updatedPayment = await db.payment.update({
      where: { id: paymentId },
      data: {
        status: 'FAILED',
        rejectedReason: reason || 'Invalid payment verification or screenshot',
      },
    })

    await db.team.update({
      where: { id: payment.teamId },
      data: {
        paymentStatus: 'FAILED',
      },
    })

    return updatedPayment
  }
}
