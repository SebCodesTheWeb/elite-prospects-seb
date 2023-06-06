import { NextApiRequest, NextApiResponse } from 'next'
import { cachingMiddlware } from './lib/caching-middleware'
import {
  DerivedTeamsReference,
  TeamsReference,
} from '../../types/teams-reference.model'
import { teamsReferenceAdapter } from './lib/teams-reference.adapter'
import axios from 'axios'

async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<DerivedTeamsReference>
): Promise<DerivedTeamsReference> {
  const response = await axios.get(
    `https://api.eliteprospects.com/v1/leagues/nhl/teams?fields=links.%2A,logoUrl,id&apiKey=${process.env.API_KEY}`
  )

  const apiData = response.data

  const formattedApiData = teamsReferenceAdapter(apiData as TeamsReference)

  res.send(formattedApiData)

  return formattedApiData
}

export default cachingMiddlware(handler)
