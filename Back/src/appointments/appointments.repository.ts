import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsRepository {
  constructor(
    @InjectRepository(Appointment) private appointment: Repository<Appointment>,
  ) {}
  getAppointments() {
    return this.appointment.find();
  }
  postAppointment() {
    return this.appointment.save({
      date_time: new Date(),
      dentist_id: '1',
      patient_id: '1',
      service_id: '1',
    });
  }
}
