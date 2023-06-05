import { TeamStatsData, Team } from '../../../types/leagues-model'

export const NHLAdapter = (standingsData: TeamStatsData[]): Team[] => {
  return standingsData.map((teamData) => ({
    name: teamData.team.name,
    GP: teamData.stats.GP,
    W: teamData.stats.W,
    L: teamData.stats.L,
    OTW: teamData.stats.OTW,
    OTL: teamData.stats.OTL,
    GF: teamData.stats.GF,
    GA: teamData.stats.GA,
    '+/-': teamData.stats.GF - teamData.stats.GA,
    TP: teamData.stats.W * 2 - teamData.stats.OTL,
    PGP: parseFloat(
      ((teamData.stats.W * 2 - teamData.stats.OTL) / teamData.stats.GP).toFixed(
        2
      )
    ),
    postSeason: teamData.postseason,
    division: teamData.group,
    logo: teamData.team.logoUrl,
    founded: teamData.team.founded,
    arena: teamData.team.arena,
    city: teamData.team.city,
    country: teamData.team.country.name,
    colors: teamData.team.colors,
  }))
}
