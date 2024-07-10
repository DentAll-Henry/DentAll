import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Patient } from 'src/person/entities/patient.entity';
import { DentalServ } from 'src/dentalServ/entities/dentalServ.entity';
import { PaymentsController } from './payments.controller';
import { PaymentsRepository } from './payments.repository';
import { PaymentsService } from './payments.service';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { PatientsService } from 'src/person/patient.service';
import { PatientsRepository } from 'src/person/patient.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Patient, DentalServ, Appointment]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsRepository, PaymentsService, PatientsService, PatientsRepository],
})
export class PaymentsModule {}
