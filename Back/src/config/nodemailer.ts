import * as nodemailer from 'nodemailer';
import { environment } from './environment';

const transporter = nodemailer.createTransport({
    host: environment.nodemailer.host,
    port: environment.nodemailer.port,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: environment.nodemailer.user,
      pass: environment.nodemailer.pass,
    },
  });

  export default transporter