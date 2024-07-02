import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DentalRecordDto } from './dtos/dentalRecord.dto';
import { DentalRecord } from './entities/dentalRecord.entity';
import { Deseases } from './entities/deseases.entity';
import { deseases } from '../db/deseasesDB';
import { Patient } from 'src/person/entities/patient.entity';

@Injectable()
export class DentalRecordRepository {
  constructor(
    @InjectRepository(DentalRecord)
    private readonly dentalRecordRepository: Repository<DentalRecord>,
    @InjectRepository(Deseases)
    private readonly deseasesRepository: Repository<Deseases>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async init() {
    try {
      const deseasesCount = await this.deseasesRepository.count();
      if (deseasesCount === 0) {
        for (const desease of deseases) {
          await this.addDesease(desease);
        }
        return;
      } else {
        return;
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async getDeseases() {
    return await this.deseasesRepository.find();
  }
  async addDesease(desease: string) {
    try {
      return await this.deseasesRepository.save({ name: desease });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getDentalRecords(page: number, limit: number): Promise<DentalRecord[]> {
    try {
      const [records, total] = await this.dentalRecordRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: ['deseases', 'patient'],
      });
      return records;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException();
    }
  }

  async getDentalRecordByID(id: string): Promise<DentalRecord> {
    try {
      const history = await this.dentalRecordRepository.findOne({
        where: { id: id },
      });
      if (!history) {
        throw new BadRequestException('Dental record not found for id: ' + id);
      }
      return history;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async createDentalRecord(data) {
    //: DentalRecordDto
    try {
      const patientExists = await this.patientRepository.findOne({
        where: { id: data.patient_id },
      });
      if (!patientExists) {
        throw new BadRequestException(
          'Patient not found for id: ' + data.patient_id,
        );
      }
      const newRecord = this.dentalRecordRepository.create(data);
      const savedRecord = await this.dentalRecordRepository.save(newRecord);
      return savedRecord;
    } catch (error) {
      throw error;
    }
  }

  async editDentalRecord(id: string, data: Partial<DentalRecordDto>) {
    try {
      const dentalRecord = await this.dentalRecordRepository.findOne({
        where: { id: id },
      });
      if (!dentalRecord) {
        throw new BadRequestException('Dental record not found for id: ' + id);
      }
      Object.assign(dentalRecord, data);
      const updatedRecord =
        await this.dentalRecordRepository.save(dentalRecord);
      return updatedRecord;
    } catch (error) {
      console.log(error);
    }
  }
}
