import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Headquarter } from './entities/headquarter.entity';
import { Cords } from './entities/cords.entity';
import { HeadquarterController } from './headquarter.controller';
import { HeadquarterService } from './headquarter.service';
import { HeadquarterRepository } from './headquarter.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Headquarter, Cords])],
  controllers: [HeadquarterController],
  providers: [HeadquarterService, HeadquarterRepository],
})
export class HeadquarterModule {}
