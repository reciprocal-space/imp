import type { NextApiRequest, NextApiResponse } from 'next';
import request from 'axios';
import querystring from 'node:querystring';

import { ClientId, ClientSecret } from './utils/constants';

export default async function(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { token } = req.query;
    
        const Authorization = `Basic ${Buffer.from(`${ClientId}:${ClientSecret}`).toString('base64')}`;
        const response = await request({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: querystring.stringify({
                // TODO: setup grant types as enums
                grant_type: 'refresh_token',
                refresh_token: token
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization
            }
        });

        res.send(response.data);
    } catch (e) {
        res.send(e);
    }
};