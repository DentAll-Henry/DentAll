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

  //& --> people endpoints <--
  async getAllPeople(paginationDto: { page: number; limit: number }) {
    const { page, limit } = paginationDto;
    const queryBuilder = this.peopleRepository
      .createQueryBuilder('people')
      .leftJoinAndSelect('people.roles', 'roles')
      .skip((page - 1) * limit)
      .take(limit);

    return await queryBuilder.getMany();
  }

  async personById(personId: string): Promise<Person> {
    const person: Person = await this.peopleRepository.findOne({
      where: {
        id: personId,
      },
      relations: {
        roles: true,
      },
    });
    if (!person) throw new BadRequestException('No existe una persona con el ID especificado.');
    return person;
  }

  async personByEmail(personEmail: string): Promise<Person> {
    const person: Person = await this.peopleRepository.findOne({
      where: {
        email: personEmail,
      },
      relations: {
        roles: true,
      },
    });
    return person;
  }

  async personByDni(personDni: string): Promise<Person> {
    const person: Person = await this.peopleRepository.findOne({
      where: {
        dni: personDni,
      },
    });
    // if (!person) throw new BadRequestException('No existe un usuario con el DNI especificado.');
    return person;
  }

  async createPersonAsPatient(personInfo: Partial<Person>): Promise<Person> {
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

  async restorePerson(email: string): Promise<Person> {
    const personToRestore: Person = await this.peopleRepository
      .createQueryBuilder('person')
      .withDeleted()
      .where('person.email = :email', { email })
      .andWhere('person.deleteDate IS NOT NULL')
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
      ])
      .getOne();

    if (!personToRestore)
      throw new BadRequestException(
        'Credenciales inválidas. No es posible restaurar el usuario.',
      );

    await this.peopleRepository.restore(personToRestore);
    return personToRestore;
  }

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

}
