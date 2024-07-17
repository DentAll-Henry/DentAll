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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PeopleService } from './person.service';
import { Person } from './entities/person.entity';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LimitApiQueries, PageApiQueries } from '../config/swagger-config';
import { PaginationDto } from '../common/dto/paginationDto';
import { Guest } from './entities/guest.entity';
import { AddOrDelRoleDto } from './dtos/addOrDelRole.dto';
import { AuthByEmailDto } from '../auth/dtos/authByEmail.dto';
import { EditPersonDto } from './dtos/editPerson.dto';
import { DRoles } from '../decorators/roles.decorator';
import { Roles } from '../role/enums/roles.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';
import { CreateGuestDto } from './dtos/createGuest.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidationFile } from 'src/files/Pipes/ValidationFile.pipe';
import { NewPhotoDto } from './dtos/newPhoto.dto';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  //& --> guests endpoints <--
  // @Get('guests')
  // @ApiOperation({ summary: 'Get all guests.' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Returns an array with all guests.',
  // })
  // @ApiQuery(PageApiQueries)
  // @ApiQuery(LimitApiQueries)
  // async getAllGuests(@Query() paginationDto: PaginationDto) {
  //   return this.peopleService.getAllGuests(paginationDto);
  // }

  // @Get('guestemail')
  // @ApiOperation({ summary: 'Get a person by email.' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Returns to the guest with the specified email.',
  // })
  // @ApiBadRequestResponse({
  //   status: 400,
  //   description: 'Guest with that email does not exist.',
  // })
  // async guestByEmail(@Param('email') email: string): Promise<Guest> {
  //   const guest: Guest = await this.peopleService.guestByEmail(email);
  //   if (!guest)
  //     throw new BadRequestException(`Guest with email ${email} does not exist`);
  //   return guest;
  // }

  // @Post()
  // @ApiOperation({ summary: 'Create a guest.' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'Create a guest.',
  // })
  // @ApiBadRequestResponse({
  //   status: 400,
  //   description: 'Bad request.',
  // })
  // async createGuest(@Body() infoGuest: CreateGuestDto) {} //! Ajustar

  //& --> people endpoints <--
  @ApiBearerAuth()
  @Get()
  @DRoles(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Get all people, the searching includes deleted ones.',
  })
  @ApiResponse({ status: 200, description: 'Return an array with all people.' })
  @ApiQuery(PageApiQueries)
  @ApiQuery(LimitApiQueries)
  async getAllPeople(@Query() paginationDto: PaginationDto) {
    return this.peopleService.getAllPeople(paginationDto);
  }

  @Get('byemail')
  @ApiOperation({
    summary: 'Get a person by email, the searching includes deleted ones.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns to the person with the specified email.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Person with that email does not exist.',
  })
  async personByEmail(@Query() email: AuthByEmailDto) {
    const person: Person = await this.peopleService.personByEmail(email.email);
    if (!person)
      throw new BadRequestException(
        `No existe usuario con el email ${email.email}.`,
      );
    return person;
  }

  @Get('administratives/quantity')
  @ApiOperation({ summary: 'Get the administratives quantity.' })
  @ApiResponse({
    status: 200,
    description: 'Returns the administratives quantity.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request.',
  })
  async administrativesQuantity() {
    return this.peopleService.administrativesQuantity();
  }

  @Get('superadmins/quantity')
  @ApiOperation({ summary: 'Get the super admins quantity.' })
  @ApiResponse({
    status: 200,
    description: 'Returns the super admins quantity.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request.',
  })
  async superAdminsQuantity() {
    return this.peopleService.superAdminsQuantity();
  }

  @ApiBearerAuth()
  @Get('byrole/:role')
  @DRoles(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Get people by role, the searching includes deleted ones.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns people with the specified role.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiQuery(PageApiQueries)
  @ApiQuery(LimitApiQueries)
  async peopleByRole(
    @Param('role') role: Roles,
    @Query() paginationDto: PaginationDto,
  ) {
    const people: Person[] = await this.peopleService.peopleByRole(
      role,
      paginationDto,
    );
    if (people.length === 0)
      throw new BadRequestException(`No existen usuarios con el rol ${role}.`);
    return people;
  }

  // @Get(':idperson')
  // @ApiOperation({
  //   summary: 'Get a person by ID, the searching includes deleted ones.',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Returns to the person with the specified ID.',
  // })
  // @ApiBadRequestResponse({
  //   status: 400,
  //   description: 'Person with that ID does not exist.',
  // })
  // async personById(
  //   @Param('idperson', ParseUUIDPipe) idperson: string,
  // ): Promise<Person> {
  //   const person: Person = await this.peopleService.personById(idperson);
  //   if (!person)
  //     throw new BadRequestException(`No existe usuario con el ID ${idperson}.`);
  //   return person;
  // }

  @ApiBearerAuth()
  @Patch('addrole/:idperson')
  @DRoles(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Add new person role.' })
  @ApiResponse({
    status: 200,
    description: 'Returns to the person with the new role.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Role does not exist.' })
  async addRole(
    @Param('idperson', ParseUUIDPipe) idperson: string,
    @Body() roleName: AddOrDelRoleDto,
  ) {
    return await this.peopleService.addRole(idperson, roleName);
  }

  @ApiBearerAuth()
  @Patch('delrole/:idperson')
  @DRoles(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete a person role.' })
  @ApiResponse({
    status: 200,
    description: 'Returns to the person without the role.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Role does not exist.' })
  async delRole(
    @Param('idperson', ParseUUIDPipe) idperson: string,
    @Body() roleName: AddOrDelRoleDto,
  ) {
    return await this.peopleService.delRole(idperson, roleName);
  }

  @ApiBearerAuth()
  @Patch('editphoto/:idperson')
  @DRoles(Roles.ADMIN, Roles.DENTIST, Roles.ADMINISTRATIVE, Roles.PATIENT)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Change de profile photo.' })
  @ApiResponse({
    status: 200,
    description: 'Returns to the person without the new photo url.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    description: 'Image to upload(only files .jpg, .jpeg, .png, .gif)',
    type: NewPhotoDto,
  })
  async editPhoto(
    @UploadedFile(ValidationFile) file: Express.Multer.File,
    @Param('idperson', ParseUUIDPipe) idperson: string,
  ) {
    return await this.peopleService.editPhoto(idperson, file);
  }

  
  @ApiBearerAuth()
  @Patch('update/:id')
  @DRoles(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
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
}
