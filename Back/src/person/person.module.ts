import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { PeopleController } from './person.controller';
import { PeopleService } from './person.service';
import { PeopleRepository } from './person.repository';
import { RolesModule } from '../role/role.module';
import { Guest } from './entities/guest.entity';
import { Patient } from './entities/patient.entity';
import { Dentist } from './entities/dentist.entity';
import { DentistsService } from './dentist.service';
import { DentistsRepository } from './dentist.repository';
import { DentistsController } from './dentists.controller';
import { SpecialtyModule } from '../specialty/specialty.module';
import { PatientsController } from './patient.controller';
import { PatientsService } from './patient.service';
import { PatientsRepository } from './patient.repository';
import { DentalServModule } from '../dentalServ/dentalServ.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Person, Patient, Guest, Dentist]), RolesModule, SpecialtyModule, DentalServModule, FilesModule],
  controllers: [PeopleController, DentistsController, PatientsController],
  providers: [PeopleService, PeopleRepository, DentistsService, DentistsRepository, PatientsService, PatientsRepository],
  exports: [PeopleService, TypeOrmModule, PatientsService, DentistsService],
})
export class PeopleModule {}
