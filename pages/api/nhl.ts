import Redis from 'ioredis'
import { NextApiRequest, NextApiResponse } from 'next'
import getTeams from './leagues'

const client = new Redis(process.env.REDIS_URL || '')

client.on('connect', function () {
  console.log('Redis client connected')
})

client.on('error', function (err) {
  console.log('Something went wrong with Redis ' + err)
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const key = req.url || ''

  const data = await client.get(key)

  if (false && data) {
    res.send(JSON.parse(data))
  } else {
    // const response = await fetch("/api/leagues");
    // const apiData = await response.json();
    const apiData = getTeams()
    console.log({ apiData })

    // Store the API response in Redis, set it to expire after 1 hour
    // await client.set(key, JSON.stringify(apiData), 'EX', 3600)

    res.send(apiData)
  }

  client.disconnect()
}
