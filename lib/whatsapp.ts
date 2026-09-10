export const ORGANIZER_WHATSAPP_NUMBER = '919876543210' // Default Student Coordinator WhatsApp

export interface WhatsAppQueryInput {
  name: string
  teamNameOrRoll: string
  topic: string
  question: string
}

export function generateWhatsAppChatUrl({ name, teamNameOrRoll, topic, question }: WhatsAppQueryInput): string {
  const text = `*INNOVATION WEEK 2026 — QUERY* 🚀\n\n*From:* ${name}\n*Team / Roll:* ${teamNameOrRoll}\n*Topic:* ${topic}\n\n*Question:* ${question}\n\n_Sent via Sri Sivani Innovation Week Platform_`
  return `https://wa.me/${ORGANIZER_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

export function processWhatsAppBotMessage(userMsg: string): string {
  const query = userMsg.toLowerCase().trim()

  if (query.includes('fee') || query.includes('amount') || query.includes('cost') || query.includes('payment') || query.includes('phonepe')) {
    return `💰 *Innovation Week 2026 Registration Fee & Payment Info*
Registration Fee: ₹200 per team (3-4 members).
Payment methods supported: PhonePe, GPay, Paytm, or UPI ID: srisivani.cse@upi.
After payment, enter your UTR number on the website to confirm registration!`
  }

  if (query.includes('schedule') || query.includes('timing') || query.includes('programme') || query.includes('date') || query.includes('day')) {
    return `📅 *Innovation Week 2026 Schedule Overview*
• Day 1: Inaugural & Entrepreneurship Awareness (9:30 AM)
• Day 2: Startup Idea Presentations (2:00 PM)
• Day 3: Prototype Development Sprint (2:00 PM)
• Day 4: MVP Development & Business Pitch (2:00 PM)
• Day 5: Grand Finale & Jury Awards (2:00 PM)`
  }

  if (query.includes('diploma') || query.includes('branch')) {
    return `🎓 *Diploma Students Registration Rule*
Diploma students are fully eligible! During registration, select "Diploma" under Branch and enter your specific Diploma branch (e.g. Diploma Mechanical, Diploma ECE).`
  }

  if (query.includes('size') || query.includes('member') || query.includes('team')) {
    return `👥 *Team Requirements*
Each team must consist of 3 to 4 students (1 Team Leader + 2 or 3 Members). Students can be from CSE, AIML, ECE, EEE, MECH, CIVIL, or Diploma.`
  }

  if (query.includes('venue') || query.includes('location') || query.includes('college')) {
    return `📍 *Event Venue*
Sri Sivani College of Engineering (Autonomous), Srikakulam. Main Seminar Hall & CSE/AI-ML Labs.`
  }

  if (query.includes('coordinator') || query.includes('contact') || query.includes('help')) {
    return `📞 *Student & Faculty Coordinators*
Student Leads: A. Lokesh & P. Hareesh
Media Coordinator: B. Prasad
Faculty Lead: Prof. Janaki Bhai Madam (Dept of CSE & AI-ML)`
  }

  return `🤖 *Innovation Week 2026 Auto-Bot*
Hello! Thanks for reaching out.
Type a keyword to get quick info:
1. *Fee* or *Payment*
2. *Schedule* or *Timings*
3. *Diploma* or *Branch*
4. *Team* or *Size*
5. *Coordinators*

Or reply with your detailed question and a student coordinator will respond shortly!`
}
