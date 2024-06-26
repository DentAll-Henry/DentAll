import { BadRequestException, Injectable } from '@nestjs/common';
import { ClinicalHistoryRepository } from './clinicalHistory.repository';
import { ClinicalHistory } from './entities/clinicalHistory.entity';
import { ClinicalHistoryDto } from './dtos/clinicalHistory.dto';
import { validate } from 'class-validator';
import { SystemicBackgroundDto } from './dtos/systemicBackground.dto';
import { SystemicBackground } from './entities/systemicBackground.entity';

@Injectable()
export class ClinicalHistoryService {
  constructor(
    private readonly clinicalHistoryRepository: ClinicalHistoryRepository,
  ) {}
  async getClinicalHistories(): Promise<ClinicalHistory[]> {
    return await this.clinicalHistoryRepository.getClinicalHistories();
  }
  async getClinicalHistoryByID(id: string) {
    return await this.clinicalHistoryRepository.getClinicalHistoryByID(id);
  }

  async createClinicalHistory(data: ClinicalHistoryDto) {
    const { guard_card } = data;
    const sysArray = [];

    for (const background of data.systemicBackground) {
      if (background.info && background.name) {
        const systemicBackground = new SystemicBackground();
        Object.assign(systemicBackground, background);
        const errors = await validate(systemicBackground);
        if (errors.length > 0) {
          throw new BadRequestException(
            'Name must be string between 3 and 50 characters and Info must be string between 3 and 100 characters',
          );
        }
        sysArray.push(background);
      }
    }
    if (sysArray.length === 0) {
      throw new BadRequestException(
        'You must provide at least one item in the Systemic Background array, conformed by name and info',
      );
    }

    if (Object.keys(data).length === 0) {
      throw new BadRequestException(
        'You must provide Guard Card and Systemic Background',
      );
    }
    return await this.clinicalHistoryRepository.createClinicalHistory({
      guard_card,
      systemicBackground: sysArray,
    });
  }
}
