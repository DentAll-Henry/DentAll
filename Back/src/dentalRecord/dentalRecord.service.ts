import { Injectable, OnModuleInit } from '@nestjs/common';
import { DentalRecordRepository } from './dentalRecord.repository';
import { DentalRecordDto } from './dtos/dentalRecord.dto';
import { DentalRecord } from './entities/dentalRecord.entity';

@Injectable()
export class DentalRecordService implements OnModuleInit {
  constructor(
    private readonly dentalRecordRepository: DentalRecordRepository,
  ) {}
  onModuleInit() {
    return this.dentalRecordRepository.init();
  }
  async getDeseases() {
    return await this.dentalRecordRepository.getDeseases();
  }

  async getDentalRecords(): Promise<DentalRecord[]> {
    return await this.dentalRecordRepository.getDentalRecords();
  }
  async getDentalRecordByID(id: string) {
    return await this.dentalRecordRepository.getDentalRecordByID(id);
  }

  async createDentalRecord(data: DentalRecordDto) {
    return await this.dentalRecordRepository.createDentalRecord(data);
  }
}
