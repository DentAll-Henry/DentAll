import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DentalRecordController } from './dentalRecord.controller';
import { DentalRecord } from './entities/dentalRecord.entity';
import { DentalRecordService } from './dentalRecord.service';
import { DentalRecordRepository } from './dentalRecord.repository';
import { Deseases } from './entities/deseases.entity';
import { Patient } from 'src/person/entities/patient.entity';
import { ToothInfo } from './entities/toothInfo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DentalRecord, Deseases, Patient, ToothInfo]),
  ],
  controllers: [DentalRecordController],
  providers: [DentalRecordService, DentalRecordRepository],
})
export class DentalRecordModule {}
