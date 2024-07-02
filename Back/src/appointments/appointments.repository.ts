import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentPaginationDto } from 'src/common/dto/paginationDto';
import { GetAvailableSlotsDto } from './dto/get_available-slots.dto';
import { PendingAppointment } from './entities/pending.appointments';
import { Patient } from 'src/person/entities/patient.entity';
import { CreatePendingAppointmentDto } from './dto/create_pending_appointment.dt';

@Injectable()
export class AppointmentsRepository {
  constructor(
    @InjectRepository(Appointment) private appointment: Repository<Appointment>,
    @InjectRepository(PendingAppointment) private pendingAppointmentRepository: Repository<PendingAppointment>,
  ) { }
  async getAppointments(paginationDto: AppointmentPaginationDto): Promise<Appointment[]> {
    const { page, limit, only_future, only_past } = paginationDto;
    const queryBuilder = this.appointment.createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.service', 'service')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .leftJoinAndSelect('patient.person', 'person_')
      .leftJoinAndSelect('appointment.dentist_id', 'dentist')
      .leftJoinAndSelect('dentist.person', 'person')
      .skip((page - 1) * limit)
      .take(limit);

    if (only_future) {
      queryBuilder.andWhere('appointment.date_time > :now', { now: new Date() });
    }

    if (only_past) {
      queryBuilder.andWhere('appointment.date_time < :now', { now: new Date() });
    }

    return await queryBuilder.getMany();
  }

  async getAppointmentByDentist(dentist_id: string, paginationDto: AppointmentPaginationDto): Promise<Appointment[]> {
    const { page, limit, only_future, only_past } = paginationDto;
    const queryBuilder = this.appointment.createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.service', 'service')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .where('appointment.dentist = :dentist_id', { dentist_id })
      .skip((page - 1) * limit)
      .take(limit);

    if (only_future) {
      queryBuilder.andWhere('appointment.date_time > :now', { now: new Date() });
    }

    if (only_past)
      queryBuilder.andWhere('appointment.date_time < :now', { now: new Date() });

    return await queryBuilder.getMany();
  }

  async getAppointmentByPatient(patient_id: string, paginationDto: AppointmentPaginationDto): Promise<Appointment[]> {
    const { page, limit, only_future, only_past } = paginationDto;
    const queryBuilder = this.appointment.createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.service', 'service')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .where('appointment.patient = :patient_id', { patient_id })
      .skip((page - 1) * limit)
      .take(limit);

    if (only_future) {
      queryBuilder.andWhere('appointment.date_time > :now', { now: new Date() });
    }

    if (only_past)
      queryBuilder.andWhere('appointment.date_time < :now', { now: new Date() });

    return await queryBuilder.getMany();
  }

  async postAppointment(createAppointmentDto: CreateAppointmentDto) {
    //: Promise<PartAppointment>
    return await this.appointment.save({
      date_time: createAppointmentDto.date_time,
      description: createAppointmentDto.description,
      dentist_id: createAppointmentDto.dentist_id,
      patient: createAppointmentDto.patient,
      service: createAppointmentDto.service,
    });
  }

  async getAppointmentById(id: string): Promise<Appointment> {
    return await this.appointment.findOne({
      where: { id },
      relations: ['service', 'patient'],
    });
  }

  async updateAppointment(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ) {
    try {
      this.appointment.update({ id }, updateAppointmentDto);
      return await this.getAppointmentById(id);
    } catch (error) {
      throw InternalServerErrorException
    }

  }

  async getAppointmentsByDate(date_time: Date, dentist_id: string) {
    return await this.appointment.findOne({ where: { date_time, dentist_id } });
  }

  async getPendingAppointmentById(pending_appointment_id: string) {
    return await this.pendingAppointmentRepository.findOne({ where: { id: pending_appointment_id } });
  }

  async createPendingAppointmentRequest(createPendingAppointmentDto: CreatePendingAppointmentDto) {
    return await this.pendingAppointmentRepository.save(createPendingAppointmentDto);
  }

  async getPendingAppointmentsByPatient(patient_id: string) {
    const queryBuilder = this.pendingAppointmentRepository.createQueryBuilder('pending_appointments')
      .leftJoinAndSelect('pending_appointments.service', 'service')
      .leftJoinAndSelect('pending_appointments.patient', 'patient')
      .where('pending_appointments.patient = :patient_id', { patient_id })

    return await queryBuilder.getMany();
  }

  async removePendingAppointment(id: string) {
    const response = await this.pendingAppointmentRepository.delete({ id });
    return response.affected ? 'Pending appointment deleted' : 'Pending appointment not found';
  }

  async removeAppointment(id: string) {
    const response = await this.appointment.delete({ id });
    return response.affected ? 'Appointment deleted' : 'Appointment not found';
  }
}
