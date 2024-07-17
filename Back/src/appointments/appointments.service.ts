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
import { CreatePendingAppointmentDto } from './dto/create_pending_appointment.dto';
import { Patient } from 'src/person/entities/patient.entity';
import { PatientsService } from 'src/person/patient.service';
import { Dentist } from 'src/person/entities/dentist.entity';
import { DentistsService } from 'src/person/dentist.service';
import { GetLastAppointmentDateDto } from './dto/get-last-appointment-date.dto';
import { format } from 'date-fns';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly dentalServService: DentalServService,
    private readonly patientsService: PatientsService,
    private readonly dentistService: DentistsService,
    private readonly mailService: MailService,
    private readonly systemConfigsService: SystemConfigsService,
  ) { }

  async ensureStoredProcedureExists() {
    const checkIfExistsQuery = `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.routines
        WHERE routine_name = 'get_days_with_slots'
        AND routine_type = 'FUNCTION'
      );
    `;

    const result =
      await this.appointmentsRepository.execute_querys(checkIfExistsQuery);
    const exists = result[0].exists;

    if (!exists) {
      const createProcedureQuery = `
        CREATE OR REPLACE FUNCTION get_days_with_slots (start_date DATE, end_date DATE, dentist_id_param UUID, max_appointments INT) 
            RETURNS TABLE (
                date_time_col DATE
        ) AS $$
        DECLARE 
            fecha_actual DATE := start_date;
            appointment_count INT;
        BEGIN
            WHILE fecha_actual <= end_date 
            
            LOOP
                SELECT COUNT(*)
                INTO appointment_count
                FROM appointments
                WHERE DATE(date_time) = fecha_actual
                  AND dentist_id = dentist_id_param;
              
                IF appointment_count < max_appointments THEN
                    date_time_col := fecha_actual;
                    RETURN NEXT;
                END IF;

                fecha_actual := fecha_actual + INTERVAL '1 day';

            END LOOP;

            RETURN;
        END; 
        $$ LANGUAGE 'plpgsql';
      `;

      await this.appointmentsRepository.execute_querys(createProcedureQuery);
    }
  }

  async create(createAppointmentDto: CreateAppointmentDto) {

    const dentServ: DentalServ = await this.dentalServService.getDentalServByID(
      createAppointmentDto.service,
    );
    if (!dentServ)
      throw new BadRequestException(
        'Servicio no encontrado con el id proporcionado',
      );

    const patient: Patient = await this.patientsService.patientById(
      createAppointmentDto.patient,
    );
    if (!patient)
      throw new BadRequestException(
        'No se ha encontrado al paciente con el id proporcionado',
      );

    const currentDate = new Date();
    if (new Date(createAppointmentDto.date_time) <= currentDate) {
      throw new BadRequestException(
        'La fecha de la cita debe ser una fecha futura',
      );
    }

    /* let now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    createAppointmentDto.expiration_date = now; */

    const appointment_created: Appointment =
      await this.appointmentsRepository.postAppointment(createAppointmentDto);

    if (!appointment_created)
      throw new BadRequestException('No se ha podido crear la cita');

    const appointment = await this.appointmentsRepository.getAppointmentById(
      appointment_created.id,
    );

    if (createAppointmentDto.expiration_date === null)
      await this.appointmentsRepository.updateAppointment(appointment.id, {
        expiration_date: null
      });

    //send email

    await this.mailService.sendMail(

      patient.person['email'],
      'Nueva cita en DentAll',
      `<!DOCTYPE html>
<html>

<head>
  <title>Confirmacion de su cita</title>
</head>

<body>
  <h1>Hola, ${patient.person['first_name']}!</h1>
  <p>Solo queremos recordarte que su cita en DentAll sigue en nuestra agenda y esperamos verle pronto por aqui.</p>
  <h4>Detalles de su cita:</h4>
  <ul>
    <li>Fecha y hora: ${format(appointment.date_time, 'yyyy-MM-dd HH:mm')}</li>
    <li>Doctor: ${appointment.dentist_id['person']['first_name']} ${appointment.dentist_id['person']['last_name']}</li>
    <li>Servicio: ${appointment.service['name']}</li>
  </ul>
  <p>Si necesita realizar cambios, puede hacerlo en la sección de Citas de su cuenta en DentAll.</p>
  <p>Por favor, no dude en contactarnos si tiene alguna pregunta.</p>
  <p>Gracias por preferirnos.</p>
  <p>DentAll</p>
</body>

</html>`

    );


    if (createAppointmentDto.pending_appointment_id) {
      const pending =
        await this.appointmentsRepository.getPendingAppointmentById(
          createAppointmentDto.pending_appointment_id,
        );
      if (pending) {
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
  }

  findByPatient(id: string, paginationDto: AppointmentPaginationDto) {
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
    }

    if (updateAppointmentDto.dentist_id) {
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
      }
    }

    await this.appointmentsRepository.updateAppointment(
      id,
      updateAppointmentDto,
    );
    return await this.appointmentsRepository.getAppointmentById(id);
  }

  async getAvailableSlots(getAvailableSlotsDto: GetAvailableSlotsDto) {
    const { start_date, end_date, dentist_id, time_slots } =
      getAvailableSlotsDto;

    const dentist = await this.dentistService.dentistById(dentist_id);
    if (!dentist)
      throw new BadRequestException(
        'Dentista no encontrado con el id proporcionado',
      );

    const currentDate = new Date();

    const dates = [];
    let startDateLet = new Date(start_date);
    const endDate = new Date(end_date);

    while (startDateLet <= endDate) {
      const slotsEnFecha = {
        date: new Date(startDateLet),
        slots: await this.getSlots(startDateLet),
      };
      dates.push(slotsEnFecha);
      startDateLet.setDate(startDateLet.getDate() + 1);
    }

    const available_slots = [];

    if (time_slots) {
      for (const fecha of dates) {
        const available_slots_day = await Promise.all(
          fecha.slots.map(async (slot: Date) => {
            const appointment =
              await this.appointmentsRepository.getAppointmentsByDate(
                slot,
                dentist_id,
              );

            if (!appointment) {
              return slot;
            }
          }),
        );

        available_slots.push(available_slots_day);
      }
    } else {
      const cantidad_slots = (await this.getSlots(dates[0].date)).length;
      return await this.appointmentsRepository.getDaysWithSlots(
        start_date,
        end_date,
        dentist_id,
        cantidad_slots,
      );

      /*  

      const available_slots_day = await Promise.all(
        dates.map(async (fecha) => {
          const total = await this.appointmentsRepository.getWholeDayByDentist(
            dentist_id,
            fecha.date,
          );
          if (total.length < cantidad_slots.length) return fecha.date;
        }),
      );

      return await available_slots_day.filter((slot) => slot !== undefined); */
      //available_slots.push(available_slots_day);
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

    return {
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

    if (!start_time || !end_time || !duration)
      throw new BadRequestException(
        'No se ha podido obtener los horarios. System configs not found',
      );

    const start_datetime = new Date(date);
    const [start_hour, start_minute] = start_time.value.split(':');
    start_datetime.setHours(parseInt(start_hour));
    start_datetime.setMinutes(parseInt(start_minute));

    const end_datetime = new Date(date);
    const [end_hour, end_minute] = end_time.value.split(':');
    end_datetime.setHours(parseInt(end_hour));
    end_datetime.setMinutes(parseInt(end_minute));

    const duration_minutes = parseInt(duration.value);

    while (start_datetime < end_datetime) {
      slots.push(new Date(start_datetime));
      start_datetime.setMinutes(start_datetime.getMinutes() + duration_minutes);
    }

    return slots;
  }

  async getPendingAppointmentsByPatient(patient_id: string) {
    const patient = await this.patientsService.patientById(patient_id);
    if (!patient)
      throw new BadRequestException(
        'Paciente no encontrado con el id proporcionado',
      );

    return this.appointmentsRepository.getPendingAppointmentsByPatient(
      patient_id,
    );
  }

  async createPendingAppointmentRequest(
    createPendingAppointmentDto: CreatePendingAppointmentDto,
  ) {
    const { patient, service } = createPendingAppointmentDto;

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

    return this.appointmentsRepository.createPendingAppointmentRequest(
      createPendingAppointmentDto,
    );
  }

  async getLastAppointment(getLastAppointmentDate: GetLastAppointmentDateDto) {
    const dentist = await this.dentistService.dentistById(getLastAppointmentDate.dentist_id);
    if (!dentist) throw new BadRequestException('Dentista no encontrado con el id proporcionado');

    const patient = await this.patientsService.patientById(getLastAppointmentDate.patient_id);
    if (!patient) throw new BadRequestException('Paciente no encontrado con el id proporcionado');

    const data = await this.appointmentsRepository.getLastAppointment(
      getLastAppointmentDate,
    );
    if (!data) return { "date_time": null };

    return data
  }

  async remove(id: string) {
    const appointment: Appointment =
      await this.appointmentsRepository.getAppointmentById(id);
    if (!appointment)
      throw new BadRequestException(
        'No se ha encontrado la cita con el id proporcionado',
      );

    const res = await this.appointmentsRepository.removeAppointment(id);
    if (res.affected === 0)
      throw new BadRequestException('Error al intentar cancelar la cita');
    await this.mailService.sendMail(
      appointment.patient['person']['email'],
      'Confirmacion de cancelacion de su cita en DentAll',
      `<!DOCTYPE html>
        <html>

        <head>
            <title>Cancelacion de su cita</title>
        </head>

        <body>
            <h1>Hola, ${appointment.patient['person']['first_name']}!</h1>
            <p>Le notificamos que su cita ha sido cancelada en DentAll con exito.</p>
            <h4>Detalles de su cita:</h4>
            <ul>
                <li>Fecha y hora: ${format(appointment.date_time, 'yyyy-MM-dd HH:mm')}</li>
            </ul>
            <p>Si se trata de un error puede comunicarse con nosotros.</p>
            <p>Por favor, no dude en contactarnos si tiene alguna pregunta.</p>
            <p>Gracias por preferirnos.</p>
            <p>DentAll</p>
        </body>

        </html>`
    );
    return 'Appointment deleted succesfully';
  }
}
