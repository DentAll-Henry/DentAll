import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from './payments.repository';
import { PaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}

  async createPreference(data: PaymentDto, baseUrl: string) {
    return this.paymentsRepository.createPreference(data, baseUrl);
  }

  async success(data) {
    return await this.paymentsRepository.success(data);
  }

  async failure(data) {
    return await this.paymentsRepository.failure(data);
  }
}
