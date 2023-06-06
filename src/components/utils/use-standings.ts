import axios from 'axios'
import { Team } from '../../../types/standings.model'
import { useQuery } from '@tanstack/react-query'

const fetchStandings = async (): Promise<Team[]> => {
  const response = await axios('/api/nhl')

  return response.data
}
export const useStandings = () => {
  const {
    isLoading,
    error,
    data = [],
  } = useQuery({
    queryKey: ['standings'],
    queryFn: fetchStandings,
  })

  return { isLoading, error, data }
}
