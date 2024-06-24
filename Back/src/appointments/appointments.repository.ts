import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsRepository {
  constructor(
    @InjectRepository(Appointment) private appointment: Repository<Appointment>,
  ) {}
  async getAppointments(): Promise<Appointment[]> {
    return await this.appointment.find({
      relations: ['service'],
    });
  }
  async postAppointment(createAppointmentDto: CreateAppointmentDto) {
    return await this.appointment.save({
      date_time: createAppointmentDto.date_time,
      description: createAppointmentDto.description,
      dentist_id: createAppointmentDto.dentist_id,
      patient_id: createAppointmentDto.patient_id,
      service: createAppointmentDto.service,
    });
  }

  async getAppointmentById(id: string) {
    return await this.appointment.findOne({
      where: { id },
      relations: ['service'],
    });
  }

  async updateAppointment(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ) {
    console.log(updateAppointmentDto);
    return await this.appointment.update({ id }, updateAppointmentDto);
  }

  async removeAppointment(id: string) {
    return await this.appointment.delete({ id });
  }
}
