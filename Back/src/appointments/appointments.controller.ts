import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppointmentPaginationDto } from 'src/common/dto/paginationDto';
import { LimitApiQueries, OnlyFutureApiQueries, PageApiQueries } from 'src/config/swagger-config';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) { }

  @Post()
  @ApiOperation({ summary: 'Create an appointment' })
  @ApiResponse({ status: 201, description: 'Return the created appointment.', })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all appointments' })
  @ApiResponse({ status: 200, description: 'Return an array with all appointments.' })
  @ApiQuery(PageApiQueries)
  @ApiQuery(LimitApiQueries)
  @ApiQuery(OnlyFutureApiQueries)
  findAll(@Query() paginationDto: AppointmentPaginationDto) {
    
    return this.appointmentsService.findAll(paginationDto);
  }

  @Get('/dentist/:dentist_id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all appointments for a dentist given his ID' })
  @ApiResponse({ status: 200, description: 'Return an array with all appointments of the dentist.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiParam({ name: 'dentist_id', required: true, description: 'Dentist ID in UUID format', example: '62a3bd93-1c50-436a-9644-cd314cf71623' })
  @ApiQuery(PageApiQueries)
  @ApiQuery(LimitApiQueries)
  @ApiQuery(OnlyFutureApiQueries)
  findByDentist(@Param('dentist_id', ParseUUIDPipe) dentist_id: string, @Query() paginationDto: AppointmentPaginationDto) {
    const { page, limit, only_future } = paginationDto;
    return this.appointmentsService.findByDentist(dentist_id, paginationDto);
  }

  @Get('/patient/:patient_id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all appointments for a patient given his ID' })
  @ApiResponse({ status: 200, description: 'Return an array with all appointments of the patient.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiParam({ name: 'patient_id', required: true, description: 'Patient ID in UUID format', example: '62a3bd93-1c50-436a-9644-cd314cf71623' })
  @ApiQuery(PageApiQueries)
  @ApiQuery(LimitApiQueries)
  @ApiQuery(OnlyFutureApiQueries)
  findByPatient(@Param('patient_id', ParseUUIDPipe) id: string, @Query() paginationDto: AppointmentPaginationDto) {
    return this.appointmentsService.findByPatient(id, paginationDto);
  }

  @Get(':appointment_id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get an appointment given his ID' })
  @ApiResponse({ status: 200, description: 'Return all data of the appointment.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiParam({ name: 'appointment_id', required: true, description: 'Appointment ID in UUID format', example: '62a3bd93-1c50-436a-9644-cd314cf71623' })
  findOne(@Param('appointment_id', ParseUUIDPipe) id: string) {
    return this.appointmentsService.findOne(id);
  }

  @Patch(':appointment_id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an appointment given his ID as a parameter and the data to be updated in the body' })
  @ApiResponse({ status: 200, description: 'Return the new updated appointment.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiParam({ name: 'appointment_id', required: true, description: 'Appointment ID in UUID format', example: '62a3bd93-1c50-436a-9644-cd314cf71623' })
  @ApiBody({ type: CreateAppointmentDto, description: 'Appointment data to be updated. All fields are not required, just the ones to be updated.' })
  update(
    @Param('appointment_id', ParseUUIDPipe) id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @Delete(':appointment_id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an appointment given his ID as a parameter' })
  @ApiResponse({ status: 200, description: 'Return a message that the appointment has been deleted.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiParam({ name: 'appointment_id', required: true, description: 'Appointment ID in UUID format', example: '62a3bd93-1c50-436a-9644-cd314cf71623' })
  remove(@Param('appointment_id', ParseUUIDPipe) id: string) {
    return this.appointmentsService.remove(id);
  }
}
