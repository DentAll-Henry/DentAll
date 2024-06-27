import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentPaginationDto } from 'src/common/dto/paginationDto';
import { GetAvailableSlotsDto } from './dto/get_available-slots.dto';

@Injectable()
export class AppointmentsRepository {
  constructor(
    @InjectRepository(Appointment) private appointment: Repository<Appointment>,
  ) { }
  async getAppointments(paginationDto: AppointmentPaginationDto): Promise<Appointment[]> {
    /* return await this.appointment.find({
      relations: ['service', 'patient'],
      skip: (page - 1) * limit,
      take: limit,
    }); */
    const { page, limit, only_future } = paginationDto;
    const queryBuilder = this.appointment.createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.service', 'service')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .skip((page - 1) * limit)
      .take(limit);

    if (only_future) {
      queryBuilder.andWhere('appointment.date_time > :now', { now: new Date() });
    }

    return await queryBuilder.getMany();
  }

  async getAppointmentByDentist(dentist_id: string, paginationDto: AppointmentPaginationDto): Promise<Appointment[]> {
    const { page, limit, only_future } = paginationDto;
    const queryBuilder = this.appointment.createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.service', 'service')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .where('appointment.dentist = :dentist_id', { dentist_id })
      .skip((page - 1) * limit)
      .take(limit);

    if (only_future) {
      queryBuilder.andWhere('appointment.date_time > :now', { now: new Date() });
    }

    return await queryBuilder.getMany();
  }

  async getAppointmentByPatient(patient_id: string, paginationDto: AppointmentPaginationDto): Promise<Appointment[]> {
    const { page, limit, only_future } = paginationDto;
    const queryBuilder = this.appointment.createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.service', 'service')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .where('appointment.patient = :patient_id', { patient_id })
      .skip((page - 1) * limit)
      .take(limit);

    if (only_future) {
      queryBuilder.andWhere('appointment.date_time > :now', { now: new Date() });
    }

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

  async removeAppointment(id: string) {
    const response = await this.appointment.delete({ id });
    return response.affected ? 'Appointment deleted' : 'Appointment not found';
  }
}
