import { enviroment } from '@/utils/config';
import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  login: handleLogin({
    returnTo: `${enviroment.apiUrl}/register-auth0`,
  })
});