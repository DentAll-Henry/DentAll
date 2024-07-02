import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
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
import { AuthByEmailDto } from 'src/auth/dtos/authByEmail.dto';
import { UpdatePersonDto } from './dtos/updatePerson.dto';
import { CreatePersonDto } from './dtos/createPerson.dto';
import { EditPersonDto } from './dtos/editPerson.dto';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  //& --> people endpoints <--
  @Get()
  @ApiOperation({ summary: 'Get all people.' })
  @ApiResponse({ status: 200, description: 'Return an array with all people.' })
  @ApiQuery(PageApiQueries)
  @ApiQuery(LimitApiQueries)
  async getAllPeople(@Query() paginationDto: PaginationDto) {
    return this.peopleService.getAllPeople(paginationDto);
  }

  @Get('wd')
  @ApiOperation({ summary: 'Get all people.' })
  @ApiResponse({ status: 200, description: 'Return an array with all people.' })
  @ApiQuery(PageApiQueries)
  @ApiQuery(LimitApiQueries)
  async getAllPeopleIncludeDeleted(@Query() paginationDto: PaginationDto) {
    return this.peopleService.getAllPeopleIncludeDeleted(paginationDto);
  }

  @Get(':idperson')
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
    @Param('idperson', ParseUUIDPipe) idperson: string,
  ): Promise<Person> {
    const person: Person = await this.peopleService.personById(idperson);
    if (!person)

      throw new BadRequestException(`No existe usuario con el ID ${idperson}.`);
    return person;
  }

  @Get('wd/:idperson')
  @ApiOperation({ summary: 'Get a person by ID.' })
  @ApiResponse({
    status: 200,
    description: 'Returns to the person with the specified ID.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Person with that ID does not exist.',
  })
  async personByIdIncludeDeleted(
    @Param('idperson', ParseUUIDPipe) idperson: string,
  ): Promise<Person> {
    const person: Person =
      await this.peopleService.personByIdIncludeDeleted(idperson);
    if (!person)
      throw new BadRequestException(`No existe usuario con el ID ${idperson}.`);
    return person;
  }

  @Get('byemail')
  @ApiOperation({ summary: 'Get a person by email.' })
  @ApiResponse({
    status: 200,
    description: 'Returns to the person with the specified email.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Person with that email does not exist.',
  })
  async personByEmail(@Body() email: AuthByEmailDto) {
    const person: Person = await this.peopleService.personByEmail(email.email);
    if (!person)
      throw new BadRequestException(
        `No existe usuario con el email ${email.email}.`,
      );
    return person;
  }

  @Patch('addrole/:idperson')
  @ApiOperation({ summary: 'Add new person role.' })
  @ApiResponse({
    status: 200,
    description: 'Returns to the person with the new role.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Role does not exist.' })
  async addRole(
    @Param('idperson', ParseUUIDPipe) idperson: string,
    @Body() roleName: ChangeRoleDto,
  ) {
    return await this.peopleService.addRole(idperson, roleName);
  }

  @Patch('delrole/:idperson')
  @ApiOperation({ summary: 'Delete a person role.' })
  @ApiResponse({
    status: 200,
    description: 'Returns to the person without the role.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Role does not exist.' })
  async delRole(
    @Param('idperson', ParseUUIDPipe) idperson: string,
    @Body() roleName: ChangeRoleDto,
  ) {
    return await this.peopleService.delRole(idperson, roleName);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update person info.' })
  @ApiResponse({
    status: 200,
    description: 'Returns to the updated person.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  async updatePerson(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() personInfo: EditPersonDto,
  ) {
    return this.peopleService.updatePerson(id, personInfo);
  }

  //& --> guests endpoints <--
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
}
