import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { DerivedLeagueType } from '../../../types/league.model'

const fetchLeagueData = async (): Promise<DerivedLeagueType> => {
  const response = await axios.get(`/api/league?league=${'nhl'}`)

  return response.data
}

export const useLeagueInfo = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['league'],
    queryFn: fetchLeagueData,
  })

  if (error) {
    throw new Error(`Err: ${error}`)
  }

  return { isLoading, data }
}
