import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import nodemailerConfig from 'src/config/nodemailer';
import { Resend } from 'resend';

import { SystemConfigsService } from 'src/system_configs/system_configs.service';
import { environment } from 'src/config/environment';

@Injectable()
export class MailService {
  constructor(
    private readonly systemConfigsService: SystemConfigsService,
    private readonly mailerService: MailerService,
  ) {}

  async sendMail(to: string, subject: string, html: string) {
    const resend = new Resend(environment.resendAPIKey);

    try {
      await resend.emails.send({
        from: 'DentAll <onboarding@resend.dev>',
        to: 'dentallabgotvv@gmail.com',
        cc: to,
        subject,
        html,
      });
    } catch (error) {
      console.log(error);
    }

    try {
      this.mailerService
        .sendMail({
          to,
          from: `DentAll clinic <${process.env.NODEMAILER_USER}>`,
          subject,
          html,
        })
        .then((a) => {
          console.log(a);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {}
  }
}
