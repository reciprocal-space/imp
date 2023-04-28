import request from 'axios';
import { LOCALSTORAGE_KEYS, StoredAccessTokenPartialRecord, StoredAccessTokenRecord } from "./types";

export const retrieveLocalStorageValues = (key: string): Record<LOCALSTORAGE_KEYS, string> => {
    const items  = window.localStorage.getItem(key);
    return items ? 
        JSON.parse(items) : 
        { 
            access_token: null,
            expires_in: null,
            error: null,
            refresh_token: null,
            timestamp: null
        };
};

export const hasTokenExpired = (values: StoredAccessTokenPartialRecord): boolean => {
    const { access_token, expires_in, timestamp } = values;
    if (!access_token || !timestamp) {
        return false;
    }
    const secondsElapsed = (Date.now() - Number(timestamp)) / 1000;
    return secondsElapsed >= Number(expires_in)

};

// Clear out all local storage items that have been set and reload the page
export const logout = (): void => {
    window.localStorage.removeItem('spotify');
    window.location = window.location.origin as unknown as Location;
};

export const refreshToken = async (tokens: StoredAccessTokenRecord): Promise<void> => {
    try {
        const { refresh_token, timestamp } = tokens;
        // logout if there's no access token available or we've managed to get into an infinite reload loop
        const isPrematurelyReloading = Date.now() - (Number(timestamp) / 1000) < 1000; 
        if (! refresh_token || isPrematurelyReloading) {
            console.error('No refresh token available');
            logout();
        }

        const { data } = await request(`/api/spotify/refresh-token?token=${refresh_token}`);

        window.localStorage.setItem(
            'spotify',
            JSON.stringify({
                ...tokens,
                access_token: data.access_token,
                timestamp: Date.now()
            })
        );

        window.location.reload();
    } catch (e) {
        console.error(e);
    }
};

// NB: should we be using useCallback here?
export const getAccessToken = () => {
    // NB: are we going to run into issues with truthy/falsy values? should we simple, static interface for getting/setting?
    const urlParams = new URLSearchParams(window.location.search);
    // TODO: assert that all the keys and values of LOCALSTORAGE_KEYS exist once reduce has completed
    console.log(urlParams)
    const queryParams = Object.values(LOCALSTORAGE_KEYS)
        .reduce((result: StoredAccessTokenPartialRecord, key: Partial<LOCALSTORAGE_KEYS>) => {
            console.log(key,urlParams.get(key))
            result[key] = urlParams.get(key) || undefined;
            return result;
        }, {});

    console.log(queryParams, window.location);

    // If there is a token in the URL query params, user is logging in for the first time
    const hasUrlAccessToken = !!queryParams.access_token;
    if (hasUrlAccessToken) {
        // Store query params in local storage
        window.localStorage.setItem(
            'spotify', 
            JSON.stringify({
                ...queryParams,
                timestamp: Date.now()
            })
        );

        return queryParams.access_token;
    }

    const localStorageTokens = retrieveLocalStorageValues('spotify');
    const hasStoredAccessToken = !!localStorageTokens?.access_token;

    // If there's an error or the token in local storage has expired, refresh the token
    // TODO: uncomment and fix infinite reloading loop
    // const hasError = !!queryParams.error;
    // if (hasError || hasTokenExpired(localStorageTokens) || !hasStoredAccessToken) {
    //     console.info('i am looking for a token')
    //     refreshToken(localStorageTokens);
    // }

    // If there's a valid token in local storage, ise that
    if (hasStoredAccessToken) {
        return localStorageTokens.access_token;
    }


};