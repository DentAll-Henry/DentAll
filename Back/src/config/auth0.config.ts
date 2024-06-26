import { environment } from './environment';

export const auth0Config = {
  authRequired: false,
  auth0Logout: true,
  secret: environment.auth0.secret,
  baseURL: environment.auth0.baseURL,
  clientID: environment.auth0.clientID,
  issuerBaseURL: environment.auth0.issuerBaseURL,
  authorizationParams: {
    response: 'code',
    audience: 'https://dev-nu82z5t5ytbetbi0.us.auth0.com/api/v2/',
    scope: 'openid profile email http://localhost:3000/log_count'
  }
};
