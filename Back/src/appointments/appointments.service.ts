import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentsRepository } from './appointments.repository';
import { DentalServRepository } from 'src/dentalServ/dentalServ.repository';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
  ) {}
  create(createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsRepository.postAppointment(createAppointmentDto);
  }

  findAll() {
    return this.appointmentsRepository.getAppointments();
    return this.appointmentsRepository.getAppointments();
  }

  async findOne(id: string) {
    const appointment: Appointment =
      await this.appointmentsRepository.getAppointmentById(id);
    if (!appointment)
      throw new BadRequestException('Appointment not found with id provided');

    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment: Appointment =
      await this.appointmentsRepository.getAppointmentById(id);
    if (!appointment)
      throw new BadRequestException('Appointment not found with id provided');

    if (updateAppointmentDto.service) {
      const dentServ = await this.dentalServRepository.getDentalServByID(
        updateAppointmentDto.service,
      );
      if (!dentServ)
        throw new BadRequestException('Service not found with id provided');

      //updateAppointmentDto.service = dentServ.id
    }

    if (updateAppointmentDto.date_time) {
      const currentDate = new Date();
      if (new Date(updateAppointmentDto.date_time) <= currentDate) {
        throw new BadRequestException('Appointment date must be a future date');
      }
    }

    //TODO: check patient_id and dentist_id like service_id below

    await this.appointmentsRepository.updateAppointment(
      id,
      updateAppointmentDto,
    );
    return await this.appointmentsRepository.getAppointmentById(id);
  }

  async remove(id: string) {
    const appointment: Appointment =
      await this.appointmentsRepository.getAppointmentById(id);
    if (!appointment)
      throw new BadRequestException('Appointment not found with id provided');

    this.appointmentsRepository.removeAppointment(id);
    return 'Appointment deleted succesfully';
  }
}
