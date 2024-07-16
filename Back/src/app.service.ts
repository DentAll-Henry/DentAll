import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './appointments/entities/appointment.entity';
import { Repository } from 'typeorm';
import { MailService } from './mail/mail.service';
import { Payment } from './payments/entities/payment.entity';
import { format } from 'date-fns';

@Injectable()
export class AppService {

    constructor(
        @InjectRepository(Appointment) private appointmentRepository: Repository<Appointment>,
        @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
        private readonly mailService: MailService
    ) { }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async deleteUnpaidAppointments() {
        try {
            const appointmentsFuturos = await this.appointmentRepository
                .createQueryBuilder('appointment')
                .where('appointment.date_time > NOW()')
                .andWhere('appointment.expiration_date < NOW()')
                .getMany();

            for (const cita of appointmentsFuturos) {
                const pagado = await this.paymentRepository.createQueryBuilder('payment')
                    .where('payment.appointment = :id', { id: cita.id })
                    .getOne();

                if (!pagado) {
                    await this.appointmentRepository.delete(cita.id);
                } else {
                    await this.appointmentRepository.update(cita.id, { expiration_date: null });
                }
            }
        } catch (error) {
            console.error('Error al eliminar citas no pagadas:', error.message);
            throw error;
        }
    }


    @Cron(CronExpression.EVERY_DAY_AT_8AM)
    async notifySevenDaysBefore() {
        const appointmentsFuturos = await this.appointmentRepository.createQueryBuilder('appointment')
            .leftJoinAndSelect('appointment.service', 'service')
            .leftJoinAndSelect('appointment.patient', 'patient')
            .leftJoinAndSelect('patient.person', 'person_')
            .leftJoinAndSelect('appointment.dentist_id', 'dentist')
            .leftJoinAndSelect('dentist.person', 'person')
            .where('DATE(appointment.date_time) = DATE(NOW() + INTERVAL \'7 days\')')
            .getMany();

        for (const cita of appointmentsFuturos) {
            const response = await this.mailService.sendMail(
                cita.patient['person']['email'],
                'Recordatorio de cita en DentAll',
                `<!DOCTYPE html>
                    <html>

                    <head>
                    <title>Recordatorio de su cita</title>
                    </head>

                    <body>
                    <h1>Hola, ${cita.patient['person']['first_name']}!</h1>
                    <p>Solo queremos recordarte que su cita en DentAll sigue en nuestra agenda y esperamos verle pronto por aqui.</p>
                    <h4>Detalles de su cita:</h4>
                    <ul>
                        <li>Fecha y hora: ${format(cita.date_time, 'yyyy-MM-dd HH:mm')}</li>
                        <li>Doctor: ${cita.dentist_id['person']['first_name']} ${cita.dentist_id['person']['last_name']}</li>
                        <li>Servicio: ${cita.service['name']}</li>
                    </ul>
                    <p>Si necesita realizar cambios, puede hacerlo en la sección de Citas de su cuenta en DentAll.</p>
                    <p>Por favor, no dude en contactarnos si tiene alguna pregunta.</p>
                    <p>Gracias por preferirnos.</p>
                    <p>DentAll</p>
                    </body>

                    </html>`
            );
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }


}
