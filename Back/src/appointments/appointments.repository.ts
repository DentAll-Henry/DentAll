import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentPaginationDto } from 'src/common/dto/paginationDto';
import { PendingAppointment } from './entities/pending.appointments';
import { Patient } from 'src/person/entities/patient.entity';
import { CreatePendingAppointmentDto } from './dto/create_pending_appointment.dto';
import { SystemConfigsService } from 'src/system_configs/system_configs.service';
import { start } from 'repl';
import { GetLastAppointmentDateDto } from './dto/get-last-appointment-date.dto';

@Injectable()
export class AppointmentsRepository {
  constructor(
    @InjectRepository(Appointment) private appointment: Repository<Appointment>,
    @InjectRepository(PendingAppointment) private pendingAppointmentRepository: Repository<PendingAppointment>,
    private readonly systemConfigsService: SystemConfigsService
  ) { }
  async getAppointments(paginationDto: AppointmentPaginationDto): Promise<Appointment[]> {
    const { page, limit, only_future, only_past, start, end, dentists } = paginationDto;
    
    const dentists_arr = dentists.length > 0 ? dentists.split(',') : ['a7d57f3d-46ec-437a-966e-3c7f45180f12'];

    const duration_minutes = await this.systemConfigsService.findOne(
      'appointment_duration',
    );
    const duration = parseInt(duration_minutes.value);

    const queryBuilder = this.appointment.createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.service', 'service')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .leftJoinAndSelect('patient.person', 'person_')
      .leftJoinAndSelect('appointment.dentist_id', 'dentist')
      .leftJoinAndSelect('dentist.person', 'person')
      .andWhere('DATE(appointment.date_time) >= :start', { start })
      .andWhere('DATE(appointment.date_time) <= :end', { end })
      .andWhere('appointment.dentist_id IN (:...dentists)', { dentists: dentists_arr })

    if (only_future) {
      queryBuilder.andWhere('appointment.date_time > NOW()');
    }

    if (only_past) {
      queryBuilder.andWhere('appointment.date_time < NOW()');
    }

    const data = await queryBuilder.getMany();

    const events = []
    data.map(cita => {
      const event = {
        title: `${cita.patient['person']['first_name']} ${cita.patient['person']['last_name']}`,
        start: new Date(cita.date_time),
        end: new Date(cita.date_time).setMinutes(new Date(cita.date_time).getMinutes() + duration),
        extendedProps: {
          dentist: cita.dentist_id['person']['first_name'],
          service: cita.service['name']
        },
        color: `#${cita.dentist_id['id'].replace(/-/g, '').slice(0, 6)}`,
        groupId: cita.dentist_id['id'],
        description: cita.description,
        id: cita.id
      }
      events.push(event)
    })
    return events
  }

  async getAppointmentByDentist(dentist_id: string, paginationDto: AppointmentPaginationDto): Promise<Appointment[]> {
    const { page, limit, only_future, only_past } = paginationDto;
    const queryBuilder = this.appointment.createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.service', 'service')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .where('appointment.dentist_id = :dentist_id', { dentist_id })
      .skip((page - 1) * limit)
      .take(limit);

    if (only_future) {
      queryBuilder.andWhere('appointment.date_time > NOW()');
    }

    if (only_past)
      queryBuilder.andWhere('appointment.date_time < NOW()');

    return await queryBuilder.getMany();
  }

