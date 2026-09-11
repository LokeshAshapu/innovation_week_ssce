import nodemailer from 'nodemailer'

export const SENDER_EMAIL = 'lokeshashapu@gmail.com'

// Nodemailer Transporter Setup
const getTransporter = () => {
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || SENDER_EMAIL
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || ''

  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: smtpUser, pass: smtpPass },
      tls: { rejectUnauthorized: false },
    })
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: { rejectUnauthorized: false },
  })
}

const transporter = getTransporter()

export interface EmailMember {
  name: string
  rollNumber: string
  branch: string
  year: string
  email?: string | null
  phone?: string | null
  isLeader?: boolean
}

export interface SendRegistrationEmailParams {
  teamName: string
  teamCode: string
  paymentMethod: 'CASH' | 'PHONEPE'
  utr?: string
  receiptUrl?: string
  members: EmailMember[]
  amount?: number
}

export async function sendRegistrationEmail({
  teamName,
  teamCode,
  paymentMethod,
  utr,
  receiptUrl,
  members,
  amount = 200,
}: SendRegistrationEmailParams) {
  // Collect all valid emails from leader and team members
  const recipientEmails = members
    .map((m) => m.email?.trim())
    .filter((email): email is string => !!email && email.includes('@'))

  if (recipientEmails.length === 0) {
    console.log('[Email Service] No recipient emails found for team:', teamCode)
    return { success: false, reason: 'No valid recipient emails' }
  }

  const isCash = paymentMethod === 'CASH'
  const subject = isCash
    ? `[Innovation Week 2026] Spot Reserved — Cash Payment Required (${teamCode})`
    : `[Innovation Week 2026] Registration Submitted — PhonePe Verification (${teamCode})`

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #090d16; color: #e2e8f0; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #0f172a; border-radius: 16px; border: 1px solid #1e293b; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
        .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 32px 24px; text-align: center; }
        .header h1 { margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { margin: 6px 0 0; color: #c7d2fe; font-size: 13px; }
        .content { padding: 28px 24px; }
        .badge { display: inline-block; padding: 6px 14px; font-size: 11px; font-weight: 700; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px; }
        .badge-cash { background-color: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); }
        .badge-phonepe { background-color: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }
        .card { background-color: #1e293b; border-radius: 12px; padding: 20px; border: 1px solid #334155; margin-bottom: 20px; }
        .field-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #334155; font-size: 13px; }
        .field-row:last-child { border-bottom: none; }
        .field-label { color: #94a3b8; }
        .field-value { font-weight: 700; color: #ffffff; text-align: right; }
        .team-table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 12px; }
        .team-table th { background-color: #090d16; color: #94a3b8; text-align: left; padding: 8px; border-bottom: 1px solid #334155; }
        .team-table td { padding: 8px; border-bottom: 1px solid #1e293b; color: #cbd5e1; }
        .instructions { background-color: ${isCash ? 'rgba(245, 158, 11, 0.08)' : 'rgba(79, 70, 229, 0.08)'}; border-left: 4px solid ${isCash ? '#f59e0b' : '#6366f1'}; padding: 16px; border-radius: 0 8px 8px 0; margin-bottom: 20px; font-size: 13px; line-height: 1.6; }
        .btn { display: inline-block; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: #ffffff !important; padding: 12px 24px; text-decoration: none; font-weight: 700; font-size: 13px; border-radius: 10px; margin-top: 12px; text-align: center; }
        .footer { text-align: center; padding: 20px; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Sri Sivani Innovation Week 2026</h1>
          <p>Dept of CSE & AI-ML • Sri Sivani College of Engineering (Autonomous)</p>
        </div>

        <div class="content">
          <div style="text-align: center;">
            <span class="badge ${isCash ? 'badge-cash' : 'badge-phonepe'}">
              ${isCash ? 'Spot Reserved — Cash Payment Pending' : 'PhonePe Payment Submitted'}
            </span>
          </div>

          <h2 style="font-size: 18px; color: #ffffff; margin-top: 0; text-align: center;">
            Hello ${teamName} Team! 👋
          </h2>

          <p style="font-size: 13px; color: #cbd5e1; text-align: center; margin-bottom: 24px;">
            Thank you for registering for <strong>Innovation Week 2026</strong>. Below are your official team details.
          </p>

          <div class="instructions">
            ${
              isCash
                ? `<strong>⚠️ Action Required to Confirm Your Spot:</strong><br>
                   You selected <strong>Cash Payment</strong>. To confirm your spot, please pay <strong>₹${amount}</strong> in cash to the Student Coordinators.`
                : `<strong>✅ Payment Submitted:</strong><br>
                   You selected <strong>PhonePe / UPI Payment</strong> (₹${amount}). Your UTR reference number and payment screenshot have been received and sent for verification.`
            }
          </div>

          <div class="card">
            <div class="field-row">
              <span class="field-label">Team Code:</span>
              <span class="field-value" style="color: #818cf8; font-family: monospace;">${teamCode}</span>
            </div>
            <div class="field-row">
              <span class="field-label">Team Name:</span>
              <span class="field-value">${teamName}</span>
            </div>
            <div class="field-row">
              <span class="field-label">Payment Method:</span>
              <span class="field-value">${isCash ? 'Cash Payment' : 'PhonePe / UPI'}</span>
            </div>
            <div class="field-row">
              <span class="field-label">Amount:</span>
              <span class="field-value" style="color: #34d399;">₹${amount}</span>
            </div>
            ${
              utr
                ? `<div class="field-row">
                    <span class="field-label">Transaction UTR:</span>
                    <span class="field-value" style="font-family: monospace;">${utr}</span>
                  </div>`
                : ''
            }
          </div>

          <div class="card">
            <h3 style="margin-top: 0; font-size: 14px; color: #ffffff; border-bottom: 1px solid #334155; padding-bottom: 8px;">
              Team Roster (${members.length} Members)
            </h3>
            <table class="team-table">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Branch</th>
                </tr>
              </thead>
              <tbody>
                ${members
                  .map(
                    (m) => `
                  <tr>
                    <td>${m.isLeader ? '<strong style="color:#818cf8;">Leader</strong>' : 'Member'}</td>
                    <td>${m.name}</td>
                    <td style="font-family: monospace;">${m.rollNumber}</td>
                    <td>${m.branch} ${m.year ? `(${m.year})` : ''}</td>
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>
          </div>

          <div style="text-align: center; margin-top: 24px;">
            <p style="font-size: 12px; color: #94a3b8; margin-bottom: 8px;">
              Log in to your Team Dashboard to submit your startup ideas, prototypes, and pitch deck:
            </p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login" class="btn">
              Access Team Dashboard →
            </a>
          </div>
        </div>

        <div class="footer">
          <p>Sent by <strong>lokeshashapu@gmail.com</strong> on behalf of Dept of CSE & AI-ML</p>
          <p>Sri Sivani College of Engineering (Autonomous), Srikakulam</p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    if (!process.env.SMTP_USER && !process.env.GMAIL_APP_PASSWORD) {
      console.log(`[Email Mock Service] Email created for ${recipientEmails.join(', ')} from ${SENDER_EMAIL}:`, {
        subject,
        teamCode,
      })
      return { success: true, mock: true, recipients: recipientEmails }
    }

    const info = await transporter.sendMail({
      from: `"Sri Sivani Innovation Week" <${SENDER_EMAIL}>`,
      to: recipientEmails.join(', '),
      subject,
      html: htmlContent,
    })

    console.log('[Email Service] Email sent successfully:', info.messageId)
    return { success: true, messageId: info.messageId, recipients: recipientEmails }
  } catch (error) {
    console.error('[Email Service Error]', error)
    return { success: false, error: String(error) }
  }
}

export interface SendCertificateEmailParams {
  studentName: string
  rollNumber: string
  teamName: string
  email: string
  awardType: string
  certCode: string
  startupName?: string
}

export async function sendCertificateEmail({
  studentName,
  rollNumber,
  teamName,
  email,
  awardType,
  certCode,
  startupName,
}: SendCertificateEmailParams) {
  if (!email || !email.includes('@')) {
    return { success: false, reason: 'Invalid or missing email address' }
  }

  const awardTitleMap: Record<string, string> = {
    WINNER: '🏆 1st Place Winner Award',
    RUNNER_UP: '🥈 Runner-Up Award',
    SECOND_RUNNER_UP: '🥉 2nd Runner-Up Award',
    BEST_INNOVATION: '💡 Best Innovation Award',
    BEST_TECH: '⚙️ Best Technical Solution Award',
    BEST_IMPACT: '🌍 Best Social & Economic Impact Award',
    BEST_BUSINESS: '📈 Best Business Model Award',
    BEST_PROTOTYPE: '🛠️ Best Working Prototype Award',
    PARTICIPATION: '📜 Certificate of Outstanding Participation',
  }

  const awardTitle = awardTitleMap[awardType] || '📜 Certificate of Outstanding Participation'
  const subject = `[Innovation Week 2026] Official Certificate — ${studentName} (${certCode})`

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #090d16; color: #e2e8f0; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #0f172a; border-radius: 16px; border: 1px solid #1e293b; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
        .header { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 32px 24px; text-align: center; }
        .header h1 { margin: 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { margin: 6px 0 0; color: #dbeafe; font-size: 12px; }
        .content { padding: 28px 24px; }
        .cert-badge { display: inline-block; padding: 8px 16px; font-size: 13px; font-weight: 800; border-radius: 20px; background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); margin-bottom: 20px; text-align: center; }
        .card { background-color: #1e293b; border-radius: 12px; padding: 20px; border: 1px solid #334155; margin-bottom: 20px; }
        .field-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #334155; font-size: 13px; }
        .field-row:last-child { border-bottom: none; }
        .field-label { color: #94a3b8; }
        .field-value { font-weight: 700; color: #ffffff; }
        .btn { display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%); color: #ffffff !important; padding: 12px 24px; text-decoration: none; font-weight: 700; font-size: 13px; border-radius: 10px; text-align: center; margin-top: 12px; }
        .footer { text-align: center; padding: 20px; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Sri Sivani Innovation Week 2026</h1>
          <p>Dept of CSE & AI-ML • Sri Sivani College of Engineering (Autonomous)</p>
        </div>

        <div class="content">
          <div style="text-align: center;">
            <div class="cert-badge">${awardTitle}</div>
          </div>

          <h2 style="font-size: 18px; color: #ffffff; margin-top: 0; text-align: center;">
            Congratulations, ${studentName}! 🎉
          </h2>

          <p style="font-size: 13px; color: #cbd5e1; text-align: center; margin-bottom: 24px; line-height: 1.6;">
            We are pleased to present your official <strong>Certificate of Recognition</strong> for active participation and innovation in <strong>Innovation Week 2026</strong>.
          </p>

          <div class="card">
            <div class="field-row">
              <span class="field-label">Student Name:</span>
              <span class="field-value">${studentName}</span>
            </div>
            <div class="field-row">
              <span class="field-label">Roll Number:</span>
              <span class="field-value" style="font-family: monospace;">${rollNumber}</span>
            </div>
            <div class="field-row">
              <span class="field-label">Team Name:</span>
              <span class="field-value">${teamName}</span>
            </div>
            ${startupName ? `<div class="field-row"><span class="field-label">Startup Venture:</span><span class="field-value">${startupName}</span></div>` : ''}
            <div class="field-row">
              <span class="field-label">Award Category:</span>
              <span class="field-value" style="color: #fbbf24;">${awardTitle}</span>
            </div>
            <div class="field-row">
              <span class="field-label">Verification Code:</span>
              <span class="field-value" style="color: #818cf8; font-family: monospace;">${certCode}</span>
            </div>
          </div>

          <div style="text-align: center; margin-top: 24px;">
            <p style="font-size: 12px; color: #94a3b8; margin-bottom: 8px;">
              Log in to your Team Dashboard to view and download your high-resolution PDF certificate:
            </p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard" class="btn">
              Download Certificate PDF →
            </a>
          </div>
        </div>

        <div class="footer">
          <p>Sent by <strong>lokeshashapu@gmail.com</strong> on behalf of Dept of CSE & AI-ML</p>
          <p>Sri Sivani College of Engineering (Autonomous), Srikakulam</p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    if (!process.env.SMTP_USER && !process.env.GMAIL_APP_PASSWORD) {
      console.log(`[Email Mock Service] Certificate Email created for ${email}:`, {
        subject,
        certCode,
      })
      return { success: true, mock: true, recipient: email }
    }

    const info = await transporter.sendMail({
      from: `"Sri Sivani Innovation Week" <${SENDER_EMAIL}>`,
      to: email,
      subject,
      html: htmlContent,
    })

    return { success: true, messageId: info.messageId, recipient: email }
  } catch (error) {
    console.error('[Certificate Email Service Error]', error)
    return { success: false, error: String(error) }
  }
}

