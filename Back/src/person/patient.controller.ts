import { Controller, Get, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatientsService } from './patient.service';
import { LimitApiQueries, PageApiQueries } from 'src/config/swagger-config';
import { PaginationDto } from 'src/common/dto/paginationDto';
import { Patient } from './entities/patient.entity';

@ApiTags('Patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all patients.' })
  @ApiResponse({ status: 200, description: 'Return an array with all patients.' })
  @ApiQuery(PageApiQueries)
  @ApiQuery(LimitApiQueries)
  async getAllPatients(@Query() paginationDto: PaginationDto): Promise<Patient[]> {
    return this.patientsService.getAllPatients(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a patient by ID.' })
  @ApiResponse({ status: 200, description: 'Returns to the patient with the specified ID.' })
  @ApiBadRequestResponse({ status: 400, description: 'Patient with that ID does not exist.' })
  async patientById(@Param('id', ParseUUIDPipe) id: string): Promise<Patient> {
    return this.patientsService.patientById(id);
  }

  @Get('person/:id')
  @ApiOperation({ summary: 'Get a patient by person ID.' })
  @ApiResponse({ status: 200, description: 'Returns to the patient with the specified person ID.' })
  @ApiBadRequestResponse({ status: 400, description: 'Patient with that ID does not exist.' })
  async patientByPersonId(@Param('id', ParseUUIDPipe) id: string): Promise<Patient> {
    return this.patientsService.patientByPersonId(id);
  }

  @Post('create/:idperson')
  @ApiOperation({ summary: 'Create a patient.' })
  @ApiResponse({ status: 201, description: 'Returns the information of the created patient.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  async createPatient(@Param('idperson', ParseUUIDPipe) idperson: string) {
    return this.patientsService.createPatient(idperson);
  }
}
