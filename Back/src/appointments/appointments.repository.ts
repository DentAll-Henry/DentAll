import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { DentalServ } from 'src/dentalServ/dentalServ.entity';

@Injectable()
export class AppointmentsRepository {
  constructor(
    @InjectRepository(Appointment) private appointment: Repository<Appointment>,
    @InjectRepository(DentalServ) private dentalServ: Repository<DentalServ>,
  ) { }
  async getAppointments() {
    return await this.appointment.find();
  }
  async postAppointment(createAppointmentDto: CreateAppointmentDto) {
    const dentServ= await this.dentalServ.findOne({where: {id: createAppointmentDto.service_id}})
   
    return await this.appointment.save({
      date_time: createAppointmentDto.date_time,
      dentist_id: createAppointmentDto.dentist_id,
      patient_id: createAppointmentDto.patient_id,
      service_id: dentServ,
    });
  }
}
