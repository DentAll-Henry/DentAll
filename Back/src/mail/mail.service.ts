import { Injectable } from '@nestjs/common';
import transporter from 'src/config/nodemailer';
import { SystemConfigsService } from 'src/system_configs/system_configs.service';

@Injectable()
export class MailService {


    constructor(
        private readonly systemConfigsService: SystemConfigsService
    ) {
    }

    async sendMail(to: string, subject: string, text: string, html: string) {
        const mail = (await this.systemConfigsService.findOne('email')).value
        const mailOptions = {
            from: `${process.env.NODEMAILER_FROM} <${process.env.NODEMAILER_USER}>`, // dirección del remitente
            to,
            subject,
            text,
            html,
            replyTo: mail
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Message sent: %s', info.messageId);
            return info;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
}
