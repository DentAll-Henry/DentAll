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

  async getDentalRecords(page: number, limit: number): Promise<DentalRecord[]> {
    return await this.dentalRecordRepository.getDentalRecords(page, limit);
  }
  async getDentalRecordByID(id: string): Promise<DentalRecord> {
    return await this.dentalRecordRepository.getDentalRecordByID(id);
  }

  async createDentalRecord(data: DentalRecordDto) {
    return await this.dentalRecordRepository.createDentalRecord(data);
  }

  async editDentalRecord(id: string, data: Partial<DentalRecordDto>) {
    return await this.dentalRecordRepository.editDentalRecord(id, data);
  }
}
