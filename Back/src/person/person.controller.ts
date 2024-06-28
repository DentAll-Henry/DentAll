import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { PeopleService } from './person.service';
import { Person } from './entities/person.entity';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../role/enums/roles.enum';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get(':id')
  async personById(@Param('id', ParseUUIDPipe) personId: string): Promise<Person> {
    const person: Person = await this.peopleService.personById(personId);
    return person;
  }

  @Get('email')
  async personByEmail(@Param('email') email: string) {
    const person: Person = await this.peopleService.personByEmail(email);
    if(!person) throw new BadRequestException(`Person with email ${email} does not exist`)
    return true;
  }

  // this endpoint is only for admin,superadmin
  @Patch('role/:id')
  async addRole(@Param('id', ParseUUIDPipe) personId: string, roleName: Roles) {
    return await this.peopleService.addRole(personId, roleName);
  }
}
