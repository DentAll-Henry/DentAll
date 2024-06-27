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
import { deseases } from './dtos/deseases.array';

@Injectable()
export class DentalRecordRepository {
  constructor(
    @InjectRepository(DentalRecord)
    private dentalRecordRepository: Repository<DentalRecord>,
    @InjectRepository(Deseases)
    private deseasesRepository: Repository<Deseases>,
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

  async getDentalRecords() {
    try {
      return await this.dentalRecordRepository.find();
    } catch (error) {
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

  async createDentalRecord(data: DentalRecordDto) {
    try {
      // const recordExists = await this.dentalRecordRepository.findOne();
      // if (recordExists) {
      //   throw new BadRequestException('Dental record already exists');
      // }
      const newRecord = this.dentalRecordRepository.create();
      const savedRecord = await this.dentalRecordRepository.save(newRecord);
      return savedRecord;
    } catch (error) {
      throw error;
    }
  }
}
