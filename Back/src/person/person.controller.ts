import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { PeopleService } from './person.service';
import { Person } from './entities/person.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreatePersonDto } from './dtos/createPerson.dto';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get(':id')
  async personById(
    @Param('id', ParseUUIDPipe) personId: string,
  ): Promise<Person> {
    const person: Person = await this.peopleService.personById(personId);
    return person;
  }

  @Post()
  async createPerson(@Body() userInfo: CreatePersonDto) {
    const { password, ...personInfo } = userInfo;
    const authInfo = { email: userInfo.email, password: userInfo.password }
    return this.peopleService.createPerson(personInfo, authInfo);
  }
}
