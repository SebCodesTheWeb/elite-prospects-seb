import { DerivedTeamsReference } from '../../../types/teams-reference.model'
import { useStandings } from '../utils/use-standings'
import { useQuery } from '@tanstack/react-query'

const fetchTeamsReference = async (): Promise<DerivedTeamsReference> => {
  const response = await fetch('/api/teams-reference')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()

  return data
}

export const useTeams = () => {
  const { data: standings } = useStandings()

  const { data } = useQuery({
    queryKey: ['teams-refernece'],
    queryFn: fetchTeamsReference,
  })

  if (!data) return

  const dataById = new Map(data.map((item) => [item.id, item]))

  const mergedData = standings.map((team) => ({
    ...team,
    ...(dataById.get(team.id) || {}),
  }))

  return mergedData
}
