import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from 'redis'
import { Team, TeamStatsData } from '../../types/leagues-model'
import { NHLAdapter } from './lib/nhl.adapter'

const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || ''),
  },
})

client.on('connect', function () {
  console.log('Redis client connected')
})

client.on('error', function (err) {
  console.log('Something went wrong with Redis ' + err)
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Team[]>
) {
  const key = req.url || ''

  await client.connect()

  const data = await client.get(key)

  if (data) {
    res.send(JSON.parse(data))
  } else {
    const response = await fetch(
      `https://api.eliteprospects.com/v1/leagues/nhl/standings?apiKey=${process.env.API_KEY}`
    )

    const apiData = await response.json()

    const formattedApiData = NHLAdapter(apiData.data as TeamStatsData[])

    await client.set(key, JSON.stringify(formattedApiData))
    await client.expire(key, 3600)

    res.send(formattedApiData)
  }

  client.disconnect()
}
