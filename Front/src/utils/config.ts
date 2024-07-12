import "dotenv/config"
import { config as dotenvConfig } from "dotenv"

dotenvConfig({ path: ["./.env.local", "./.env"] })
export const enviroment = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  mercadopagoPublicKey: process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY || "",
  mercadopagoCurrency: process.env.NEXT_PUBLIC_MERCADO_PAGO_CURRENCY || "en-US"
};

