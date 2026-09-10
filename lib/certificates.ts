import { jsPDF } from 'jspdf'

export interface CertificateData {
  studentName: string
  rollNumber: string
  teamName: string
  startupName?: string
  awardType: string // PARTICIPATION, WINNER, RUNNER_UP, SECOND_RUNNER_UP, BEST_INNOVATION, BEST_TECH, BEST_IMPACT, BEST_BUSINESS, BEST_PROTOTYPE
  certCode: string
  issuedDate?: string
}

export function generateCertificatePDF(data: CertificateData) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  })

  const width = doc.internal.pageSize.getWidth()
  const height = doc.internal.pageSize.getHeight()

  // Background Border & Header Line
  doc.setLineWidth(2)
  doc.setDrawColor(30, 41, 59) // Slate-800
  doc.rect(10, 10, width - 20, height - 20)

  doc.setLineWidth(0.5)
  doc.setDrawColor(99, 102, 241) // Indigo accent
  doc.rect(13, 13, width - 26, height - 26)

  // Header - College Name
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.setTextColor(15, 23, 42) // Slate-900
  doc.text('SRI SIVANI COLLEGE OF ENGINEERING', width / 2, 30, { align: 'center' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(71, 85, 105)
  doc.text('(Autonomous) | Srikakulam, Andhra Pradesh', width / 2, 37, { align: 'center' })

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.setTextColor(79, 70, 229) // Indigo-600
  doc.text('DEPARTMENT OF CSE & AI-ML', width / 2, 45, { align: 'center' })

  // Certificate Title
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(26)
  doc.setTextColor(15, 23, 42)
  doc.text('CERTIFICATE OF RECOGNITION', width / 2, 62, { align: 'center' })

  doc.setFontSize(11)
  doc.setTextColor(100, 116, 139)
  doc.text('INNOVATION WEEK 2026 — "Build, Pitch & Win Big"', width / 2, 70, { align: 'center' })

  // Recipient Line
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(12)
  doc.setTextColor(51, 65, 85)
  doc.text('This is to proudly certify that', width / 2, 85, { align: 'center' })

  // Student Name
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.setTextColor(30, 58, 138) // Blue-900
  doc.text(data.studentName.toUpperCase(), width / 2, 97, { align: 'center' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(71, 85, 105)
  doc.text(`(Roll No: ${data.rollNumber})`, width / 2, 104, { align: 'center' })

  // Body Content
  const awardTitleMap: Record<string, string> = {
    WINNER: 'FIRST PLACE WINNER',
    RUNNER_UP: 'RUNNER-UP AWARD',
    SECOND_RUNNER_UP: 'SECOND RUNNER-UP AWARD',
    BEST_INNOVATION: 'BEST INNOVATION AWARD',
    BEST_TECH: 'BEST TECHNICAL SOLUTION',
    BEST_IMPACT: 'BEST SOCIAL & ECONOMIC IMPACT',
    BEST_BUSINESS: 'BEST BUSINESS MODEL',
    BEST_PROTOTYPE: 'BEST WORKING PROTOTYPE',
    PARTICIPATION: 'OUTSTANDING PARTICIPATION',
  }

  const awardText = awardTitleMap[data.awardType] || 'OUTSTANDING PARTICIPATION'

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(12)
  doc.setTextColor(51, 65, 85)
  doc.text(`of Team "${data.teamName}" has been awarded`, width / 2, 118, { align: 'center' })

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.setTextColor(217, 119, 6) // Amber-600
  doc.text(awardText, width / 2, 127, { align: 'center' })

  if (data.startupName) {
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(11)
    doc.setTextColor(71, 85, 105)
    doc.text(`for the startup venture: "${data.startupName}"`, width / 2, 135, { align: 'center' })
  }

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(100, 116, 139)
  doc.text(
    'in the 5-Day Innovation Challenge organized from Day 1 to Day 5 at Sri Sivani College of Engineering.',
    width / 2,
    145,
    { align: 'center' }
  )

  // Signatures
  const sigY = 175
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(15, 23, 42)

  // Sig 1
  doc.text('_______________________', 45, sigY)
  doc.text('Dr. Head of Department', 45, sigY + 6)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('Dept. of CSE & AI-ML', 45, sigY + 11)

  // Sig 2
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('_______________________', width / 2, sigY, { align: 'center' })
  doc.text('Faculty Coordinators', width / 2, sigY + 6, { align: 'center' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('Innovation Week 2026', width / 2, sigY + 11, { align: 'center' })

  // Sig 3
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('_______________________', width - 45, sigY, { align: 'right' })
  doc.text('Principal / Director', width - 45, sigY + 6, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('Sri Sivani College of Engg.', width - 45, sigY + 11, { align: 'right' })

  // Footer Certificate Code
  doc.setFontSize(8)
  doc.setTextColor(148, 163, 184)
  doc.text(`Verification Code: ${data.certCode}  |  Issued: ${data.issuedDate || '2026-08-22'}`, 15, height - 14)

  // Save / Return blob
  return doc
}
