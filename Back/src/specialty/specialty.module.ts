import { Module } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { SpecialtyController } from './specialty.controller';

@Module({
  imports: [],
  providers: [SpecialtyService],
  controllers: [SpecialtyController],
})
export class SpecialtyModule {}
