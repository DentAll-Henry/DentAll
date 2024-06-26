import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicalHistoryRepository } from './clinicalHistory.repository';

@Injectable()
export class ClinicalHistoryService {
  constructor(
    private readonly clinicalHistoryRepository: ClinicalHistoryRepository,
  ) {}
  async getClinicalHistories() {
    return await this.clinicalHistoryRepository.getClinicalHistories();
  }
}
