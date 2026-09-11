import { NextResponse } from 'next/server'
import { db, ensureTablesExist } from '@/lib/db'

const DUMMY_TEAM_NAMES = [
  'AgriSense AI',
  'NeuroHealth Bot',
  'EcoGrid Tech',
  'PolyCraft Diploma Innovators',
  'AquaPurify Labs',
  'FleetTrack Logistics',
  'CyberShield Edu',
  'ChargeMobility',
  'MedAssist AI',
  'MediWaste Trace',
]

export async function POST(request: Request) {
  try {
    await ensureTablesExist()

    const body = await request.json().catch(() => ({}))
    const { teamId, purgeAllSeed = false } = body

    if (teamId) {
      // Delete single specific team
      await db.team.delete({ where: { id: teamId } })
      return NextResponse.json({ success: true, message: `Team deleted successfully.` })
    }

    if (purgeAllSeed) {
      // Delete all seed dummy teams
      const deletedCount = await db.team.deleteMany({
        where: {
          name: { in: DUMMY_TEAM_NAMES },
        },
      })
      return NextResponse.json({
        success: true,
        message: `Purged ${deletedCount.count} seed dummy teams successfully.`,
      })
    }

    // Default: purge known seed dummy teams
    const result = await db.team.deleteMany({
      where: {
        name: { in: DUMMY_TEAM_NAMES },
      },
    })

    return NextResponse.json({
      success: true,
      deletedCount: result.count,
      message: `Cleared ${result.count} dummy test teams.`,
    })
  } catch (error) {
    console.error('Error purging dummy teams:', error)
    return NextResponse.json(
      { error: `Failed to purge dummy teams: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    )
  }
}
