// import { handleAuth } from '@auth0/nextjs-auth0';
// import { handleCallback } from '@auth0/nextjs-auth0';
// import { callback as CB} from '../callback'

// export const GET = handleAuth({
//     callback: async (req, res) => {
//         try {
//            return await handleCallback(req, res, {
//                 CB()
//             });
//         } catch (error) {
//             console.error(error);
//         }
//     }
// })

import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';
/* 
const afterCallback = (req, session, state) => {
  console.log("req", req)
  console.log("session", session)
  console.log("state", state)

  if (session.user) {
    headers.set('location', '/admin');
    return session;
  } else {
    console.log(session)
    redirect('/register-auth0');
  }
}; */

export const GET = handleAuth({
  login: handleLogin({
    returnTo: 'http://localhost:3001/register-auth0',
  })
});