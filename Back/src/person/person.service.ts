import { BadRequestException, Injectable } from '@nestjs/common';
import { PeopleRepository } from './person.repository';
import { Person } from './entities/person.entity';

@Injectable()
export class PeopleService {
  constructor(private readonly peopleRepository: PeopleRepository) {}

  async personById(personId: string) {
    const person: Person = await this.peopleRepository.personById(personId);
    return person;
  }

  async personByAuthId(personAuthId: string): Promise<Person> {
    const person: Person =
      await this.peopleRepository.personByAuthId(personAuthId);
    const person: Person =
      await this.peopleRepository.personByAuthId(personAuthId);
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

  async createPerson(personInfo: Partial<Person>) {
    const personByEmailExist: Person =
      await this.peopleRepository.personByEmail(personInfo.email);
    if (personByEmailExist)
      throw new BadRequestException('Email already exist');

    const personByDniExist: Person = await this.peopleRepository.personByDni(
      personInfo.dni,
    );
    if (personByDniExist) throw new BadRequestException('DNI already exist');

    return this.peopleRepository.createPerson(personInfo);
  }
}
