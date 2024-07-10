import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from './payments.repository';
import { PaymentDto } from './dto/payment.dto';
import { PatientsService } from 'src/person/patient.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentsRepository: PaymentsRepository,
    private readonly patientsService: PatientsService
  ) { }

  async createPreference(data: PaymentDto, baseUrl: string) {
    return this.paymentsRepository.createPreference(data, baseUrl);
  }

  async success(data) {
    return await this.paymentsRepository.success(data);
  }

  async getPaymentsByPatient(patient_id: string) {
    const patient = await this.patientsService.patientById(patient_id);
    if (!patient) throw new Error('Paciente no encontrado con el id proporcionado');
    return await this.paymentsRepository.getPaymentsByPatient(patient_id);
  }

  async getPaymentById(payment_id: string) {
    return await this.paymentsRepository.getPaymentById(payment_id);
  }

  // async failure(data) {
  //   return await this.paymentsRepository.failure(data);
  // }
}
