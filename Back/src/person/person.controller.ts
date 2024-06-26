import { Controller, Get, Param, ParseUUIDPipe, Post, Req } from '@nestjs/common';
import { PeopleService } from './person.service';
import { Person } from './entities/person.entity';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get('auth0')
  getAuth0Protected(@Req() req: Request){
    const jwt = require('jsonwebtoken');
    const idToken = req.oidc.idToken;
    console.log(idToken);
    
    const decodedToken = jwt.decode(idToken);
    console.log(decodedToken['http://localhost:3000/log_count']);
    return JSON.stringify(req.oidc.user)
  }

  @Get(':id')
  async personById(
    @Param('id', ParseUUIDPipe) personId: string,
  ): Promise<Person> {
    const person: Person = await this.peopleService.personById(personId);
    return person;
  }
}