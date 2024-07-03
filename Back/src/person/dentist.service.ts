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

  async dentistsByDentalServ(dentalServId: DentalServ['id']) {
    return this.dentistsRepository.dentistsByDentalServ(dentalServId);
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

  async addDentalServ(id: string, dentalServId: DentalServ['id']) {
    const dentalServ: DentalServ = await this.dentalServService.getDentalServByID(dentalServId);
    if (!dentalServ) throw new BadRequestException('No existe un servicio dental con ese ID.');
    const dentist: Dentist = await this.dentistById(id);
    if (!dentist) throw new BadRequestException('No existe dentista con ese ID.');
    const dentistWithDentalServ: Dentist = await this.dentistsRepository.addDentalServ(dentist, dentalServ);
    return dentistWithDentalServ;
  }
}
