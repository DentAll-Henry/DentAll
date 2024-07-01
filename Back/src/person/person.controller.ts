import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { PeopleService } from './person.service';
import { Person } from './entities/person.entity';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LimitApiQueries, PageApiQueries } from '../config/swagger-config';
import { PaginationDto } from '../common/dto/paginationDto';
import { Guest } from './entities/guest.entity';
import { ChangeRoleDto } from './dtos/changeRoles.dto';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  @ApiOperation({ summary: 'Get all people.' })
  @ApiResponse({ status: 200, description: 'Return an array with all people.' })
  @ApiQuery(PageApiQueries)
  @ApiQuery(LimitApiQueries)
  async getAllPeople(@Query() paginationDto: PaginationDto) {
    return this.peopleService.getAllPeople(paginationDto);
  }

  @Get('guests')
  @ApiOperation({ summary: 'Get all guests.' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array with all guests.',
  })
  @ApiQuery(PageApiQueries)
  @ApiQuery(LimitApiQueries)
  async getAllGuests(@Query() paginationDto: PaginationDto) {
    return this.peopleService.getAllGuests(paginationDto);
  }

  @Get('email')
  @ApiOperation({ summary: 'Get a person by email.' })
  @ApiResponse({
    status: 200,
    description: 'Returns to the person with the specified email.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Person with that email does not exist.',
  })
  async personByEmail(@Param('email') email: string) {
    const person: Person = await this.peopleService.personByEmail(email);
    if (!person)
      throw new BadRequestException(
        `Person with email ${email} does not exist`,
      );
    return true;
  }

  @Get('guestemail')
  @ApiOperation({ summary: 'Get a person by email.' })
  @ApiResponse({
    status: 200,
    description: 'Returns to the guest with the specified email.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Guest with that email does not exist.',
  })
  async guestByEmail(@Param('email') email: string): Promise<Guest> {
    const guest: Guest = await this.peopleService.guestByEmail(email);
    if (!guest)
      throw new BadRequestException(`Guest with email ${email} does not exist`);
    return guest;
  }

  @Get(':idPerson')
  @ApiOperation({ summary: 'Get a person by ID.' })
  @ApiResponse({
    status: 200,
    description: 'Returns to the person with the specified ID.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Person with that ID does not exist.',
  })
  async personById(
    @Param('idPerson', ParseUUIDPipe) personId: string,
  ): Promise<Person> {
    const person: Person = await this.peopleService.personById(personId);
    return person;
  }

  // this endpoint is only for admin,superadmin
  @Patch('addrole/:idperson')
  @ApiOperation({ summary: 'Add new person role.' })
  @ApiResponse({
    status: 200,
    description: 'Returns to the person with the new role.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Role does not exist.' })
  async addRole(@Param('idperson', ParseUUIDPipe) idperson: string, @Body() roleName: ChangeRoleDto) {
    return await this.peopleService.addRole(idperson, roleName);
  }
  
  // this endpoint is only for admin,superadmin
  @Patch('delrole/:idperson')
  @ApiOperation({ summary: 'Delete a person role.' })
  @ApiResponse({
    status: 200,
    description: 'Returns to the person without the role.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Role does not exist.' })
  async delRole(@Param('idperson', ParseUUIDPipe) idperson: string, @Body() roleName: ChangeRoleDto) {
    return await this.peopleService.delRole(idperson, roleName);
  }
}
