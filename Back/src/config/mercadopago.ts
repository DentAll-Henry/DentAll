import {
  Customer,
  MercadoPagoConfig,
  Payment,
  Preference,
  User,
} from 'mercadopago';
import { config as dotenvconfig } from 'dotenv';
import { environment } from './environment';

dotenvconfig({ path: '.env' });

const client = new MercadoPagoConfig({
  accessToken: environment.mercadopago.accesstoken,
});
const preference = new Preference(client);
const payment = new Payment(client);
export { preference, payment };
