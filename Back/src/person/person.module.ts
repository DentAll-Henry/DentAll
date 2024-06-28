import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { PeopleController } from './person.controller';
import { PeopleService } from './person.service';
import { PeopleRepository } from './person.repository';
import { RolesModule } from '../role/role.module';
import { Guest } from './entities/guest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person]), RolesModule, TypeOrmModule.forFeature([Guest])],
  controllers: [PeopleController],
  providers: [PeopleService, PeopleRepository],
  exports: [PeopleService, TypeOrmModule],
})
export class PeopleModule {}
