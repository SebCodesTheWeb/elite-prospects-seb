import { NextApiRequest, NextApiResponse } from 'next'
import { Team, TeamStatsData } from '../../types/leagues-model'
import { NHLAdapter } from './lib/nhl.adapter'
import { client } from './lib/redis-client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Team[]>
) {
  const key = req.url || ''

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
      `https://api.eliteprospects.com/v1/leagues/nhl/standings?apiKey=${process.env.API_KEY}`
    )

    const apiData = await response.json()

    const formattedApiData = NHLAdapter(apiData.data as TeamStatsData[])

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
