// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import querystring from 'node:querystring';
import { generateRandomString } from './utils/utils';
import { ClientId, RedirectUri, Scopes } from './utils/constants';

// Get authorization to access spotify data
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const state = generateRandomString(16);
  const scope = `${Scopes.User.ReadEmail} ${Scopes.User.ReadPrivate}`;
  const queryString = querystring.stringify({
    response_type: 'code',
    client_id: ClientId,
    scope,
    redirect_uri: RedirectUri,
    state
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryString}`);
};