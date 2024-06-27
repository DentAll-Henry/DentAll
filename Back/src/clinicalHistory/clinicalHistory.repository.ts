import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicalHistory } from './entities/clinicalHistory.entity';
import { Repository } from 'typeorm';
import { SystemicBackgroundDto } from './dtos/systemicBackground.dto';
import { ClinicalHistoryDto } from './dtos/clinicalHistory.dto';
import { SystemicBackground } from './entities/systemicBackground.entity';

@Injectable()
export class ClinicalHistoryRepository {
  constructor(
    @InjectRepository(ClinicalHistory)
    private clinicalHistoryRepository: Repository<ClinicalHistory>,
    @InjectRepository(SystemicBackground)
    private systemicBackgroundRepository: Repository<SystemicBackground>,
  ) {}
  async getClinicalHistories() {
    try {
      return await this.clinicalHistoryRepository.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getClinicalHistoryByID(id: string): Promise<ClinicalHistory> {
    try {
      const history = await this.clinicalHistoryRepository.findOne({
        where: { id: id },
        relations: ['systemicBackground'],
      });
      if (!history) {
        throw new BadRequestException('Service not found for id: ' + id);
      }
      return history;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async createClinicalHistory(data: ClinicalHistoryDto) {
    try {
      const historyExists = await this.clinicalHistoryRepository.findOne({
        where: { guard_card: data.guard_card },
      });
      const sysArray = [];
      if (historyExists)
        throw new BadRequestException('Guard Card already exists');
      for (const background of data.systemicBackground) {
        const newBackgroundItem =
          this.systemicBackgroundRepository.create(background);

        const savedBackground =
          await this.systemicBackgroundRepository.save(newBackgroundItem);
        sysArray.push(newBackgroundItem);
      }

      const newHistory = this.clinicalHistoryRepository.create({
        guard_card: data.guard_card,
        date: new Date(),
        systemicBackground: sysArray,
      });

      const savedHistory =
        await this.clinicalHistoryRepository.save(newHistory);
      return savedHistory;
    } catch (error) {
      throw error;
    }
  }
}
