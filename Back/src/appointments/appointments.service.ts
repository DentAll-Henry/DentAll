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
import { CreatePendingAppointmentDto } from './dto/create_pending_appointment.dt';
import { Patient } from 'src/person/entities/patient.entity';
import { PatientsService } from 'src/person/patient.service';
import { Dentist } from 'src/person/entities/dentist.entity';
import { DentistsService } from 'src/person/dentist.service';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly dentalServService: DentalServService,
    private readonly patientsService: PatientsService,
    private readonly dentistService: DentistsService,
    private readonly mailService: MailService,
    private readonly systemConfigsService: SystemConfigsService,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    const dentServ: DentalServ = await this.dentalServService.getDentalServByID(
      createAppointmentDto.service,
    );
    if (!dentServ)
      throw new BadRequestException(
        'Servicio no encontrado con el id proporcionado',
      );
      throw new BadRequestException(
        'Servicio no encontrado con el id proporcionado',
      );

    const patient: Patient = await this.patientsService.patientById(
      createAppointmentDto.patient,
    );
    const patient: Patient = await this.patientsService.patientById(
      createAppointmentDto.patient,
    );
    if (!patient)
      throw new BadRequestException(
        'No se ha encontrado al paciente con el id proporcionado',
      );
      throw new BadRequestException(
        'No se ha encontrado al paciente con el id proporcionado',
      );

    const currentDate = new Date();
    if (new Date(createAppointmentDto.date_time) <= currentDate) {
      throw new BadRequestException(
        'La fecha de la cita debe ser una fecha futura',
      );
      throw new BadRequestException(
        'La fecha de la cita debe ser una fecha futura',
      );
    }

    const appointment_created: Appointment =
      await this.appointmentsRepository.postAppointment(createAppointmentDto);

    if (!appointment_created)
      throw new BadRequestException('No se ha podido crear la cita');
    if (!appointment_created)
      throw new BadRequestException('No se ha podido crear la cita');

    const appointment = await this.appointmentsRepository.getAppointmentById(
      appointment_created.id,
    );
    const appointment = await this.appointmentsRepository.getAppointmentById(
      appointment_created.id,
    );

    //send email
    /* await this.mailService.sendMail(
      patient.person['email'],
      'Nueva cita en DentAll',
      'new_appointment',
      {
        first_name: patient.person['first_name'],
        service: dentServ.name,
        date_time: createAppointmentDto.date_time,
        dentist: appointment.dentist_id['person']['first_name'],
      },
    ); */

    if (createAppointmentDto.pending_appointment_id) {
      const pending =
        await this.appointmentsRepository.getPendingAppointmentById(
          createAppointmentDto.pending_appointment_id,
        );
      const pending =
        await this.appointmentsRepository.getPendingAppointmentById(
          createAppointmentDto.pending_appointment_id,
        );
      if (pending) {
        await this.appointmentsRepository.removePendingAppointment(pending.id);
        await this.appointmentsRepository.removePendingAppointment(pending.id);
      }
    }

    return appointment;
  }

  async findAll(paginationDto: AppointmentPaginationDto) {
    return this.appointmentsRepository.getAppointments(paginationDto);
  }

  findByDentist(id: string, paginationDto: AppointmentPaginationDto) {
    return this.appointmentsRepository.getAppointmentByDentist(
      id,
      paginationDto,
    );
    return this.appointmentsRepository.getAppointmentByDentist(
      id,
      paginationDto,
    );
  }

  findByPatient(id: string, paginationDto: AppointmentPaginationDto) {
    return this.appointmentsRepository.getAppointmentByPatient(
      id,
      paginationDto,
    );
    return this.appointmentsRepository.getAppointmentByPatient(
      id,
      paginationDto,
    );
  }

  async findOne(id: string) {
    const appointment: Appointment =
      await this.appointmentsRepository.getAppointmentById(id);
    if (!appointment)
      throw new BadRequestException('No se ha encontrado la cita');

    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment: Appointment =
      await this.appointmentsRepository.getAppointmentById(id);
    if (!appointment)
      throw new BadRequestException('No se ha encontrado la cita');

    if (updateAppointmentDto.service) {
      const dentServ = await this.dentalServService.getDentalServByID(
        updateAppointmentDto.service,
      );
      if (!dentServ)
        throw new BadRequestException(
          'Servicio no encontrado con el id proporcionado',
        );
        throw new BadRequestException(
          'Servicio no encontrado con el id proporcionado',
        );

      //updateAppointmentDto.service = dentServ.id
    }

    if (updateAppointmentDto.patient) {
      const patient = await this.patientsService.patientById(
        updateAppointmentDto.patient,
      );
      if (!patient)
        throw new BadRequestException(
          'Paciente no encontrado con el id proporcionado',
        );
      const patient = await this.patientsService.patientById(
        updateAppointmentDto.patient,
      );
      if (!patient)
        throw new BadRequestException(
          'Paciente no encontrado con el id proporcionado',
        );
    }

    if (updateAppointmentDto.dentist_id) {
      const dentist = await this.dentistService.dentistById(
        updateAppointmentDto.dentist_id,
      );
      if (!dentist)
        throw new BadRequestException(
          'Dentista no encontrado con el id proporcionado',
        );
      const dentist = await this.dentistService.dentistById(
        updateAppointmentDto.dentist_id,
      );
      if (!dentist)
        throw new BadRequestException(
          'Dentista no encontrado con el id proporcionado',
        );
    }

    if (updateAppointmentDto.date_time) {
      const currentDate = new Date();
      if (new Date(updateAppointmentDto.date_time) <= currentDate) {
        throw new BadRequestException(
          'La fecha de la cita debe ser una fecha futura',
        );
        throw new BadRequestException(
          'La fecha de la cita debe ser una fecha futura',
        );
      }
    }

    await this.appointmentsRepository.updateAppointment(
      id,
      updateAppointmentDto,
    );
    return await this.appointmentsRepository.getAppointmentById(id);
  }

  async getAvailableSlots(getAvailableSlotsDto: GetAvailableSlotsDto) {
    const { start_date, end_date, dentist_id, time_slots } = getAvailableSlotsDto
    const dentist = await this.dentistService.dentistById(dentist_id);
    if (!dentist)
      throw new BadRequestException(
        'Dentista no encontrado con el id proporcionado',
      );
    const dentist = await this.dentistService.dentistById(dentist_id);
    if (!dentist)
      throw new BadRequestException(
        'Dentista no encontrado con el id proporcionado',
      );

    const currentDate = new Date();
    const currentDate = new Date();

    const dates = [];
    let startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const dates = [];
    let startDate = new Date(start_date);
    const endDate = new Date(end_date);

    while (startDate <= endDate) {
      const slotsEnFecha = {
        date: new Date(startDate),
        slots: await this.getSlots(startDate),
      };
      dates.push(slotsEnFecha);
      startDate.setDate(startDate.getDate() + 1);
        slots: await this.getSlots(startDate),
      };
      dates.push(slotsEnFecha);
      startDate.setDate(startDate.getDate() + 1);
    }
    console.time("getSlots")
    const available_slots = []

    if (time_slots) {
      for (const fecha of dates) {

        const available_slots_day = await Promise.all(fecha.slots.map(async (slot: Date) => {

          const appointment = await this.appointmentsRepository.getAppointmentsByDate(slot, dentist_id)

          if (!appointment) {
            return slot
          }

        }))

        available_slots.push(available_slots_day)
      }
    } else {
      const cantidad_slots = await this.getSlots(dates[0].date)

      const available_slots_day = await Promise.all(dates.map(async (fecha) => {
        const total = await this.appointmentsRepository.getWholeDayByDentist(dentist_id, fecha.date)
        if (total.length < cantidad_slots.length) return [fecha.date]
      }))

      available_slots.push(available_slots_day)
      /* for (const fecha of dates) {
        const available_slots_day = [];

       for (const slot of fecha.slots) {
         if (available_slots_day.length > 0) break
         const appointment = await this.appointmentsRepository.getAppointmentsByDate(slot, dentist_id);

         if (!appointment) {
           available_slots_day.push(slot);
         }
       } 
        const available_slots_day = await Promise.all(fecha.slots.map(async (slot: Date) => {

          const appointment = await this.appointmentsRepository.getAppointmentsByDate(slot, dentist_id)

          if (!appointment) {
            return slot
          }

        }))

        available_slots.push(available_slots_day);

      } */
    }

    console.timeEnd("getSlots")
    return {
      availabity: available_slots.map((slot_day) =>
        slot_day.filter((slot: Date) => slot !== undefined),
      ),
    };
      availabity: available_slots.map((slot_day) =>
        slot_day.filter((slot: Date) => slot !== undefined),
      ),
    };
  }

  async getSlots(date: Date) {
    const slots: Date[] = [];
    const start_time = await this.systemConfigsService.findOne('open_time');
    const end_time = await this.systemConfigsService.findOne('close_time');
    const duration = await this.systemConfigsService.findOne(
      'appointment_duration',
    );
    const slots: Date[] = [];
    const start_time = await this.systemConfigsService.findOne('open_time');
    const end_time = await this.systemConfigsService.findOne('close_time');
    const duration = await this.systemConfigsService.findOne(
      'appointment_duration',
    );

    if (!start_time || !end_time || !duration)
      throw new BadRequestException(
        'No se ha podido obtener los horarios. System configs not found',
      );
    if (!start_time || !end_time || !duration)
      throw new BadRequestException(
        'No se ha podido obtener los horarios. System configs not found',
      );

    const start_datetime = new Date(date);
    const [start_hour, start_minute] = start_time.value.split(':');
    start_datetime.setHours(parseInt(start_hour));
    start_datetime.setMinutes(parseInt(start_minute));
    start_datetime.setHours(parseInt(start_hour));
    start_datetime.setMinutes(parseInt(start_minute));

    const end_datetime = new Date(date);
    const [end_hour, end_minute] = end_time.value.split(':');
    end_datetime.setHours(parseInt(end_hour));
    end_datetime.setMinutes(parseInt(end_minute));
    end_datetime.setHours(parseInt(end_hour));
    end_datetime.setMinutes(parseInt(end_minute));

    const duration_minutes = parseInt(duration.value);
    const duration_minutes = parseInt(duration.value);

    while (start_datetime < end_datetime) {
      slots.push(new Date(start_datetime));
      start_datetime.setMinutes(start_datetime.getMinutes() + duration_minutes);
      slots.push(new Date(start_datetime));
      start_datetime.setMinutes(start_datetime.getMinutes() + duration_minutes);
    }

    return slots;
    return slots;
  }

  async getPendingAppointmentsByPatient(patient_id: string) {
    const patient = await this.patientsService.patientById(patient_id);
    if (!patient)
      throw new BadRequestException(
        'Paciente no encontrado con el id proporcionado',
      );
    if (!patient)
      throw new BadRequestException(
        'Paciente no encontrado con el id proporcionado',
      );

    return this.appointmentsRepository.getPendingAppointmentsByPatient(
      patient_id,
    );
    return this.appointmentsRepository.getPendingAppointmentsByPatient(
      patient_id,
    );
  }

  async createPendingAppointmentRequest(
    createPendingAppointmentDto: CreatePendingAppointmentDto,
  ) {
    const { patient, service } = createPendingAppointmentDto;
  async createPendingAppointmentRequest(
    createPendingAppointmentDto: CreatePendingAppointmentDto,
  ) {
    const { patient, service } = createPendingAppointmentDto;

    const patientData = this.patientsService.patientById(patient);
    if (!patientData)
      throw new BadRequestException(
        'Paciente no encontrado con el id proporcionado',
      );
    const patientData = this.patientsService.patientById(patient);
    if (!patientData)
      throw new BadRequestException(
        'Paciente no encontrado con el id proporcionado',
      );

    const serviceData = this.dentalServService.getDentalServByID(service);
    if (!serviceData)
      throw new BadRequestException(
        'Servicio no encontrado con el id proporcionado',
      );
    const serviceData = this.dentalServService.getDentalServByID(service);
    if (!serviceData)
      throw new BadRequestException(
        'Servicio no encontrado con el id proporcionado',
      );

    return this.appointmentsRepository.createPendingAppointmentRequest(
      createPendingAppointmentDto,
    );
    return this.appointmentsRepository.createPendingAppointmentRequest(
      createPendingAppointmentDto,
    );
  }

  async remove(id: string) {
    const appointment: Appointment =
      await this.appointmentsRepository.getAppointmentById(id);
    if (!appointment)
      throw new BadRequestException(
        'No se ha encontrado la cita con el id proporcionado',
      );
      throw new BadRequestException(
        'No se ha encontrado la cita con el id proporcionado',
      );

    console.log();
    console.log();

    const res = await this.appointmentsRepository.removeAppointment(id);
    if (res.affected === 0)
      throw new BadRequestException('Error al intentar cancelar la cita');
    if (res.affected === 0)
      throw new BadRequestException('Error al intentar cancelar la cita');

    await this.mailService.sendMail(
      appointment.patient['person']['email'],
      'Confirmacion de cancelacion de su cita en DentAll',
      'cancel_appointment',
      {
        first_name: appointment.patient['person']['first_name'],
        date_time: appointment.date_time,
      },
    );
    return 'Appointment deleted succesfully';
  }
}
