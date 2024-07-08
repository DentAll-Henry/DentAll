import { BadRequestException, Injectable } from '@nestjs/common';
import { DentistsRepository } from './dentist.repository';
import { Person } from './entities/person.entity';
import { Roles } from 'src/role/enums/roles.enum';
import { Dentist } from './entities/dentist.entity';
import { SpecialtyService } from 'src/specialty/specialty.service';
import { PeopleService } from './person.service';
import { Specialty } from 'src/specialty/specialty.entity';
import { DentalServ } from 'src/dentalServ/entities/dentalServ.entity';
import { DentalServService } from 'src/dentalServ/dentalServ.service';

@Injectable()
export class DentistsService {
  constructor(
    private readonly dentistsRepository: DentistsRepository,
    private readonly peopleService: PeopleService,
    private readonly specialtiesService: SpecialtyService,
    private readonly dentalServService: DentalServService,
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

  async dentistsByDentalServ(dentalServName: DentalServ['name']) {
    return this.dentistsRepository.dentistsByDentalServ(dentalServName);
  }

  async dentistByPersonId(idperson: Person['id']) {
    return this.dentistsRepository.dentistByPersonId(idperson);
  }

  async dentistById(id: string) {
    return this.dentistsRepository.dentistById(id);
  }

  async createDentist(dentistInfo: {
    specialtyName?: string;
    rate?: number;
    personId: string;
  }) {
    const { specialtyName, rate, personId } = dentistInfo;
    const person: Person = await this.peopleService.addRole(personId, {
      roleName: Roles.DENTIST,
    });
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
    const dentistPerson: Person = dentist.person as Person;
    if (dentist.is_active) {
      await this.peopleService.delRole(dentistPerson.id, {
        roleName: Roles.DENTIST,
      });
    } else {
      await this.peopleService.addRole(dentistPerson.id, {
        roleName: Roles.DENTIST,
      });
    }
    return this.dentistsRepository.changeDentistStatus(dentist);
  }

  async addDentalServ(
    id: string,
    dentalServNames: { name: DentalServ['name'] }[],
  ) {
    const dentalServNamesSet = new Set(dentalServNames.map((d) => d.name));

    const allDentalServices: DentalServ[] =
      await this.dentalServService.getDentalServ(1, 150);
    const dentalServices = allDentalServices.filter((dentalServ) =>
      dentalServNamesSet.has(dentalServ.name),
    );

    const dentist: Dentist = await this.dentistById(id);
    if (!dentist)
      throw new BadRequestException('No existe dentista con ese ID.');

    const dentistWithDentalServ: Dentist =
      await this.dentistsRepository.addDentalServ(dentist, dentalServices);
    return dentistWithDentalServ;
  }
}
