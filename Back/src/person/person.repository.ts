import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { Role } from '../role/entities/role.entity';
import { Guest } from './entities/guest.entity';

@Injectable()
export class PeopleRepository {
  constructor(
    @InjectRepository(Person) private peopleRepository: Repository<Person>,
    @InjectRepository(Guest) private guestsRepository: Repository<Guest>,
  ) {}

  //& --> guests endpoints <--
  async getAllGuests(paginationDto: { page: number; limit: number }) {
    const { page, limit } = paginationDto;
    const queryBuilder = this.guestsRepository
      .createQueryBuilder('guests')
      .select('guests')
      .skip((page - 1) * limit)
      .take(limit);

    return await queryBuilder.getMany();
  }

  async guestByEmail(guestEmail: string): Promise<Guest> {
    const guest: Guest = await this.guestsRepository.findOne({
      where: {
        email: guestEmail,
      },
    });
    return guest;
  }

  async createGuest(guestInfo: Omit<Guest, 'id'>) {
    const guest: Guest = await this.guestsRepository.save(guestInfo);
    return guest;
  }

  //& --> people endpoints <--
  async getAllPeople(paginationDto: { page: number; limit: number }): Promise<Person[]> {
    const { page, limit } = paginationDto;
    const queryBuilder = this.peopleRepository
      .createQueryBuilder('people')
      .withDeleted()
      .select([
        'people.id',
        'people.first_name',
        'people.last_name',
        'people.birthdate',
        'people.dni',
        'people.phone',
        'people.email',
        'people.address',
        'people.location',
        'people.nationality',
        'people.is_auth0',
        'people.deleteDate',
        'people.photo',
      ])
      .leftJoinAndSelect('people.roles', 'roles')
      .skip((page - 1) * limit)
      .take(limit);
      
    const people: Person[] = await queryBuilder.getMany();
    return people;
  }

  async personByEmail(email: string): Promise<Person> {
    const person: Person = await this.peopleRepository
      .createQueryBuilder('person')
      .withDeleted()
      .where('person.email = :email', { email })
      .select([
        'person.id',
        'person.first_name',
        'person.last_name',
        'person.birthdate',
        'person.dni',
        'person.phone',
        'person.address',
        'person.location',
        'person.nationality',
        'person.is_auth0',
        'person.email',
        'person.deleteDate',
        'person.photo',
        'person.is_active'
      ])
      .leftJoinAndSelect('person.roles', 'roles')
      .getOne();

    // if (!person) throw new BadRequestException('No existe una persona con el email especificado.');
    return person;
  }

  async personById(id: string): Promise<Person> {
    const person: Person = await this.peopleRepository
      .createQueryBuilder('person')
      .withDeleted()
      .where('person.id = :id', { id })
      .select([
        'person.id',
        'person.first_name',
        'person.last_name',
        'person.birthdate',
        'person.dni',
        'person.phone',
        'person.address',
        'person.location',
        'person.nationality',
        'person.is_auth0',
        'person.email',
        'person.deleteDate',
        'person.photo',
        'person.is_active'
      ])
      .leftJoinAndSelect('person.roles', 'roles')
      .leftJoinAndSelect('person.auth', 'auth')
      .addSelect('auth.password')
      .getOne();

    return person;
  }

  async personByDni(personDni: string): Promise<Person> {
    const person: Person = await this.peopleRepository.findOne({
      where: {
        dni: personDni,
      },
    });
    return person;
  }

  async administrativesQuantity() {
    const activeAdministrativesQuantity: number = await this.peopleRepository
      .createQueryBuilder('people')
      .leftJoinAndSelect('people.roles', 'roles')
      .where('roles.name = :roleName', { roleName: 'administrative'})
      .andWhere('people.is_active = :isActive', { isActive: true})
      .getCount();

    const administrativesQuantity: number = await this.peopleRepository
      .createQueryBuilder('people')
      .leftJoinAndSelect('people.roles', 'roles')
      .where('roles.name = :roleName', { roleName: 'administrative'})
      .getCount();

    return { total: administrativesQuantity, active: activeAdministrativesQuantity, inactive: administrativesQuantity-activeAdministrativesQuantity };
  }

  async superAdminsQuantity() {
    const activeSuperAdminsQuantity: number = await this.peopleRepository
      .createQueryBuilder('people')
      .leftJoinAndSelect('people.roles', 'roles')
      .where('roles.name = :roleName', { roleName: 'admin'})
      .andWhere('people.is_active = :isActive', { isActive: true})
      .getCount();

    const superAdminsQuantity: number = await this.peopleRepository
      .createQueryBuilder('people')
      .leftJoinAndSelect('people.roles', 'roles')
      .where('roles.name = :roleName', { roleName: 'admin'})
      .getCount();

    return { total: superAdminsQuantity, active: activeSuperAdminsQuantity, inactive: superAdminsQuantity-activeSuperAdminsQuantity };
  }

  async peopleByRole(roleName: Role['name'], paginationDto: { page: number; limit: number }): Promise<Person[]> {
    const { page, limit } = paginationDto;

    const queryBuilder = this.peopleRepository
      .createQueryBuilder('person')
      .withDeleted()
      .leftJoinAndSelect('person.roles', 'roles')
      .where('roles.name = :roleName', { roleName })
      .select([
        'person.id',
        'person.first_name',
        'person.last_name',
        'person.birthdate',
        'person.dni',
        'person.phone',
        'person.address',
        'person.location',
        'person.nationality',
        'person.is_auth0',
        'person.email',
        'person.deleteDate',
        'person.photo',
      ])
      .skip((page - 1) * limit)
      .take(limit);
      
    const people: Person[] = await queryBuilder.getMany();

    if (!people) throw new BadRequestException('No existen usuarios con el rol especificado.');
    return people;
  }

  async createPerson(personInfo: Partial<Person>): Promise<Person> {
    try {
      const person: Person = await this.peopleRepository.save(personInfo);
      return person;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException('Error: ' + error.driverError?.detail);
      }
      throw new BadRequestException('Error interno del servidor.');
    }
  }

  async addRole(person: Person, roleToAdd: Role): Promise<Person> {
    try {
      const existingRole = person.roles.find((r) => r.id === roleToAdd.id);

      if (existingRole)
        throw new BadRequestException('El usuario ya tiene el rol asignado.');
      
      person.roles.push(roleToAdd);
      const updatedPerson: Person = await this.peopleRepository.save(person);
      return updatedPerson;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error interno del servidor.');
    }
  }

  async delRole(person: Person, roleToDel: Role): Promise<Person> {
    const existingRole = person.roles.find((r) => r.id === roleToDel.id);

    if (!existingRole)
      throw new BadRequestException('El usuario no tiene asignado ese rol.');

    const index: number = person.roles.indexOf(existingRole);

    if (index > -1) person.roles.splice(index, 1);

    person = await this.peopleRepository.save(person)

    return person;
  }

  async updatePerson(personToUpdate: Person, infoToUpdate: Partial<Person>) {
    const keys: string[] = Object.keys(infoToUpdate);
    for (const key of keys) {
      personToUpdate[key] = infoToUpdate[key];
    }
    return await this.peopleRepository.save(personToUpdate);
  }

  async deletePerson(personToDelete: Person) {
    await this.peopleRepository.softDelete(personToDelete.id);
    return `El usuario con email ${personToDelete.email} fue eliminado.`;
  }

  async restorePerson(personDeleted: Person): Promise<Person> {
    await this.peopleRepository.restore(personDeleted);
    return personDeleted;
  }
}
