import { BadRequestException, Injectable } from '@nestjs/common';
import { PeopleRepository } from './person.repository';
import { Person } from './entities/person.entity';
import { Role } from '../role/entities/role.entity';
import { RolesService } from '../role/role.service';
import { Roles } from '../role/enums/roles.enum';
import { Guest } from './entities/guest.entity';
import { CreatePatientDto } from './dtos/createPatient.dto';

@Injectable()
export class PeopleService {
  constructor(
    private readonly peopleRepository: PeopleRepository,
    private readonly rolesService: RolesService,
  ) { }

  async getAllPeople(paginationDto) {
    return this.peopleRepository.getAllPeople(paginationDto)
  }

  async getAllGuests(paginationDto) {
    return this.peopleRepository.getAllGuests(paginationDto)
  }

  async personById(personId: string) {
    const person: Person = await this.peopleRepository.personById(personId);
    return person;
  }

  async personByEmail(email: string): Promise<Person> {
    const person: Person = await this.peopleRepository.personByEmail(email);
    return person;
  }

  async guestByEmail(email: string): Promise<Guest> {
    const guest: Guest = await this.peopleRepository.guestByEmail(email);
    return guest;
  }

  async personByDni(dni: string): Promise<Person> {
    const person: Person = await this.peopleRepository.personByDni(dni);
    return person;
  }

  async addPatient(createPatientDto: CreatePatientDto) {
    const { person_id } = createPatientDto
    const person: Person = await this.peopleRepository.personById(person_id)

    if (!person) throw new BadRequestException('Person not found with id provided. Could not add patient')

    return await this.peopleRepository.addPatient(person_id)

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

  async getPatientById(patientId: string) {
    const patient = await this.peopleRepository.getPatientById(patientId);
    return patient;
  }

  async addRole(personId: string, roleName: Roles) {
    const roleToAdd: Role = await this.rolesService.roleByName(roleName)
    return this.peopleRepository.addRole(personId, roleToAdd);
  }

  async createGuest(guestInfo: Omit<Guest, 'id'>) {
    const guest: Guest = await this.peopleRepository.createGuest(guestInfo);
    return guest;
  }
}
