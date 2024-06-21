import { Module } from '@nestjs/common';
import { DentalServController } from './dentalServ.controller';
import { DentalServRepository } from './dentalServ.repository';
import { DentalServService } from './dentalServ.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DentalServ } from './dentalServ.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DentalServ])],
  controllers: [DentalServController],
  providers: [DentalServService, DentalServRepository],
})
export class DentalServModule {}
