import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import Papa from 'papaparse'
import { formatTeamsForExcel } from '@/lib/export'

export async function GET() {
  try {
    const teams = await db.team.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        members: true,
        payments: true,
      },
    })

    const excelRows = formatTeamsForExcel(teams)
    const csvString = Papa.unparse(excelRows)

    const utf8Csv = '\ufeff' + csvString

    return new NextResponse(utf8Csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="Innovation_Week_2026_Registrations_${Date.now()}.csv"`,
      },
    })
  } catch (error) {
    console.error('Excel Export Error:', error)
    return NextResponse.json({ error: 'Failed to generate Excel export' }, { status: 500 })
  }
}
