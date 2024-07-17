import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
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
import { PatientsService } from './patient.service';
import { LimitApiQueries, PageApiQueries } from 'src/config/swagger-config';
import { PaginationDto } from 'src/common/dto/paginationDto';
import { Patient } from './entities/patient.entity';
import { DRoles } from 'src/decorators/roles.decorator';
import { Roles } from 'src/role/enums/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/role/guards/roles.guard';

@ApiTags('Patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @ApiBearerAuth()
  @Get()
  @DRoles(Roles.ADMIN, Roles.ADMINISTRATIVE)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all patients.' })
  @ApiResponse({
    status: 200,
    description: 'Return an array with all patients.',
  })
  @ApiQuery(PageApiQueries)
  @ApiQuery(LimitApiQueries)
  async getAllPatients(
    @Query() paginationDto: PaginationDto,
  ): Promise<Patient[]> {
    return this.patientsService.getAllPatients(paginationDto);
  }

  @Get('quantity')
  @ApiOperation({ summary: 'Get the patients quantity.' })
  @ApiResponse({ status: 200, description: 'Returns the patients quantity.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  async patientsQuantity() {
    return this.patientsService.patientsQuantity();
  }

  @ApiBearerAuth()
  @Get('person/:id')
  @DRoles(Roles.ADMIN, Roles.ADMINISTRATIVE, Roles.PATIENT, Roles.DENTIST)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get a patient by person ID.' })
  @ApiResponse({
    status: 200,
    description: 'Returns to the patient with the specified person ID.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Patient with that ID does not exist.',
  })
  async patientByPersonId(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Patient> {
    return this.patientsService.patientByPersonId(id);
  }

  @ApiBearerAuth()
  @Get('dentist/:iddentist')
  @DRoles(Roles.ADMIN, Roles.DENTIST)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get a patient by dentist ID.' })
  @ApiResponse({
    status: 200,
    description: 'Returns to the patient with the specified dentist ID.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Dentist does not have patinets.',
  })
  @ApiQuery(PageApiQueries)
  @ApiQuery(LimitApiQueries)
  async patientByDentistId(
    @Param('iddentist', ParseUUIDPipe) iddentist: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<Patient[]> {
    return this.patientsService.patientByDentistId(iddentist, paginationDto);
  }

  @ApiBearerAuth()
  @Get(':id')
  @DRoles(Roles.ADMIN, Roles.DENTIST)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get a patient by ID.' })
  @ApiResponse({
    status: 200,
    description: 'Returns to the patient with the specified ID.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Patient with that ID does not exist.',
  })
  async patientById(@Param('id', ParseUUIDPipe) id: string): Promise<Patient> {
    return this.patientsService.patientById(id);
  }

  // @Post('create/:idperson')
  // @ApiOperation({ summary: 'Create a patient.' })
  // @ApiResponse({ status: 201, description: 'Returns the information of the created patient.' })
  // @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  // async createPatient(@Param('idperson', ParseUUIDPipe) idperson: string) {
  //   return this.patientsService.createPatient(idperson);
  // }
}
