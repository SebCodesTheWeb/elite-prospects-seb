import { useQuery } from '@tanstack/react-query'
import { DerivedLeagueType } from '../../../types/league.model'

const fetchLeagueData = async (): Promise<DerivedLeagueType> => {
  const response = await fetch(`/api/league?league=${'nhl'}`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()

  return data
}

export const useLeagueInfo = () => {
  const {
    isLoading,
    error,
    data,
  } = useQuery({
    queryKey: ['league'],
    queryFn: fetchLeagueData,
  })

  if (error) {
    throw new Error(`Err: ${error}`)
  }

  return { isLoading, data }
}
