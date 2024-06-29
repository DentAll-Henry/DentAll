import "dotenv/config";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: ["./.env.local", "./.env"] });
export const enviroment = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
};
