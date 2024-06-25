import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { SystemicBackground } from './entities/systemicBackground.entity';

@Injectable()
export class SystemicBackgroundRepository {
  constructor(
    @InjectRepository(SystemicBackground)
    private systemicBackgroundRepository: Repository<SystemicBackground>,
  ) {}

  async getSystemicBackgrounds() {
    try {
      return await this.systemicBackgroundRepository.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
