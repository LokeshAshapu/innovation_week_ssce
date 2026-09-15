import { NextResponse } from 'next/server'
import { db, ensureTablesExist } from '@/lib/db'
import { fetchTeamsFromCloudStore, saveTeamsToCloudStore } from '@/lib/cloudStore'

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

    let cloudTeams = await fetchTeamsFromCloudStore()

    if (teamId) {
      const targetTeam = await db.team.findUnique({ where: { id: teamId } })
      if (targetTeam) {
        cloudTeams = cloudTeams.filter((t) => t.teamCode !== targetTeam.teamCode)
        await saveTeamsToCloudStore(cloudTeams)
      }
      await db.team.delete({ where: { id: teamId } })
      return NextResponse.json({ success: true, message: `Team deleted successfully.` })
    }

    if (purgeAllSeed) {
      cloudTeams = cloudTeams.filter((t) => !DUMMY_TEAM_NAMES.includes(t.teamName))
      await saveTeamsToCloudStore(cloudTeams)

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

    cloudTeams = cloudTeams.filter((t) => !DUMMY_TEAM_NAMES.includes(t.teamName))
    await saveTeamsToCloudStore(cloudTeams)

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
