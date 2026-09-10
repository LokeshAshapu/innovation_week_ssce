import { NextResponse } from 'next/server'
import { processWhatsAppBotMessage, generateWhatsAppChatUrl } from '@/lib/whatsapp'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, name, teamNameOrRoll, topic, question } = body

    // 1. If form query submission, return direct WhatsApp chat link
    if (question) {
      const waUrl = generateWhatsAppChatUrl({
        name: name || 'Student',
        teamNameOrRoll: teamNameOrRoll || 'N/A',
        topic: topic || 'General Inquiry',
        question,
      })

      return NextResponse.json({
        success: true,
        waUrl,
        message: 'WhatsApp message pre-filled. Redirecting to WhatsApp...',
      })
    }

    // 2. Automated WhatsApp Bot message processing
    const botReply = processWhatsAppBotMessage(message || '')

    return NextResponse.json({
      success: true,
      reply: botReply,
    })
  } catch (error) {
    console.error('WhatsApp Webhook Error:', error)
    return NextResponse.json({ error: 'WhatsApp bot processing error' }, { status: 500 })
  }
}
