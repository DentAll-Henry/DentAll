import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsRepository {
  constructor(
    @InjectRepository(Appointment) private appointment: Repository<Appointment>
  ) { }
  async getAppointments(): Promise<Appointment[]> {
    return await this.appointment.find({
      relations: ['service', 'patient'],
    });
  }

  async getAppointmentByDentist(id: string): Promise<Appointment[]> {
    return await this.appointment.find({
      where: { dentist_id: id },
      relations: ['service'],
    });
  }

  async getAppointmentByPatient(id: string): Promise<Appointment[]> {
    return await this.appointment.find({
      where: { patient: id },
      relations: ['service', 'patient'],
    });
  }

  async postAppointment(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {

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
      relations: ['service'],
    });
  }

  async updateAppointment(id: string, updateAppointmentDto: UpdateAppointmentDto) {

    return await this.appointment.update({ id }, updateAppointmentDto);
  }

  async removeAppointment(id: string) {
    return await this.appointment.delete({ id });
  }
}
