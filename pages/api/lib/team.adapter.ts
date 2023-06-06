import { TeamData, DerivedTeamData } from '../../../types/team.model'

export const TeamDataAdapter = (teamData: TeamData): DerivedTeamData => ({
  isLoading: false,
  name: teamData.name,
  id: teamData.id,
  logo: teamData.logo.medium,
  teamType: teamData.teamType,
  founded: teamData.founded,
  city: teamData.city,
  arena: {
    name: teamData.arena.name,
    location: teamData.arena.location,
    yearOfConstruction: teamData.arena.yearOfConstruction,
    capacity: teamData.arena.capacity,
  },
  capHit: teamData.capHit,
  views: teamData.views,
  country: teamData.country.name,
  colors: teamData.colors,
  links: {
    eliteprospectsUrl: teamData.links.eliteprospectsUrl,
    officialWebUrl: teamData.links.officialWebUrl,
  },
})
