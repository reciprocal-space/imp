// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import querystring from 'node:querystring';

type Data = {
  name: string
}





enum User {
  ReadEmail = 'user-read-email',
  ReadPrivate = 'user-read-private'
}

const Scopes: { User: typeof User } = {
  User
};



export const ping = (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  res.status(200).json({ name: 'pong' })
}

