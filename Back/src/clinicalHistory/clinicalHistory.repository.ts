import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicalHistory } from './entities/clinicalHistory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClinicalHistoryRepository {
  constructor(
    @InjectRepository(ClinicalHistory)
    private clinicalHistoryRepository: Repository<ClinicalHistory>,
  ) {}
  async getClinicalHistories() {
    try {
      return await this.clinicalHistoryRepository.find();
    } catch (error) {
      throw error;
    }
  }
}
