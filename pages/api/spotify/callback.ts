// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import request from 'axios';
import querystring from 'node:querystring';

import { ClientId, ClientSecret, RedirectUri } from './utils/constants';
// const stateKey = 'spotify_auth_state';

// Gwt an authorization token from spotify and pass it to the browser
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const code = req.query.code || null;
    const state = req.query.state || null;

    if (state === null) {
        const queryString = querystring.stringify({ error: 'state_mismatch' });
        res.redirect(`/#${queryString}`);
    } else {
        try {
            const Authorization = `Basic ${Buffer.from(`${ClientId}:${ClientSecret}`).toString('base64')}`;
            const response = await request({
                method: 'post',
                url: 'https://accounts.spotify.com/api/token',
                data: querystring.stringify({
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: RedirectUri
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization
                }
            });

            console.info(response);

            const { access_token, refresh_token, expires_in } = response.data;
            // we can pass the token to the browser to make requests from there
            res.redirect('/?' +
                querystring.stringify({
                    access_token,
                    expires_in,
                    refresh_token
            }));
        } catch (error) {
            console.error(error)
            res.redirect('/#' +
                querystring.stringify({ error: 'invalid_token' })
            );
        }
    }
};