import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { DentalRecordRepository } from './dentalRecord.repository';
import { DentalRecordDto } from './dtos/dentalRecord.dto';
import { DentalRecord } from './entities/dentalRecord.entity';
import { DentalRecordDtoForEdit } from './dtos/dentalRecordDtoForEdit.dto';
import { TreatmentDto } from './dtos/treatment.dto';
import { ToothArray } from './dtos/toothArray.dto';

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

  async editDentalRecord(id: string, data: DentalRecordDtoForEdit) {
    if (Object.keys(data).length === 0) {
      throw new BadRequestException(
        'Debes enviar al menos un campo para editar',
      );
    }
    if (!data.deseases) data.deseases = [];
    return await this.dentalRecordRepository.editDentalRecord(id, data);
  }

  async signDentalRecord(id: string) {
    return await this.dentalRecordRepository.signDentalRecord(id);
  }

  async newDentalTreatment(id: string, data: TreatmentDto) {
    return await this.dentalRecordRepository.newDentalTreatment(id, data);
  }

  async editToothInfo(id: string, data: ToothArray) {
    return await this.dentalRecordRepository.editToothInfo(id, data);
  }
}
