import { NextApiRequest, NextApiResponse } from 'next'
import { Team, TeamStatsData } from '../../types/standings.model'
import { NHLAdapter } from './lib/nhl.adapter'
import { cachingMiddlware } from './lib/caching-middleware'
import axios from 'axios'

async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Team[]>
): Promise<Team[]> {
  const response = await axios.get(
    `https://api.eliteprospects.com/v1/leagues/nhl/standings?fields=stats,postseason,team,group&apiKey=${process.env.API_KEY}`
  )

  const apiData = response.data

  const formattedApiData = NHLAdapter(apiData.data as TeamStatsData[])

  res.send(formattedApiData)

  return formattedApiData
}

export default cachingMiddlware(handler)
