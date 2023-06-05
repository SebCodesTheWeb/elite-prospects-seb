import { NextApiRequest, NextApiResponse } from 'next'
import getTeams from './leagues'
import { createClient } from 'redis'

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
  res: NextApiResponse
) {
  const key = req.url || ''

  await client.connect()
  const data = await client.get(key)

  if (false && data) {
    //@ts-ignore
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
