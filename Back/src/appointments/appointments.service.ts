import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentsRepository } from './appointments.repository';
import { DentalServRepository } from 'src/dentalServ/dentalServ.repository';
import { Appointment } from './entities/appointment.entity';
import { MailService } from 'src/mail/mail.service';
import { PeopleRepository } from 'src/person/person.repository';
import { PeopleService } from 'src/person/person.service';
import { DentalServService } from 'src/dentalServ/dentalServ.service';
import { Person } from 'src/person/entities/person.entity';
import { DentalServ } from 'src/dentalServ/dentalServ.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly dentalServService: DentalServService,
    private readonly peopleService: PeopleService,
    private readonly mailService: MailService
  ) { }
  async create(createAppointmentDto: CreateAppointmentDto) {
    const dentServ: DentalServ = await this.dentalServService.getDentalServByID(createAppointmentDto.service)
    if (!dentServ)
      throw new BadRequestException('Service not found with id provided');

    const patient: Person = await this.peopleService.personById(createAppointmentDto.patient)
    if (!patient)
      throw new BadRequestException('Patient not found with id provided');

    const currentDate = new Date();
    if (new Date(createAppointmentDto.date_time) <= currentDate) {
      throw new BadRequestException('Appointment date must be a future date');
    }

    const appointment: Appointment = await this.appointmentsRepository.postAppointment(createAppointmentDto);

    if (!appointment)
      throw new BadRequestException('Appointment not created');

    //send email
    await this.mailService.sendMail(patient.email, "New appointment at DentAll", `Hi ${patient.first_name} ${patient.last_name} you have been scheduled a new appointment at ${appointment.date_time} for ${dentServ.name}`, `Hi ${patient.first_name} ${patient.last_name} you have been scheduled a new appointment at ${appointment.date_time} for ${dentServ.name}`)

    return appointment
  }

  findAll() {
    return this.appointmentsRepository.getAppointments();
  }

  findByDentist(id: string) {
    return this.appointmentsRepository.getAppointmentByDentist(id);
  }

  findByPatient(id: string) {
    return this.appointmentsRepository.getAppointmentByPatient(id);
  }

  async findOne(id: string) {
    const appointment: Appointment = await this.appointmentsRepository.getAppointmentById(id);
    if (!appointment)
      throw new BadRequestException('Appointment not found with id provided');

    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {

    const appointment: Appointment = await this.appointmentsRepository.getAppointmentById(id);
    if (!appointment)
      throw new BadRequestException('Appointment not found with id provided');

    if (updateAppointmentDto.service) {
      const dentServ = await this.dentalServService.getDentalServByID(updateAppointmentDto.service)
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

    await this.appointmentsRepository.updateAppointment(id, updateAppointmentDto)
    return await this.appointmentsRepository.getAppointmentById(id);
  }

  async remove(id: string) {
    const appointment: Appointment = await this.appointmentsRepository.getAppointmentById(id);
    if (!appointment)
      throw new BadRequestException('Appointment not found with id provided');

    this.appointmentsRepository.removeAppointment(id);
    return "Appointment deleted succesfully";
  }
}
