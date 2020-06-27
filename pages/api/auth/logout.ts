import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Set-Cookie', 'auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;')
    res.status(200).end()
}