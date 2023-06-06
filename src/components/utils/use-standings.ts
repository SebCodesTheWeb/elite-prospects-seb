import { Team } from '../../../types/standings.model'
import { useQuery } from '@tanstack/react-query'

const fetchStandings = async (): Promise<Team[]> => {
  const response = await fetch('/api/nhl')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()

  return data
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
