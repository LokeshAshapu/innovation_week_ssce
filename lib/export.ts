import Papa from 'papaparse'

export interface FormattedExcelRow {
  'S.No': number
  'Registration Timestamp': string
  'Team Code': string
  'Team Name': string
  'Payment Status': string
  'Payment Amount (INR)': number
  'Transaction UTR / Ref No': string
  'Team Leader Name': string
  'Leader Roll No': string
  'Leader Branch': string
  'Leader Diploma Branch': string
  'Leader Year': string
  'Leader Email': string
  'Leader Phone': string
  'Member 2 Name': string
  'Member 2 Roll No': string
  'Member 2 Branch': string
  'Member 2 Diploma Branch': string
  'Member 2 Year': string
  'Member 3 Name': string
  'Member 3 Roll No': string
  'Member 3 Branch': string
  'Member 3 Diploma Branch': string
  'Member 3 Year': string
  'Member 4 Name': string
  'Member 4 Roll No': string
  'Member 4 Branch': string
  'Member 4 Diploma Branch': string
  'Member 4 Year': string
  'Member 5 Name': string
  'Member 5 Roll No': string
  'Member 5 Branch': string
  'Member 5 Diploma Branch': string
  'Member 5 Year': string
}

export function formatTeamsForExcel(teams: any[]): FormattedExcelRow[] {
  return teams.map((team, idx) => {
    const members = team.members || []
    const leader = members.find((m: any) => m.isLeader) || members[0] || {}
    const nonLeaders = members.filter((m: any) => !m.isLeader)
    const member2 = nonLeaders[0] || {}
    const member3 = nonLeaders[1] || {}
    const member4 = nonLeaders[2] || {}
    const member5 = nonLeaders[3] || {}

    const payment = team.payments?.[0] || {}
    const isCash = payment.provider === 'OFFLINE_CASH' || team.paymentStatus === 'CASH_PENDING'
    const paymentMethodText = isCash ? 'CASH PAYMENT' : 'PHONEPE / UPI'
    const formattedPaymentStatus = isCash
      ? (team.paymentStatus === 'SUCCESS' || team.paymentStatus === 'VERIFIED' ? 'CASH PAID & CONFIRMED' : 'CASH PENDING')
      : (team.paymentStatus === 'SUCCESS' || team.paymentStatus === 'VERIFIED' ? 'PHONEPE VERIFIED' : 'PHONEPE VERIFICATION REQUIRED')

    const startupName = team.ideaSubmission?.startupName || team.pitchSubmission?.startupName || 'N/A'
    const certCode = team.certificates?.[0]?.certCode || 'NOT ISSUED'

    return {
      'S.No': idx + 1,
      'Registration Timestamp': team.createdAt ? new Date(team.createdAt).toLocaleString('en-IN') : '',
      'Team Code': team.teamCode || '',
      'Team Name': team.name || '',
      'Payment Option': paymentMethodText,
      'Payment Status': formattedPaymentStatus,
      'Payment Amount (INR)': payment.amount || 200,
      'Transaction UTR / Ref No': payment.utr || payment.utrNumber || (isCash ? 'OFFLINE CASH' : 'N/A'),
      'Startup Venture Name': startupName,
      'Certificate Code': certCode,
      'Team Leader Name': leader.name || '',
      'Leader Roll No': leader.rollNumber || '',
      'Leader Branch': leader.branch || '',
      'Leader Diploma Branch': leader.diplomaBranch || 'N/A',
      'Leader Year': leader.year || '',
      'Leader Email': leader.email || '',
      'Leader Phone': leader.phone || '',
      'Member 2 Name': member2.name || '',
      'Member 2 Roll No': member2.rollNumber || '',
      'Member 2 Branch': member2.branch || '',
      'Member 2 Diploma Branch': member2.diplomaBranch || 'N/A',
      'Member 2 Year': member2.year || '',
      'Member 3 Name': member3.name || '',
      'Member 3 Roll No': member3.rollNumber || '',
      'Member 3 Branch': member3.branch || '',
      'Member 3 Diploma Branch': member3.diplomaBranch || 'N/A',
      'Member 3 Year': member3.year || '',
      'Member 4 Name': member4.name || '',
      'Member 4 Roll No': member4.rollNumber || '',
      'Member 4 Branch': member4.branch || '',
      'Member 4 Diploma Branch': member4.diplomaBranch || 'N/A',
      'Member 4 Year': member4.year || '',
      'Member 5 Name': member5.name || '',
      'Member 5 Roll No': member5.rollNumber || '',
      'Member 5 Branch': member5.branch || '',
      'Member 5 Diploma Branch': member5.diplomaBranch || 'N/A',
      'Member 5 Year': member5.year || '',
    }
  })
}

export function exportToCSV(data: Record<string, unknown>[], filename: string) {
  const csv = Papa.unparse(data)
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `${filename}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
