import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeadCuarter } from './entities/headCuarter.entity';
import { Cords } from './entities/cords.entity';
import { HeadCuartersRepository } from './headCuarters.repository';
import { HeadCuarterController } from './headCuarters.controller';
import { HeadCuartersService } from './headCuarters.service';

@Module({
  imports: [TypeOrmModule.forFeature([HeadCuarter, Cords])],
  controllers: [HeadCuarterController],
  providers: [HeadCuartersService, HeadCuartersRepository],
})
export class HeadCuarterModule {}
