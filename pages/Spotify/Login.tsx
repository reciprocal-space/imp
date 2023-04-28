import React, { useCallback, useState, useEffect, useRef } from 'react';

import { getAccessToken, logout } from './utils';

export const SpotifyLogin: React.FC = () => {
    // TODO: remove undefined value - token should only be a string or null
    const [token, setToken] = useState<undefined | null | string>(null);

    const getToken = useCallback(() => {
        const token = getAccessToken();
        setToken(token);
    }, [token]);

    useEffect(() => {
        getToken();
        // TODO: does token and setToken need to be included in the dependency chain?
    }, [token]);

    return (
        <div className="Spotify">
            <header className="Spotify-header">
                {!token ? (
                    <a className='Spotify-link' href="http://localhost:3000/api/spotify/login">
                        Log in to spotify
                    </a>
                ) : (
                    <>
                        <h1> Logged in! </h1>
                        <button onClick={logout}>Log Out</button>
                    </>
                )}
            </header>
        </div>
    );
};