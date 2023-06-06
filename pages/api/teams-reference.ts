import { NextApiRequest, NextApiResponse } from 'next'
import { cachingMiddlware } from './lib/caching-middleware'
import {
  DerivedTeamsReference,
  TeamsReference,
} from '../../types/teams-reference.model'
import { teamsReferenceAdapter } from './lib/teams-reference.adapter'

async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<DerivedTeamsReference>
): Promise<DerivedTeamsReference> {
  const response = await fetch(
    `https://api.eliteprospects.com/v1/leagues/nhl/teams?fields=links.%2A,logoUrl,id&apiKey=${process.env.API_KEY}`
  )

  const apiData: TeamsReference = (await response.json()).data

  const formattedApiData = teamsReferenceAdapter(apiData)

  res.send(formattedApiData)

  return formattedApiData
}

export default cachingMiddlware(handler)
