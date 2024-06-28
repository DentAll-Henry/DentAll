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

  async getAllPeople(paginationDto) {
    const { page, limit } = paginationDto;
    const queryBuilder = this.peopleRepository.createQueryBuilder('people')
      .select('people')
      .skip((page - 1) * limit)
      .take(limit);

    return await queryBuilder.getMany();
  }

  async getAllGuests(paginationDto) {
    const { page, limit } = paginationDto;
    const queryBuilder = this.guestsRepository.createQueryBuilder('guests')
      .select('guests')
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
    if (!person) throw new BadRequestException('Person not found');
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

  async guestByEmail(guestEmail: string): Promise<Guest> {
    const guest: Guest = await this.guestsRepository.findOne({
      where: {
        email: guestEmail,
      },
    });
    return guest;
  }

  async personByDni(personDni: string): Promise<Person> {
    const person: Person = await this.peopleRepository.findOne({
      where: {
        dni: personDni,
      },
    });
    // if (!person) throw new BadRequestException('DNI does not exist');
    return person;
  }

  async createPatient(personInfo: Partial<Person>): Promise<Person> {
    try {
      const person: Person = await this.peopleRepository.save(personInfo);
      return person;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException('Error: ' + error.driverError?.detail);
      }
      throw new BadRequestException('Internal server error');
    }
  }

  async addRole(personId: string, roleToAdd: Role): Promise<Person> {
    try {
      const person: Person = await this.personById(personId)

      const existingRole = person.roles.find((r) => r.id === roleToAdd.id);

      if (existingRole) throw new BadRequestException('Person already has that role');
      
      person.roles.push(roleToAdd);
      const updatedPerson: Person = await this.peopleRepository.save(person);
      return updatedPerson;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async createGuest(guestInfo: Omit<Guest, 'id'>) {
    const guest: Guest = await this.guestsRepository.save(guestInfo);
    return guest;
  }
}
