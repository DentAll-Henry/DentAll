import { BadRequestException, Injectable } from '@nestjs/common';
import { PeopleRepository } from './person.repository';
import { Person } from './entities/person.entity';
import { Role } from '../role/entities/role.entity';
import { RolesService } from '../role/role.service';
import { Roles } from '../role/enums/roles.enum';
import { Guest } from './entities/guest.entity';
import { PatientsService } from './patient.service';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class PeopleService {
  constructor(
    private readonly peopleRepository: PeopleRepository,
    private readonly rolesService: RolesService,
    private readonly patientsService: PatientsService,
    private readonly filesService: FilesService,
  ) {}

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

  //& --> people endpoints <--
  async getAllPeople(paginationDto: {
    page: number;
    limit: number;
  }): Promise<Person[]> {
    const people: Person[] =
      await this.peopleRepository.getAllPeople(paginationDto);
    return people;
  }

  async personByEmail(email: string): Promise<Person> {
    const person: Person = await this.peopleRepository.personByEmail(email);
    return person;
  }

  async personById(personId: string) {
    const person: Person = await this.peopleRepository.personById(personId);
    return person;
  }

  async personByDni(dni: string): Promise<Person> {
    const person: Person = await this.peopleRepository.personByDni(dni);
    return person;
  }

  async peopleByRole(
    roleName: Role['name'],
    paginationDto: { page: number; limit: number },
  ): Promise<Person[]> {
    const people: Person[] = await this.peopleRepository.peopleByRole(
      roleName,
      paginationDto,
    );
    return people;
  }

  async createPersonAsPatient(personInfo: Partial<Person>) {
    const personByEmailExist: Person =
      await this.peopleRepository.personByEmail(personInfo.email);
    if (personByEmailExist)
      throw new BadRequestException('Ya existe un registro con ese email.');

    const personByDniExist: Person = await this.peopleRepository.personByDni(
      personInfo.dni,
    );
    if (personByDniExist)
      throw new BadRequestException('Ya existe un registro con ese DNI.');

    const role: Role = await this.rolesService.roleByName(Roles.PATIENT);

    personInfo.roles = [role];

    const newPerson: Person =
      await this.peopleRepository.createPersonAsPatient(personInfo);

    await this.patientsService.createPatient(newPerson);

    return newPerson;
  }

  async addRole(personId: string, roleName: { roleName: Roles }) {
    const roleToAdd: Role = await this.rolesService.roleByName(
      roleName.roleName,
    );
    const person: Person = await this.personById(personId);
    return this.peopleRepository.addRole(person, roleToAdd);
  }

  async delRole(personId: string, roleName: { roleName: Roles }) {
    const roleToDel: Role = await this.rolesService.roleByName(
      roleName.roleName,
    );
    const person: Person = await this.personById(personId);
    return this.peopleRepository.delRole(person, roleToDel);
  }

  async editPhoto(idperson: string, file: Express.Multer.File) {
    const person: Person = await this.peopleRepository.personById(idperson);
    if (!person)
      throw new BadRequestException('No existe usuario con el id especificado');
    const personEmail: string = person.email;
    let partPath = personEmail.split('');
    const index1: number = partPath.indexOf('@');
    partPath[index1] = '-';
    partPath = partPath.map((c) => {
      if (c === '.') return '-';
      else return c
    });
    const partPath2 = partPath.join('');
    const path: string = `DentAll/${partPath2}`
    const cloudinary = await this.filesService.uploadFile({ path, file});
    person.photo = cloudinary.secure_url;
    const updatedPerson: Person = await this.updatePerson(idperson, person);
    return updatedPerson;
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
    const personDeleted: Person = await this.personByEmail(email);
    if (!personDeleted.deleteDate)
      throw new BadRequestException(
        'Usuario activo, no requiere restauración de cuenta.',
      );
    const personToRestore: Person =
      await this.peopleRepository.restorePerson(personDeleted);
    return personToRestore;
  }
}