  async getAppointmentByPatient(patient_id: string, paginationDto: AppointmentPaginationDto): Promise<Appointment[]> {
    const { page, limit, only_future, only_past } = paginationDto;
    const queryBuilder = this.appointment.createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.service', 'service')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .leftJoinAndSelect('appointment.payment', 'payment')
      .where('appointment.patient = :patient_id', { patient_id })
      .leftJoinAndSelect('appointment.dentist_id', 'dentist')
      .leftJoinAndSelect('dentist.person', 'person')
      .orderBy('appointment.date_time', 'ASC')
      .skip((page - 1) * limit)
      .take(limit);

    if (only_future) {
      queryBuilder.andWhere('appointment.date_time > NOW()');
    }

    if (only_past)
      queryBuilder.andWhere('appointment.date_time < NOW()');

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
      //expiration_date: createAppointmentDto.expiration_date ? createAppointmentDto.expiration_date : null
    });
  }

  async getAppointmentById(id: string): Promise<Appointment> {
    
    return await this.appointment.findOne({
      where: { id },
      relations: ['service', 'patient.person', 'dentist_id.person'],
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
      throw new BadRequestException(error);
    }

  }

  async getWholeDayByDentist(dentist_id: string, date: Date) {
    try {
      const queryBuilder = await this.appointment.createQueryBuilder('appointment')
        .where('appointment.dentist_id = :dentist_id', { dentist_id })
        .andWhere('DATE(appointment.date_time) = :date', { date })
        .getMany()


      return queryBuilder
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getAppointmentsByDate(date_time: Date, dentist_id: string) {
    return await this.appointment.findOne({ where: { date_time, dentist_id: { id: dentist_id } } });
  }

  async getPendingAppointmentById(pending_appointment_id: string) {
    return await this.pendingAppointmentRepository.findOne({ where: { id: pending_appointment_id } });
  }

  async createPendingAppointmentRequest(createPendingAppointmentDto: CreatePendingAppointmentDto) {
    return await this.pendingAppointmentRepository.save(createPendingAppointmentDto);
  }

  async getPendingAppointmentsByPatient(patient_id: string) {
    const queryBuilder = this.pendingAppointmentRepository.createQueryBuilder('pending_appointments')
      .leftJoinAndSelect('pending_appointments.service', 'service')
      .leftJoinAndSelect('pending_appointments.patient', 'patient')
      .where('pending_appointments.patient = :patient_id', { patient_id })

    return await queryBuilder.getMany();
  }

  async removePendingAppointment(id: string) {
    const response = await this.pendingAppointmentRepository.delete(id);
    return response.affected ? 'Cita eliminada de pendientes' : 'Error al eliminar la cita de pendientes';
  }

  async removeAppointment(id: string) {

    return await this.appointment.delete({ id });
  }

  async execute_querys(queryStoredProcedure: string) {
    return await this.appointment.query(queryStoredProcedure)
  }

  async getDaysWithSlots(start_date: Date, end_date: Date, dentist_id: string, max_appointments: number) {

    const query = `
            WITH RECURSIVE dates_list AS (
                SELECT
                    $1::"timestamp" AS fecha
                UNION ALL
                SELECT
                    fecha + '1 day'::INTERVAL
                FROM
                    dates_list
                WHERE
                    fecha < $2::DATE
            )
            SELECT
                DATE(dates_list.fecha) AS date_time,
                COALESCE(COUNT(appointments.id), 0) AS total_registros
            FROM
                dates_list
            LEFT JOIN
                appointments ON DATE(dates_list.fecha) = DATE(appointments.date_time) AND appointments.dentist_id = $3
            GROUP BY
                DATE(dates_list.fecha)
            HAVING COALESCE(COUNT(appointments.id), 0) < $4 
            ORDER BY
                DATE(dates_list.fecha);
        `;

    const results = await this.appointment.query(query, [start_date, end_date, dentist_id, max_appointments]);

    return results.map((result: any) => result.date_time);
  }


  async getLastAppointment(getLastAppointmentDate: GetLastAppointmentDateDto) {
    const {dentist_id, patient_id} = getLastAppointmentDate
    return await this.appointment
      .createQueryBuilder('appointment')
      .select('appointment.date_time')
      .leftJoin('appointment.patient', 'patient')
      .where('appointment.dentist_id = :dentist_id', { dentist_id })
      .andWhere('appointment.patient = :patient_id', { patient_id })
      .andWhere('appointment.date_time < NOW()')
      .orderBy('appointment.date_time', 'DESC')
      .getOne();
  }
}
