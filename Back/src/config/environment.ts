import 'dotenv/config';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: ['./.env.development', './.env'] });

export const environment = {
  port: process.env.PORT || 3000,
  bdInfo: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'test',
    pass: process.env.DB_PASS || 'test',
    name: process.env.DB_NAME || 'test',
  },
  jwt: process.env.JWT_SECRET,
  nodemailer: {
    host: process.env.NODEMAILER_HOST || 'localhost',
    port: Number(process.env.NODEMAILER_PORT) || 1025,
    user: process.env.NODEMAILER_USER || 'test',
    pass: process.env.NODEMAILER_PASS || 'test',
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  mercadopago: {
    accesstoken: process.env.MERCADOPAGO_ACCESS_TOKEN,
  },
  resendAPIKey: process.env.RESEND_API_KEY,
  fronturl: process.env.FRONT_URL || 'http://localhost:3001',
  backUrl: process.env.BACK_URL || 'http://localhost:3000',
};
