import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { DentalRecord } from './entities/dentalRecord.entity';
import { Deseases } from './entities/deseases.entity';
import { deseases } from '../db/deseasesDB';
import { Patient } from 'src/person/entities/patient.entity';
import { ToothInfo } from './entities/toothInfo.entity';
import { Treatments } from './entities/treatments.entity';
import { DentalServ } from 'src/dentalServ/entities/dentalServ.entity';
import { ToothArray } from './dtos/toothArray.dto';

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
    @InjectRepository(Treatments)
    private readonly treatmentsRepository: Repository<Treatments>,
    @InjectRepository(DentalServ)
    private readonly dentalServRepository: Repository<DentalServ>,
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
        relations: ['deseases', 'toothInfo', 'patient', 'treatments'],
      });
      return records;
    } catch (error) {
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }

  async getDentalRecordByID(id: string): Promise<DentalRecord> {
    try {
      const history = await this.dentalRecordRepository.findOne({
        where: { id: id },
        relations: ['deseases', 'toothInfo', 'patient', 'treatments'],
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
      throw new InternalServerErrorException('Error interno del servidor');
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
      const newTreatments = [];
      for (const treatment of data.treatments) {
        const service = await this.dentalServRepository.findOne({
          where: { id: treatment.dentalServ_id },
        });
        if (!service) {
          throw new BadRequestException(
            'Servicio dental no encontrado para el id: ' +
              treatment.dentalServ_id,
          );
        }
        newTreatments.push({
          dentalServ: service.id,
          ...treatment,
          date: new Date(),
        });
      }
      const treatments = [];
      for (const treatment of newTreatments) {
        const newTreatment = this.treatmentsRepository.create(treatment);
        const savedTreatment =
          await this.treatmentsRepository.save(newTreatment);

        treatments.push(savedTreatment);
      }

      const deseases = [];
      for (const desease of data.deseases) {
        const des = await this.deseasesRepository.findOneBy({
          name: desease,
        });
        if (!des) {
          throw new BadRequestException(
            'Enfermedad no encontrada para el nombre: ' + desease,
          );
        }
        deseases.push(des);
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
      data.treatments = treatments;
      const newRecord = this.dentalRecordRepository.create(data);
      const savedRecord = await this.dentalRecordRepository.save(newRecord);
      return savedRecord;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(
          'El paciente ya posee un historial cargado',
        );
      }
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }

  async editDentalRecord(id: string, data) {
    //: Omit<DentalRecordDto, 'toothInfo' | 'patient_id' | 'treatments'>
    try {
      const dentalRecord = await this.dentalRecordRepository.findOne({
        where: { id: id },
        relations: ['deseases'],
      });
      if (!dentalRecord) {
        throw new BadRequestException(
          'No se encontro un historial para el id: ' + id,
        );
      }
      const updatedDeseases = [...dentalRecord.deseases];
      for (const deseaseName of data.deseases) {
        const deseaseExists = dentalRecord.deseases.some(
          (d) => d.name === deseaseName,
        );
        if (!deseaseExists) {
          const desease = await this.deseasesRepository.findOneBy({
            name: deseaseName,
          });
          if (!desease) {
            throw new BadRequestException(
              'Enfermedad no encontrada para el nombre: ' + deseaseName,
            );
          }
          updatedDeseases.push(desease);
        }
      }
      const { deseases, ...otherData } = data;
      const mergedRecord = this.dentalRecordRepository.merge(
        dentalRecord,
        otherData,
      );
      mergedRecord.deseases = updatedDeseases;
      await this.dentalRecordRepository.save(mergedRecord);
      return mergedRecord;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error interno del servidor');
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
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }

  async signDentalRecord(id: string) {
    try {
      const record = await this.dentalRecordRepository.findOne({
        where: { id: id },
      });
      if (!record) {
        throw new BadRequestException(
          'No se encontro un historial para el id: ' + id,
        );
      }
      if (record.isSigned) {
        throw new BadRequestException('El historial ya fue firmado');
      }
      record.isSigned = true;
      await this.dentalRecordRepository.save(record);
      return record;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }

  async newDentalTreatment(id: string, data) {
    try {
      const dentalRecord = await this.getDentalRecordByID(id);
      const savedTreatment = await this.treatmentsRepository.save({
        dentalServ: data.dentalServ_id,
        ...data,
        date: new Date(),
      });
      dentalRecord.treatments.push(savedTreatment);
      await this.dentalRecordRepository.save(dentalRecord);
      return savedTreatment;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }

  async editToothInfo(id: string, data: ToothArray) {
    try {
      const dentalRecord = await this.getDentalRecordByID(id);
      const updatedTooths = [];
      for (const toothInfo of data.data) {
        for (const record of dentalRecord.toothInfo) {
          let updatedTooth = {};
          if (toothInfo.toothNumber == record.toothNumber) {
            updatedTooth = await this.toothInfoRepository.merge(
              record,
              toothInfo,
            );
            await this.toothInfoRepository.save(updatedTooth);
            updatedTooths.push(updatedTooth);
          } else {
            updatedTooth = await this.toothInfoRepository.save(toothInfo);
          }
          updatedTooths.push(updatedTooth);
        }
      }
      const updatedRecord = this.dentalRecordRepository.merge(dentalRecord, {
        toothInfo: updatedTooths,
      });
      await this.dentalRecordRepository.save(updatedRecord);
      return { message: 'Se actualizo la informacion correctamente' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }
}
