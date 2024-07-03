import { Injectable } from '@nestjs/common';
import { DentistsRepository } from './dentist.repository';
import { Person } from './entities/person.entity';
import { Roles } from 'src/role/enums/roles.enum';
import { Dentist } from './entities/dentist.entity';
import { SpecialtyService } from 'src/specialty/specialty.service';
import { PeopleService } from './person.service';
import { Specialty } from 'src/specialty/specialty.entity';

@Injectable()
export class DentistsService {
  constructor(
    private readonly dentistsRepository: DentistsRepository,
    private readonly peopleService: PeopleService,
    private readonly specialtiesService: SpecialtyService,
  ) {}

  async getAllDentists(paginationDto: { page: number; limit: number }) {
    return this.dentistsRepository.getAllDentists(paginationDto);
  }

  async get4BestRateDentists() {
    return this.dentistsRepository.get4BestRateDentists();
  }

  async dentistsBySpecialty(specialtyName: Specialty['name']) {
    return this.dentistsRepository.dentistsBySpecialty(specialtyName);
  }

  async dentistById(id: string) {
    return this.dentistsRepository.dentistById(id);
  }

  async dentistByPersonId(idperson: Person['id']) {
    return this.dentistsRepository.dentistByPersonId(idperson);
  }

  async createDentist(dentistInfo: {
    specialtyName?: string;
    rate?: number;
    personId: string;
  }) {
    const { specialtyName, rate, personId } = dentistInfo;
    const person: Person = await this.peopleService.addRole(
      personId,
      { roleName: Roles.DENTIST },
    );
    let dentistToCreate: Partial<Dentist>;
    if (specialtyName) {
      const specialty =
        await this.specialtiesService.SpecialtyByName(specialtyName);
      if (specialty instanceof Specialty) {
        dentistToCreate = {
          specialty,
          rate,
          person,
        };
      } else {
        dentistToCreate = {
          rate,
          person,
        };
      }
      return await this.dentistsRepository.createDentist(dentistToCreate);
    }
    dentistToCreate = {
      rate,
      person,
    };
    return await this.dentistsRepository.createDentist(dentistToCreate);
  }

  async changeDentistStatus(id: string) {
    const dentist: Dentist = await this.dentistById(id);
    return this.dentistsRepository.changeDentistStatus(dentist);
  }
}
