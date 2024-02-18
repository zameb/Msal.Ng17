import { environment } from '../../environments/environment';

export const msalConfig = {
  auth: {
    clientId: environment.MSE_CLIENT_ID,
    authority: environment.MSE_AUTHORITY,
    redirectUri: environment.MSE_REDIRECT_URI,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true,
  },
};

export const msalConfigScopes = [
  environment.MSE_API_SCOPE, //Remove if you don't need custom scopes
  'User.Read'
];
