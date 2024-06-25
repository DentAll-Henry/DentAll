import { Injectable } from '@nestjs/common';
import { SystemicBackgroundRepository } from './systemicBackground.repository';

@Injectable()
export class SystemicBackgroundService {
  constructor(
    private readonly systemicItemRepository: SystemicBackgroundRepository,
  ) {}

  async getSystemicItems() {
    return await this.systemicItemRepository.getSystemicBackgrounds();
  }
}
