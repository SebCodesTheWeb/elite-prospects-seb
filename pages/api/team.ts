import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { TeamDataAdapter } from './lib/team.adapter'
import { TeamData, DerivedTeamData } from '../../types/team.model'
import { cachingMiddlware } from './lib/caching-middleware'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DerivedTeamData>
): Promise<DerivedTeamData> {
  const teamId = req.query.teamId as string

  const response = await axios.get(
    `https://api.eliteprospects.com/v1/teams/${teamId}?apiKey=${process.env.API_KEY}`
  )

  const apiData = response.data

  const formattedApiData = TeamDataAdapter(apiData.data as TeamData)

  res.send(formattedApiData)

  return formattedApiData
}

export default cachingMiddlware(handler)
