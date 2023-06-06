import { NextApiRequest, NextApiResponse } from 'next'
import { TeamDataAdapter } from './lib/team.adapter'
import { TeamData, DerivedTeamData } from '../../types/team.model'
import { cachingMiddlware } from './lib/caching-middleware'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DerivedTeamData>
): Promise<DerivedTeamData> {
  const teamId = req.query.teamId as string

  const response = await fetch(
    `https://api.eliteprospects.com/v1/teams/${teamId}?apiKey=${process.env.API_KEY}`
  )

  const apiData: TeamData = (await response.json()).data

  const formattedApiData = TeamDataAdapter(apiData)

  res.send(formattedApiData)

  return formattedApiData
}

export default cachingMiddlware(handler)
