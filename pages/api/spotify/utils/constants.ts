export const ClientId = '4f076216f96a4c0c81566389fe81f9ea';
export const ClientSecret = 'a9797fa3dcfc4231852eaf36603bef53';

export const RedirectUri = 'http://localhost:3000/api/spotify/callback';

export enum User {
    ReadEmail = 'user-read-email',
    ReadPrivate = 'user-read-private'
};
  
export const Scopes: { User: typeof User } = {
    User
};