import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { PeopleController } from './person.controller';
import { PeopleService } from './person.service';
import { PeopleRepository } from './person.repository';
import { RolesModule } from '../role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([Person]), RolesModule],
  controllers: [PeopleController],
  providers: [PeopleService, PeopleRepository],
  exports: [PeopleService, TypeOrmModule],
  imports: [AuthModule, TypeOrmModule.forFeature([Person])],
  controllers: [PeopleController],
  providers: [PeopleService, PeopleRepository],
  exports: [PeopleService, TypeOrmModule],
})
export class PeopleModule {}
