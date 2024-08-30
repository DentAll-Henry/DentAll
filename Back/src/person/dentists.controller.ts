import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DentistsService } from './dentist.service';
import { CreateDentistDto } from './dtos/createDentist.dto';
import { PaginationDto } from 'src/common/dto/paginationDto';
import { LimitApiQueries, PageApiQueries } from 'src/config/swagger-config';
import { SpecialtyNameDto } from './dtos/dentSpecialty.dto';
import { DentalServNameDto } from './dtos/dentDentalServ.dto';
import { ArrayDentalServNameDto } from './dtos/dentDentalServArray.dto';
import { DRoles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/role/guards/roles.guard';
import { Roles } from 'src/role/enums/roles.enum';

@ApiTags('Dentists')
@Controller('dentists')
export class DentistsController {
  constructor(private readonly dentistsService: DentistsService) {}

  @ApiBearerAuth()
  @Get()
  @DRoles(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all dentists.' })
  @ApiResponse({
    status: 200,
    description: 'Returns the information of all dentists.',
  })
  @ApiQuery(PageApiQueries)
  @ApiQuery(LimitApiQueries)
  async getAllDentists(@Query() paginationDto: PaginationDto) {
    return this.dentistsService.getAllDentists(paginationDto);
  }

  @ApiBearerAuth()
  @Get('onlyactive')
  @DRoles(Roles.ADMIN, Roles.ADMINISTRATIVE)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all dentists.' })
  @ApiResponse({
    status: 200,
    description: 'Returns the information of all dentists.',
  })
  @ApiQuery(PageApiQueries)
  @ApiQuery(LimitApiQueries)
  async getAllDentistsActive(@Query() paginationDto: PaginationDto) {
    return this.dentistsService.getAllDentistsActive(paginationDto);
  }

  @Get('best4')
  @ApiOperation({ summary: 'Get the four best rated dentists.' })
  @ApiResponse({
    status: 200,
    description: 'Returns the 4 best rated dentists.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  async get4BestRateDentists() {
    return this.dentistsService.get4BestRateDentists();
  }

  // @Get('byspecialty')
  // @ApiOperation({ summary: 'Get dentists by specialty.' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Returns all dentists with the specified specialty.',
  // })
  // @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  // async dentistsBySpecialty(@Query() specialtyDto: SpecialtyNameDto) {
  //   return this.dentistsService.dentistsBySpecialty(specialtyDto.specialtyName);
  // }

  @ApiBearerAuth()
  @Get('bydentalserv')
  @DRoles(Roles.ADMIN, Roles.ADMINISTRATIVE, Roles.PATIENT)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get dentists by dental service.' })
  @ApiResponse({
    status: 200,
    description: 'Returns all dentists with the dental service name specified.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  async dentistsByDentalServ(@Query() dentalServ: DentalServNameDto) {
    return this.dentistsService.dentistsByDentalServ(dentalServ.name);
  }

  @Get('quantity')
  @ApiOperation({ summary: 'Get teh dentists quantity.' })
  @ApiResponse({
    status: 200,
    description: 'Returns the dentists quantity.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  async dentistsQuantity() {
    return this.dentistsService.dentistsQuantity();
  }

  @Get('dentalServices')
  dentalServicesWithDentists() {
    return this.dentistsService.dentalServicesWhitDentists();
  }

  @ApiBearerAuth()
  @Get('person/:id')
  @DRoles(Roles.ADMIN, Roles.ADMINISTRATIVE, Roles.PATIENT, Roles.DENTIST)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get a dentist by person ID.' })
  @ApiResponse({
    status: 200,
    description: 'Returns to the dentist with the specified person ID.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  async dentistByPersonId(@Param('id', ParseUUIDPipe) id: string) {
    return this.dentistsService.dentistByPersonId(id);
  }

  @ApiBearerAuth()
  @Get(':id')
  @DRoles(Roles.ADMIN, Roles.ADMINISTRATIVE, Roles.PATIENT)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get a dentist by ID.' })
  @ApiResponse({
    status: 200,
    description: 'Returns to the dentist with the specified ID.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  async dentistById(@Param('id', ParseUUIDPipe) id: string) {
    return this.dentistsService.dentistById(id);
  }

  @ApiBearerAuth()
  @Post('create')
  @DRoles(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create a dentist.' })
  @ApiResponse({
    status: 201,
    description: 'Returns the information of the created dentist.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  async createDentist(@Body() dentistInfo: CreateDentistDto) {
    return this.dentistsService.createDentist(dentistInfo);
  }

  @ApiBearerAuth()
  @Patch('changestatus/:id')
  @DRoles(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Enable o disable a dentist with the specific ID.' })
  @ApiResponse({
    status: 201,
    description: 'Returns the dentist with the status changed.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  async changeDentistStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.dentistsService.changeDentistStatus(id);
  }

  // @Patch('adddentalserv/:id')
  // @ApiOperation({ summary: 'Add dental services to the dentist.' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'Returns the dentist with the dental services added.',
  // })
  // @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  // async addDentalServ(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() dentalServ: ArrayDentalServNameDto,
  // ) {
  //   return this.dentistsService.addDentalServ(id, dentalServ.names);
  // }
}
