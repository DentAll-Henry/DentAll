import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './appointments/entities/appointment.entity';
import { Repository } from 'typeorm';
import { MailService } from './mail/mail.service';
import { Payment } from './payments/entities/payment.entity';

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
                'Nueva cita en DentAll',
                'appointment_reminder',
                {
                    first_name: cita.patient['person']['first_name'],
                    service: cita.service['name'],
                    date_time: cita.date_time,
                    dentist: cita.dentist_id['person']['first_name'],
                },
            );
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }


}
