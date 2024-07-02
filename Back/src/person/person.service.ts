import { BadRequestException, Injectable } from '@nestjs/common';
import { PeopleRepository } from './person.repository';
import { Person } from './entities/person.entity';
import { Role } from '../role/entities/role.entity';
import { RolesService } from '../role/role.service';
import { Roles } from '../role/enums/roles.enum';
import { Guest } from './entities/guest.entity';
import { PatientsService } from './patient.service';

@Injectable()
export class PeopleService {
  constructor(
    private readonly peopleRepository: PeopleRepository,
    private readonly rolesService: RolesService,
    private readonly patientsService: PatientsService
  ) {}

  //& --> people endpoints <--
  async getAllPeople(paginationDto: { page: number; limit: number }) {
    return this.peopleRepository.getAllPeople(paginationDto);
  }

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

  async createPersonAsPatient(personInfo: Partial<Person>) {
    const personByEmailExist: Person =
      await this.peopleRepository.personByEmail(personInfo.email);
    if (personByEmailExist)
      throw new BadRequestException('Ya existe un registro con ese email.');

    const personByDniExist: Person = await this.peopleRepository.personByDni(
      personInfo.dni,
    );
    if (personByDniExist) throw new BadRequestException('Ya existe un registro con ese DNI.');

    const role: Role = await this.rolesService.roleByName(Roles.PATIENT);

    personInfo.roles = [role];

    const newPerson: Person =
      await this.peopleRepository.createPersonAsPatient(personInfo);

    await this.patientsService.createPatient(newPerson);

    return newPerson;
  }

  async addRole(personId: string, roleName: { roleName: Roles }) {
    const roleToAdd: Role = await this.rolesService.roleByName(roleName.roleName);
    const person: Person = await this.personById(personId);
    return this.peopleRepository.addRole(person, roleToAdd);
  }

  async delRole(personId: string, roleName: { roleName: Roles }) {
    const roleToDel: Role = await this.rolesService.roleByName(roleName.roleName);
    const person: Person = await this.personById(personId);
    return this.peopleRepository.delRole(person, roleToDel);
  }

  async updatePerson(id: string, infoToUpdate: Partial<Person>) {
    const personToUpdate: Person = await this.personById(id);
    return this.peopleRepository.updatePerson(personToUpdate, infoToUpdate);
  }

  async deletePerson(email: string) {
    const personToDelete: Person = await this.personByEmail(email);
    return await this.peopleRepository.deletePerson(personToDelete);
  }

  async restorePerson(email: string): Promise<Person> {
    const personToRestore: Person =
      await this.peopleRepository.restorePerson(email);
    return personToRestore;
  }

  //& --> guests endpoints <--
  async getAllGuests(paginationDto: { page: number; limit: number }) {
    return this.peopleRepository.getAllGuests(paginationDto);
  }

  async guestByEmail(email: string): Promise<Guest> {
    const guest: Guest = await this.peopleRepository.guestByEmail(email);
    return guest;
  }

  async createGuest(guestInfo: Omit<Guest, 'id'>) {
    const guest: Guest = await this.peopleRepository.createGuest(guestInfo);
    return guest;
  }
}
