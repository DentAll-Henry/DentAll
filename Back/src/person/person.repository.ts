import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { Role } from '../role/entities/role.entity';
import { Roles } from 'src/role/enums/roles.enum';
import { RoleByNameDto } from 'src/role/dtos/role.dto';

@Injectable()
export class PeopleRepository {
  constructor(
    @InjectRepository(Person) private peopleRepository: Repository<Person>,
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

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
    try {
      const newPerson = await this.peopleRepository.create(personInfo);
      const role = await this.rolesRepository.findOne({
        where: { name: Roles.PATIENT },
      });
      newPerson.roles = [role];
      const person: Person = await this.peopleRepository.save(newPerson);
      return person;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException('Error: ' + error.driverError?.detail);
      }
      throw new BadRequestException('Internal server error');
    }
  }

  async addRole(id: string, roleToAdd: RoleByNameDto) {
    try {
      const person: Person = await this.peopleRepository.findOne({
        where: {
          id,
        },
        relations: {
          roles: true,
        },
      });
      if (!person)
        throw new BadRequestException('Person does not exist for id: ' + id);
      const role = await this.rolesRepository.findOneBy({
        name: roleToAdd.name,
      });
      if (!role)
        throw new BadRequestException(
          'The role: ' + roleToAdd.name + ' does not exist: ',
        );
      const existingRole = person.roles.find((r) => r.id === role.id);
      if (existingRole) {
        throw new BadRequestException('Person already has that role');
      }
      person.roles.push(role);
      const updatedPerson: Person = await this.peopleRepository.save(person);
      return updatedPerson;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
