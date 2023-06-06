import { NextApiRequest, NextApiResponse } from 'next'
import { cachingMiddlware } from './lib/caching-middleware'
import { LeagueAdapter } from './lib/league.adapter'
import { DerivedLeagueType, LeagueType } from '../../types/league.model'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DerivedLeagueType>
): Promise<DerivedLeagueType> {
  const league = req.query.league as string

  const response = await fetch(
    `https://api.eliteprospects.com/v1/leagues/${league}?apiKey=${process.env.API_KEY}`
  )

  const apiData = await response.json()

  const formattedApiData = LeagueAdapter(apiData.data as LeagueType)

  res.send(formattedApiData)

  return formattedApiData
}

export default cachingMiddlware(handler)
