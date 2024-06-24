import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { Role } from '../role/entities/role.entity';

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
    // if (!person) throw new BadRequestException('DNI does not exist');
    return person;
  }

  async createPatient(personInfo: Partial<Person>) {
    const person: Person = await this.peopleRepository.save(personInfo);
    return `User for ${person.first_name} was created`;
  }

  async addRole(id: string, roleToAdd: Role) {
    const person: Person = await this.peopleRepository.findOne({
      where: {
        id,
      },
    });
    if (!person) throw new BadRequestException('Person does not exist');
    const existsRole: boolean = person.roles.some(
      (role) => role.name === roleToAdd.name,
    );

    if (!existsRole) person.roles.push(roleToAdd);

    await this.peopleRepository.save(person);
  }
}
