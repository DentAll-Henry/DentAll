import { Controller, Get, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatientsService } from './patient.service';
import { LimitApiQueries, PageApiQueries } from 'src/config/swagger-config';
import { PaginationDto } from 'src/common/dto/paginationDto';
import { Patient } from './entities/patient.entity';
import { Person } from './entities/person.entity';

@ApiTags('Patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all patients.' })
  @ApiResponse({ status: 200, description: 'Return an array with all people.' })
  @ApiQuery(PageApiQueries)
  @ApiQuery(LimitApiQueries)
  async getAllPeople(@Query() paginationDto: PaginationDto): Promise<Patient[]> {
    return this.patientsService.getAllPatients(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a person by ID.' })
  @ApiResponse({ status: 200, description: 'Returns to the person with the specified ID.' })
  @ApiBadRequestResponse({ status: 400, description: 'Person with that ID does not exist.' })
  async patientById(@Param('id', ParseUUIDPipe) id: string): Promise<Patient> {
    return this.patientsService.patientById(id);
  }

  @Post('create/:idperson')
  @ApiOperation({ summary: 'Create a patient.' })
  @ApiResponse({ status: 201, description: 'Returns the information of the created patient.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  async createPatient(@Param('idperson', ParseUUIDPipe) idperson: string) {
    return this.patientsService.createPatient(idperson);
  }
}
