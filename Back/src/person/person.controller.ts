import { BadRequestException, Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { PeopleService } from './person.service';
import { Person } from './entities/person.entity';
import { ApiTags } from '@nestjs/swagger';

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
}