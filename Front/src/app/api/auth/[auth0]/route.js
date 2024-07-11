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

import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

const afterCallback = (req, session, state) => {
  if (!session.user) {
    return session;
  } else {
    console.log(session)
    redirect('/register-auth0');
  }
};

export const GET = handleAuth({
  callback: handleCallback({ afterCallback })
});