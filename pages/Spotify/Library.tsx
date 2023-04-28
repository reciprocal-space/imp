import React, { useState, useEffect } from 'react';
// TODO: wrapper around axios request handler?
import request from 'axios';
import querystring from 'querystring';

export const setupLibraryFetch = (limit = 50, market = "US", offset = 0) => {
    const url = 'https://api.spotify.com/v1/me/tracks';

    return function(limit: number, offset: number) {
        const queryString = querystring.stringify({ limit, offset });
        const { data: {} } = request({
            method: 'get',
            url,
            data: queryString
        });


    }
}

export const Library: React.FC = () => {
    const [library, setLibrary] = useState(null);
    
    const fetchLibrary = async () => {
        try {
            const limit = 50;
            querystring.stringify({ limit });
            const { data } =  await request(url);
            setLibrary(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        // library ? library.map(row)
        <div>
            Library
        </div>
    );
};