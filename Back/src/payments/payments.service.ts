import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from './payments.repository';
import { PaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}

  async createPreference(data: PaymentDto) {
    return this.paymentsRepository.createPreference(data);
  }
}
