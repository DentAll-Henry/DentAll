import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import nodemailerConfig from 'src/config/nodemailer';

import { SystemConfigsService } from 'src/system_configs/system_configs.service';

@Injectable()
export class MailService {


    constructor(
        private readonly systemConfigsService: SystemConfigsService,
        private readonly mailerService: MailerService
    ) {
    }

    async sendMail(to: string, subject: string, template: string, context: {}) {
        this.mailerService
            .sendMail({
                to,
                from: `DentAll clinic <${process.env.NODEMAILER_USER}>`,
                subject,
                template,
                context,
            })
            .then((a) => { console.log(a); })
            .catch((e) => { console.log(e); });
    }
    /* const mail = (await this.systemConfigsService.findOne('email')).value
    const mailOptions = {
        from: `${process.env.NODEMAILER_USER}`, // dirección del remitente
        to,
        subject,
        replyTo: mail,
        //text:"Hola",
        template: template,
        context
    };

    try {
        const info = await nodemailerConfig.transport.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    } 
}*/
}
