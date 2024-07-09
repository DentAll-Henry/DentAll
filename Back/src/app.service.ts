import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './appointments/entities/appointment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {

    constructor(
        @InjectRepository(Appointment) private appointmentRepository: Repository<Appointment>,
    ) { }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleCron() {
        const appointmentsFuturos = await this.appointmentRepository.createQueryBuilder('appointment')
            .where('appointment.date_time > NOW()')
            .andWhere('appointment.expiration_date < NOW()')
            .getMany();

        //verificar si alguno ya esta pagado y luego eliminarlos. Tal vez informar que se elimino por falta de pago a traves de email
        //await this.appointmentRepository.remove(appointments_futuros);
        console.log(appointmentsFuturos)
    }
}
