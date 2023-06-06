import axios from 'axios'
import { DerivedTeamsReference } from '../../../types/teams-reference.model'
import { useStandings } from '../utils/use-standings'
import { useQuery } from '@tanstack/react-query'

const fetchTeamsReference = async (): Promise<DerivedTeamsReference> => {
  const response = await axios.get('/api/teams-reference')

  return response.data
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
