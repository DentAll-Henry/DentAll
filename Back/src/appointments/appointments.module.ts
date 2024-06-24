import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { AppointmentsRepository } from './appointments.repository';
import { DentalServ } from 'src/dentalServ/dentalServ.entity';
import { DentalServRepository } from 'src/dentalServ/dentalServ.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, DentalServ])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AppointmentsRepository, DentalServRepository],
})
export class AppointmentsModule {}
