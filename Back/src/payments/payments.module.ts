import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Patient } from 'src/person/entities/patient.entity';
import { DentalServ } from 'src/dentalServ/entities/dentalServ.entity';
import { PaymentsController } from './payments.controller';
import { PaymentsRepository } from './payments.repository';
import { PaymentsService } from './payments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Patient, DentalServ])],
  controllers: [PaymentsController],
  providers: [PaymentsRepository, PaymentsService],
})
export class PaymentsModule {}
