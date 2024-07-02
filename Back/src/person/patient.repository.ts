import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { Person } from './entities/person.entity';

@Injectable()
export class PatientsRepository {
  constructor(
    @InjectRepository(Patient) private patientsRepository: Repository<Patient>,
  ) {}

  async getAllPatients(paginationDto: { page: number; limit: number }): Promise<Patient[]> {
    const { page, limit } = paginationDto;
    const queryBuilder = this.patientsRepository
      .createQueryBuilder('patients')
      .leftJoinAndSelect('patients.person', 'person')
      .leftJoinAndSelect('patients.appointments', 'appointment')
      .leftJoinAndSelect('patients.dentalRecord', 'dentalRecord')
      .skip((page - 1) * limit)
      .take(limit);

    return await queryBuilder.getMany();
  }

  async patientById(patientId: string): Promise<Patient> {
    const patient = await this.patientsRepository.findOne({
      where: {
        id: patientId,
      },
      relations: ['person'],
    });
    if (!patient)
      throw new BadRequestException('No existe paciente con el ID especificado.');
    return patient;
  }

  async patientByPersonId(personId: Person ['id']): Promise<Patient> {
    const patient = await this.patientsRepository.findOne({
      where: {
        person: { 
          id: personId
        },
      },
      relations: {
        person: true,
        appointments: true,
      },
    });
    if (!patient)
      throw new BadRequestException('No existe paciente con el ID de persona especificado.');
    return patient;
  }

  async createPatient(person: Person | Person['id']) {
    try {
      return await this.patientsRepository.save({ person });
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException('Error: ' + error.driverError?.detail);
      }
      throw new BadRequestException('Error interno del servidor.');
    }
  }
}
