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
import { DentalServ } from 'src/dentalServ/entities/dentalServ.entity';
import { AppointmentPaginationDto } from 'src/common/dto/paginationDto';
import { GetAvailableSlotsDto } from './dto/get_available-slots.dto';
import { SystemConfigsService } from 'src/system_configs/system_configs.service';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly dentalServService: DentalServService,
    private readonly peopleService: PeopleService,
    private readonly mailService: MailService,
    private readonly systemConfigsService: SystemConfigsService,
  ) { }
  async create(createAppointmentDto: CreateAppointmentDto) {
    const dentServ: DentalServ = await this.dentalServService.getDentalServByID(
      createAppointmentDto.service,
    );
    if (!dentServ)
      throw new BadRequestException('Service not found with id provided');

    //TODO: change this when patient service be created
    const patient: Person = await this.peopleService.personById(
      createAppointmentDto.patient,
    );
    if (!patient)
      throw new BadRequestException('Patient not found with id provided');

    const currentDate = new Date();
    if (new Date(createAppointmentDto.date_time) <= currentDate) {
      throw new BadRequestException('Appointment date must be a future date');
    }

    const appointment: Appointment =
      await this.appointmentsRepository.postAppointment(createAppointmentDto);

    if (!appointment) throw new BadRequestException('Appointment not created');

    //send email
    await this.mailService.sendMail(
      patient.email,
      'New appointment at DentAll',
      `Hi ${patient.first_name} ${patient.last_name} you have been scheduled a new appointment at ${appointment.date_time} for ${dentServ.name}`,
      `Hi ${patient.first_name} ${patient.last_name} you have been scheduled a new appointment at ${appointment.date_time} for ${dentServ.name}`,
    );

    return appointment;
  }

  findAll(paginationDto: AppointmentPaginationDto) {
    return this.appointmentsRepository.getAppointments(paginationDto);
  }

  findByDentist(id: string, paginationDto: AppointmentPaginationDto) {
    return this.appointmentsRepository.getAppointmentByDentist(id, paginationDto);
  }

  findByPatient(id: string, paginationDto: AppointmentPaginationDto) {
    return this.appointmentsRepository.getAppointmentByPatient(id, paginationDto);
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
      const dentServ = await this.dentalServService.getDentalServByID(
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

  async getAvailableSlots(getAvailableSlotsDto: GetAvailableSlotsDto) {
    const { date, dentist_id } = getAvailableSlotsDto

    const currentDate = new Date();
    if (new Date(date) < currentDate) {
      throw new BadRequestException('Date must be a future date');
    }

    //TODO: check if dentist exists


    const slots = await this.getSlots(date)

    const available = await Promise.all(slots.map(async slot => {
      const appointment = await this.appointmentsRepository.getAppointmentsByDate(slot, dentist_id)

      if (!appointment) return new Date(slot)
      
    }))

    return available.filter(slot => slot !== undefined)
  }

  async getSlots(date: Date) {
    const slots: Date[] = []
    const start_time = await this.systemConfigsService.findOne('open_time')
    const end_time = await this.systemConfigsService.findOne('close_time')
    const duration = await this.systemConfigsService.findOne('appointment_duration')

    if (!start_time || !end_time || !duration) throw new BadRequestException("Couldn't process this request. System configs not found");

    const start_datetime = new Date(date);
    const [start_hour, start_minute] = start_time.value.split(':');
    start_datetime.setHours(parseInt(start_hour))
    start_datetime.setMinutes(parseInt(start_minute))

    const end_datetime = new Date(date);
    const [end_hour, end_minute] = end_time.value.split(':');
    end_datetime.setHours(parseInt(end_hour))
    end_datetime.setMinutes(parseInt(end_minute))

    const duration_minutes = parseInt(duration.value)

    while (start_datetime < end_datetime) {
      slots.push(new Date(start_datetime))
      start_datetime.setMinutes(start_datetime.getMinutes() + duration_minutes)
    }

    return slots
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
