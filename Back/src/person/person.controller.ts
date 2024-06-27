import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { PeopleService } from './person.service';
import { Person } from './entities/person.entity';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreatePersonDto } from './dtos/createPerson.dto';
import { Roles } from 'src/role/enums/roles.enum';
import { RoleByNameDto } from 'src/role/dtos/role.dto';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get('auth0')
  getAuth0Protected(@Req() req: Request) {
    const jwt = require('jsonwebtoken');
    const idToken = req.oidc.idToken;
    console.log(idToken);

    const decodedToken = jwt.decode(idToken);
    console.log(decodedToken['http://localhost:3000/log_count']);
    return JSON.stringify(req.oidc.user);
  }

  @Get(':id')
  async personById(
    @Param('id', ParseUUIDPipe) personId: string,
  ): Promise<Person> {
    const person: Person = await this.peopleService.personById(personId);
    return person;
  }

  @Post()
  async createPerson(@Body() data: CreatePersonDto, @Res() res: Response) {
    const newPerson = await this.peopleService.createPatient(data);
    return res.status(201).json(newPerson);
  }

  // this endpoint is only for admin,superadmin
  @Patch('role/:id')
  async addRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
    @Body() role: RoleByNameDto,
  ) {
    const response = await this.peopleService.addRole(id, role);
    return res.status(200).json(response);
  }
}
