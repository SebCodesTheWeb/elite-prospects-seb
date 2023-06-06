import { NextApiRequest, NextApiResponse } from 'next'
import { TeamDataAdapter } from './lib/team.adapter'
import { client } from './lib/redis-client'
import { TeamData, DerivedTeamData } from '../../types/team.model'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DerivedTeamData>
) {
  const key = req.url || ''
  const teamId = req.query.teamId as string

  try {
    await client.connect()
    const data = await client.get(key)
    if (data) {
      res.send(JSON.parse(data))
    } else {
      throw new Error('Data not found')
    }
  } catch (e) {
    const response = await fetch(
      `https://api.eliteprospects.com/v1/teams/${teamId}?apiKey=${process.env.API_KEY}`
    )

    const apiData: TeamData = (await response.json()).data

    const formattedApiData = TeamDataAdapter(apiData)

    try {
      await client.set(key, JSON.stringify(formattedApiData))
      await client.expire(key, 3600)
    } catch (err) {
      if (err instanceof Error) {
        console.log(`Failed to get data from Redis: ${err.message}`)
      } else {
        throw err
      }
    }

    res.send(formattedApiData)
  } finally {
    client.disconnect()
  }
}
