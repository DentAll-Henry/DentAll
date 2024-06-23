import { BadRequestException, Injectable } from '@nestjs/common';
import { PeopleRepository } from './person.repository';
import { Person } from './person.entity';
import { Auth } from 'src/auth/auth.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class PeopleService {
  constructor(
    private readonly peopleRepository: PeopleRepository,
    private readonly authService: AuthService,
  ) {}

  async personById(personId: string) {
    const person: Person = await this.peopleRepository.personById(personId);
    return person;
  }

  async personByAuthId(personAuthId: string): Promise<Person> {
    const person: Person = await this.peopleRepository.personByAuthId(personAuthId);
    return person;
  }

  async createPerson(personInfo: Partial<Person>, authInfo: Omit<Auth, 'id'>) {
    const personByEmailExist: Person = await this.peopleRepository.personByEmail(personInfo.email);
    if (personByEmailExist) throw new BadRequestException('Email already exist');

    const personByDniExist: Person = await this.peopleRepository.personByDni(personInfo.dni);
    if (personByDniExist) throw new BadRequestException('DNI already exist');

    personInfo.auth = await this.authService.signUp(authInfo);

    return this.peopleRepository.createPerson(personInfo);
  }
}
