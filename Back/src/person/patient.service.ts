import { BadRequestException, Injectable } from '@nestjs/common';
import { PatientsRepository } from './patient.repository';
import { Person } from './entities/person.entity';
import { Patient } from './entities/patient.entity';
import { Dentist } from './entities/dentist.entity';

@Injectable()
export class PatientsService {
  constructor(
    private readonly patientsRepository: PatientsRepository,
) {}

  async getAllPatients(paginationDto: { page: number; limit: number }): Promise<Patient[]> {
    return await this.patientsRepository.getAllPatients(paginationDto);
  }

  async patientsQuantity() {
    return this.patientsRepository.patientsQuantity();
  }

  async patientByPersonId(personId: Person['id']): Promise<Patient> {
    const patient = await this.patientsRepository.patientByPersonId(personId);
    return patient;
  }

  async patientByDentistId(dentistId: Dentist['id'], paginationDto: { page: number; limit: number }): Promise<Patient[]> {
    const patients: Patient[] = await this.patientsRepository.patientByDentistId(dentistId, paginationDto);
    return patients;
  }

  async patientById(patientId: Patient['id']): Promise<Patient> {
    const patient = await this.patientsRepository.patientById(patientId);
    return patient;
  }  

  async createPatient(person: Person | Person['id']) {
    return await this.patientsRepository.createPatient(person);
  }

  async changeStatus(id: Patient['id']) {
    const patient: Patient = await this.patientById(id);
    if (!patient) throw new BadRequestException('No existe paciente con el id especificado.');
    
    return this.patientsRepository.changeStatus(patient);
  }
}
