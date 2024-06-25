import { Injectable } from '@nestjs/common';
import transporter from 'src/config/nodemailer';

@Injectable()
export class MailService {


    constructor() {
    }

    async sendMail(to: string, subject: string, text: string, html: string) {
        const mailOptions = {
            from: `${process.env.NODEMAILER_FROM} <${process.env.NODEMAILER_USER}>`, // dirección del remitente
            to,
            subject,
            text,
            html,
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
