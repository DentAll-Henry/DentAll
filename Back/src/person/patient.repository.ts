import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { Dentist } from './entities/dentist.entity';

@Injectable()
export class PatientsRepository {
  constructor(
    @InjectRepository(Patient) private patientsRepository: Repository<Patient>,
  ) {}

  async getAllPatients(paginationDto: { page: number; limit: number }): Promise<Patient[]> {
    const { page, limit } = paginationDto;
    const role = 'patient';

    const queryBuilder = this.patientsRepository
      .createQueryBuilder('patients')
      .leftJoinAndSelect('patients.person', 'person')
      .leftJoinAndSelect('patients.appointments', 'appointments')
      .leftJoinAndSelect('patients.dentalRecord', 'dentalRecord')
      .leftJoinAndSelect('person.roles', 'roles')
      .where('roles.name = :role', {role})
      .skip((page - 1) * limit)
      .take(limit);

    return await queryBuilder.getMany();
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

  async patientByDentistId(dentistId: Dentist['id'], paginationDto: { page: number; limit: number }): Promise<Patient[]> {
    const { page, limit } = paginationDto;

    const hasAppointments = await this.patientsRepository
    .createQueryBuilder('patients')
    .leftJoin('patients.appointments', 'appointments')
    .where('appointments.id IS NOT NULL')
    .getCount() > 0;

    let patients: Patient[] = []

    if (hasAppointments) {
      const queryBuilder = this.patientsRepository
      .createQueryBuilder('patients')
      .leftJoinAndSelect('patients.person', 'person')
      .leftJoin('patients.appointments', 'appointments')
      .leftJoin('appointments.dentist_id', 'dentist')
      .where('dentist.id = :dentistId', {dentistId})
      .skip((page - 1) * limit)
      .take(limit);

      const prevPatients: Patient[] = await queryBuilder.getMany()
      patients = [...prevPatients]
    }

    return patients;
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
