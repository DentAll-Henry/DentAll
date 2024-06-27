import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Res,
} from '@nestjs/common';
import { PeopleService } from './person.service';
import { Person } from './entities/person.entity';
import { ApiTags } from '@nestjs/swagger';
import { RoleByNameDto } from 'src/role/dtos/role.dto';
import { Response } from 'express';

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
  async addRole(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response, @Body() role: RoleByNameDto) {
    const response = await this.peopleService.addRole(id, role);
    return res.status(200).json(response);
  }
}
