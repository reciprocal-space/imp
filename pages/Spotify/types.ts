export enum LOCALSTORAGE_KEYS {
    AccessToken = 'access_token',
    ExpireTime = 'expires_in',
    Error = 'error',
    RefreshToken = 'refresh_token',
    Timestamp = 'timestamp'
}

export type StoredAccessTokenRecord = Record<LOCALSTORAGE_KEYS, string>;

export type StoredAccessTokenPartialRecord = Partial<StoredAccessTokenRecord>