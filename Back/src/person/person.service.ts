import { BadRequestException, Injectable } from '@nestjs/common';
import { PeopleRepository } from './person.repository';
import { Person } from './entities/person.entity';
import { Role } from '../role/entities/role.entity';
import { RolesService } from '../role/role.service';
import { Roles } from '../role/enums/roles.enum';
import { CreatePersonDto } from './dtos/createPerson.dto';
import { RoleByNameDto } from 'src/role/dtos/role.dto';

@Injectable()
export class PeopleService {
  constructor(
    private readonly peopleRepository: PeopleRepository,
    private readonly rolesService: RolesService,
  ) {}

  async personById(personId: string) {
    const person: Person = await this.peopleRepository.personById(personId);
    return person;
  }

  async personByEmail(email: string): Promise<Person> {
    const person: Person = await this.peopleRepository.personByEmail(email);
    return person;
  }

  async personByDni(dni: string): Promise<Person> {
    const person: Person = await this.peopleRepository.personByDni(dni);
    return person;
  }

  async createPatient(personInfo: Partial<Person>) {
    const personByEmailExist: Person =
      await this.peopleRepository.personByEmail(personInfo.email);
    if (personByEmailExist)
      throw new BadRequestException('Email already exist');

    const personByDniExist: Person = await this.peopleRepository.personByDni(
      personInfo.dni,
    );
    if (personByDniExist) throw new BadRequestException('DNI already exist');

    const role: Role = await this.rolesService.roleByName(Roles.PATIENT);

    personInfo.roles = [role];

    return this.peopleRepository.createPatient(personInfo);
  }

  async addRole(id: string, role: RoleByNameDto) {
    return this.peopleRepository.addRole(id, role);
  }
}
