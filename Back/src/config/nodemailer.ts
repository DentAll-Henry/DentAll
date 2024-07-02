import * as nodemailer from 'nodemailer';
import { environment } from './environment';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

const transporter = {
  host: environment.nodemailer.host,
  port: environment.nodemailer.port,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: environment.nodemailer.user,
    pass: environment.nodemailer.pass,
  },
}

const nodemailerConfig = {
  transport: transporter,

  template: {
    dir: process.cwd() + '/src/mail/templates',
    adapter: new HandlebarsAdapter(), // or any other adapter
    options: {
      strict: true,
    },
  },
}

export default nodemailerConfig