import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { AppointmentsRepository } from './appointments.repository';
import { DentalServ } from 'src/dentalServ/dentalServ.entity';
import { DentalServRepository } from 'src/dentalServ/dentalServ.repository';
import { MailService } from 'src/mail/mail.service';
import { PeopleRepository } from 'src/person/person.repository';
import { PeopleModule } from 'src/person/person.module';
import { DentalServModule } from 'src/dentalServ/dentalServ.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, DentalServ]),
    PeopleModule,
    DentalServModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AppointmentsRepository, MailService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
