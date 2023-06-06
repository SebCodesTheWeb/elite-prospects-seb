import {
  TeamsReference,
  DerivedTeamsReference,
} from '../../../types/teams-reference.model'

export const teamsReferenceAdapter = (
  teams: TeamsReference
): DerivedTeamsReference => {
  return teams.map((team) => ({
    id: team.id,
    logo: team.logoUrl,
    link: team.links.eliteprospectsUrl,
  }))
}
