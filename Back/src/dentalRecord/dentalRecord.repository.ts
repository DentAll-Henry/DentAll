import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { DentalRecordDto } from './dtos/dentalRecord.dto';
import { DentalRecord } from './entities/dentalRecord.entity';
import { Deseases } from './entities/deseases.entity';
import { deseases } from '../db/deseasesDB';
import { Patient } from 'src/person/entities/patient.entity';
import { ToothInfoDto } from './dtos/toothInfo.dto';
import { ToothInfo } from './entities/toothInfo.entity';

@Injectable()
export class DentalRecordRepository {
  constructor(
    @InjectRepository(DentalRecord)
    private readonly dentalRecordRepository: Repository<DentalRecord>,
    @InjectRepository(Deseases)
    private readonly deseasesRepository: Repository<Deseases>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(ToothInfo)
    private readonly toothInfoRepository: Repository<ToothInfo>,
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
        relations: ['deseases', 'toothInfo', 'patient'],
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
        throw new BadRequestException(
          'Historial clinico no encontrado para el id: ' + id,
        );
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
          'Paciente no encontrado para el id: ' + data.patient_id,
        );
      }
      const deseases = [];
      for (const desease of data.deseases) {
        const des = await this.deseasesRepository.find({
          where: { name: desease },
        });
        deseases.push(des[0]);
      }

      const newToothInfo = [];
      if (data.toothInfo.length > 0) {
        for (const tooth of data.toothInfo) {
          const newTooth = this.toothInfoRepository.create(tooth);
          const savedTooth = await this.toothInfoRepository.save(newTooth);
          newToothInfo.push(savedTooth);
        }
      }
      data.toothInfo = newToothInfo;
      data.deseases = deseases;
      data.patient = data.patient_id;
      const newRecord = this.dentalRecordRepository.create(data);
      const savedRecord = await this.dentalRecordRepository.save(newRecord);
      return savedRecord;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(
          'Error: el paciente ya posee un historial cargado',
        );
      }
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }

  async editDentalRecord(id: string, data: Partial<DentalRecordDto>) {
    try {
      const dentalRecord = await this.dentalRecordRepository.findOne({
        where: { id: id },
        relations: ['deseases', 'toothInfo'],
      });
      if (!dentalRecord) {
        throw new BadRequestException(
          'No se encontro un historial para el id: ' + id,
        );
      }
      // seguir aqui
      Object.assign(dentalRecord, data);
      const updatedRecord =
        await this.dentalRecordRepository.save(dentalRecord);
      return updatedRecord;
    } catch (error) {
      console.log(error);
    }
  }

  async getDentalRecordByPatient(id: string): Promise<DentalRecord[]> {
    try {
      const record = await this.dentalRecordRepository.find({
        where: { patient: id },
        relations: ['deseases', 'toothInfo'],
      });
      return record;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
