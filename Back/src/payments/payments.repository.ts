import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PaymentDto } from './dto/payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/person/entities/patient.entity';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { DentalServ } from 'src/dentalServ/entities/dentalServ.entity';
import { payment, preference } from 'src/config/mercadopago';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { environment } from 'src/config/environment';
import * as moment from 'moment-timezone';

@Injectable()
export class PaymentsRepository {
  constructor(
    @InjectRepository(Patient) private patient: Repository<Patient>,
    @InjectRepository(Payment) private payment: Repository<Payment>,
    @InjectRepository(DentalServ) private dentalServ: Repository<DentalServ>,
    @InjectRepository(Appointment) private appointment: Repository<Appointment>,
  ) {}

  async createPreference(data: PaymentDto, baseUrl: string) {
    try {
      const patient = await this.patient.findOne({
        where: { id: data.patient_id },
      });
      if (!patient)
        throw new BadRequestException(
          'No se encontró un paciente para la id: ' + data.patient_id,
        );
      const service = await this.dentalServ.findOne({
        where: { name: 'Consulta de valoración' },
      });
      if (!service)
        throw new BadRequestException(
          'No se encontró un servicio para de Consulta de valoracion ',
        );
      const appointment = await this.appointment.findOne({
        where: { id: data.appointment_id },
      });
      if (!appointment)
        throw new BadRequestException(
          'No se encontró una cita para la id: ' + data.appointment_id,
        );
      const date_of_expiration = moment
        .tz('America/Caracas')
        .add(10, 'minutes')
        .format();
      const body = {
        date_of_expiration,
        items: [
          {
            id: service.id,
            currency_id: 'ARS', // moked for the moment
            title: service.name,
            quantity: 1,
            unit_price: Number(service.price),
          },
        ],
        back_urls: {
          success: environment.fronturl + 'patients/appointments',
          failure: environment.fronturl + 'patients/appointments',
          pending: environment.fronturl + 'patients/appointments',
        },
        notification_url: `${environment.backUrl}payments/success/?patient_id=${patient.id}&dentalServ_id=${service.id}&appointment_id=${appointment.id}`,
        auto_return: 'approved',
        metadata: {
          appointment_id: appointment.id,
          patient_id: patient.id,
          service_id: service.id,
        }
      };

      const response = await preference.create({ body });
      return { preferenceId: response.id };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }

  async success(data) {
    try {
      if (!data.id2) {
        throw new BadRequestException('No se encontro el pago');
      }
      const paymentData = await payment.get({
        id: data.id2,
      });
      if (paymentData.status_detail == 'accredited') {
        const newPayment = await this.payment.create({
          date: new Date(),
          payment_id: paymentData.id,
          payment_status: paymentData.status_detail,
          patient: data.patient_id,
          dentalServ: data.dentalServ_id,
          appointment: data.appointment_id,
        });
        await this.payment.save(newPayment);
        return 'Pago exitoso';
      }
      return 'Error al pagar';
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      if (error?.error == 'resource not found') {
        throw new BadRequestException('No se encontro el pago');
      }
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }

  async getPaymentsByPatient(patient_id: string) {
    const queryBuilder = this.payment
      .createQueryBuilder('payments')
      .leftJoin('payments.patient', 'patients')
      .leftJoinAndSelect('payments.dentalServ', 'dentalServ')
      .leftJoinAndSelect('payments.appointment', 'appointment')
      .where('payments.patient = :patient_id', { patient_id })
      .orderBy('payments.date', 'DESC')
      .getMany();
    return await queryBuilder;
  }

  async getPaymentById(payment_id: string) {
    const queryBuilder = this.payment
      .createQueryBuilder('payments')
      .leftJoin('payments.patient', 'patients')
      .leftJoinAndSelect('payments.dentalServ', 'dentalServ')
      .leftJoinAndSelect('payments.appointment', 'appointment')
      .where('payments.id = :payment_id', { payment_id })
      .getOne();
    return await queryBuilder;
  }

  // async failure(data) {
  //   try {
  //     const payment = await this.payment.findOne({
  //       where: { preference_id: data.preference_id },
  //     });
  //     if (!payment) throw new BadRequestException('No se encontro el pago');
  //     await this.payment.update({ id: payment.id }, data);
  //     return;
  //   } catch (error) {
  //     if (error instanceof BadRequestException) {
  //       throw error;
  //     }
  //     throw new InternalServerErrorException('Error interno del servidor');
  //   }
  // }
}
