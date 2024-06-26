import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicalHistory } from './entities/clinicalHistory.entity';
import { SystemicBackgroundService } from './systemicBackground.service';
import { SystemicBackgroundRepository } from './systemicBackground.repository';
import { SystemicBackground } from './entities/systemicBackground.entity';
import { ClinicalHistoryController } from './clinicalHistory.controller';
import { ClinicalHistoryService } from './clinicalHistory.service';
import { ClinicalHistoryRepository } from './clinicalHistory.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClinicalHistory, SystemicBackground])],
  controllers: [ClinicalHistoryController],
  providers: [
    SystemicBackgroundService,
    SystemicBackgroundRepository,
    ClinicalHistoryService,
    ClinicalHistoryRepository,
  ],
})
export class ClinicalHistoryModule {}
