import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PeopleRepository {
  constructor(
    @InjectRepository(Person) private peopleRepository: Repository<Person>,
  ) {}

  async personById(personId: string): Promise<Person> {
    const person: Person = await this.peopleRepository.findOne({
      where: {
        id: personId,
      },
    });
    if (!person) throw new BadRequestException('Person not found');
    return person;
  }

  async personByAuthId(personAuthId: string): Promise<Person> {
    const person: Person = await this.peopleRepository.findOne({
      where: {
        auth: personAuthId,
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
    });
    // if (!person) throw new BadRequestException('Email does not exist');
    return person;
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

  async createPerson(personInfo: Partial<Person>) {
    const person: Person = await this.peopleRepository.save(personInfo);
    return `User for ${person.first_name} was created`;
  }
}
