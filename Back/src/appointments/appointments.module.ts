import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { AppointmentsRepository } from './appointments.repository';
import { DentalServRepository } from 'src/dentalServ/dentalServ.repository';
import { MailService } from 'src/mail/mail.service';
import { PeopleRepository } from 'src/person/person.repository';
import { PeopleModule } from 'src/person/person.module';
import { DentalServModule } from 'src/dentalServ/dentalServ.module';
import { DentalServ } from 'src/dentalServ/entities/dentalServ.entity';
import { SystemConfigsService } from 'src/system_configs/system_configs.service';
import { SystemConfig } from 'src/system_configs/entities/system_config.entity';
import { SystemConfigsRepository } from 'src/system_configs/system_configs.repository';
import { PendingAppointment } from './entities/pending.appointments';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, DentalServ, SystemConfig, PendingAppointment]),
    PeopleModule,
    DentalServModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AppointmentsRepository, MailService, SystemConfigsService, SystemConfigsRepository],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
