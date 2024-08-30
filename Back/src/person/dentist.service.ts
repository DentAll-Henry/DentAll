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

  async getAllDentistsActive(paginationDto: { page: number; limit: number }) {
    return this.dentistsRepository.getAllDentistsActive(paginationDto);
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

  async dentistsQuantity() {
    return this.dentistsRepository.dentistsQuantity();
  }

  async dentalServicesWhitDentists() {
    return this.dentistsRepository.dentalServicesWithDentist();
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
    description?: string;
    dentalServName?: string;
  }) {
    const { specialtyName, rate, personId, description, dentalServName } = dentistInfo;
    const person: Person = await this.peopleService.addRole(personId, {
      roleName: Roles.DENTIST,
    });
    let dentistToCreate: Partial<Dentist>;
    let specialty: Specialty;
    let dental_services: DentalServ[] = [];
    
    if (specialtyName) {
      const specialtyResponse =
        await this.specialtiesService.SpecialtyByName(specialtyName);
      if (specialtyResponse instanceof Specialty) {
        specialty = specialtyResponse;
      } else {
        const specialtyResponse = await this.specialtiesService.SpecialtyByName("Odontología general") as Specialty;
        specialty = specialtyResponse;
      }
    }

    if (dentalServName) {
      try {
        const dentalServResponse = await this.dentalServService.getDentalServByName(dentalServName);
        dental_services.push(dentalServResponse[0])
      } catch {
        const dentalServResponse = await this.dentalServService.getDentalServByName("Consulta de valoración");
        dental_services.push(dentalServResponse[0])
      }
    }

    dentistToCreate = {
      rate,
      person,
      description,
      specialty,
      dental_services,
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

    const allDentalServices = await this.dentalServService.getDentalServ(
      1,
      150,
    );
    const dentalServices = allDentalServices.services.filter((dentalServ) =>
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
