import { LeagueType, DerivedLeagueType } from '../../../types/league.model'

export const LeagueAdapter = (leagueData: LeagueType): DerivedLeagueType => {
  return {
    logo: leagueData.logoUrl,
    image: leagueData.imageUrl,
    name: leagueData.name,
    leagueLevel: leagueData.leagueLevel,
  }
}
