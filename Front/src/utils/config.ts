import "dotenv/config"
import { config as dotenvConfig } from "dotenv"

dotenvConfig({ path: ["./.env.local", "./.env"] })
export const enviroment = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  mercadopagoPublicKey: process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY || "",
  auth0: {
    clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
    domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
    url_base: process.env.NEXT_PUBLIC_AUTH0_BASE_URL,
  },
  botpressClient: process.env.NEXT_PUBLIC_BOTPRESS_CLIENT_ID || "",
}

