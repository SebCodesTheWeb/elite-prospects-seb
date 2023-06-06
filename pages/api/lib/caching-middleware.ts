import { NextApiRequest, NextApiResponse } from 'next'
import { client } from './redis-client'

export const cachingMiddlware = (
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<unknown>
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const key = req.url || ''

    try {
      await client.connect()
      const data = await client.get(key)
      if (data) {
        return res.send(JSON.parse(data))
      } else {
        throw new Error('Data not found')
      }
    } catch (e) {
      const result = await handler(req, res)

      try {
        await client.set(key, JSON.stringify(result))
        await client.expire(key, 3600)
      } catch (err) {
        if (err instanceof Error) {
          console.log(`Failed to get data from Redis: ${err.message}`)
        } else {
          throw err
        }
      }

      return result
    } finally {
      client.disconnect()
    }
  }
}
