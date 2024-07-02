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
  HttpCode,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppointmentPaginationDto } from 'src/common/dto/paginationDto';
import { LimitApiQueries, OnlyFutureApiQueries, OnlyPastApiQueries, PageApiQueries } from 'src/config/swagger-config';
import { GetAvailableSlotsDto } from './dto/get_available-slots.dto';
import { CreatePendingAppointmentDto } from './dto/create_pending_appointment.dt';
import { Appointment } from './entities/appointment.entity';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) { }

  @Post()
  @ApiOperation({ summary: 'Create an appointment' })
  @ApiResponse({ status: 201, description: 'Return the created appointment.', type: Appointment })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: CreateAppointmentDto })
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
  @ApiQuery(OnlyPastApiQueries)
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
  @ApiQuery(OnlyPastApiQueries)
  findByDentist(@Param('dentist_id', ParseUUIDPipe) dentist_id: string, @Query() paginationDto: AppointmentPaginationDto) {
    const { page, limit, only_future } = paginationDto;
    return this.appointmentsService.findByDentist(dentist_id, paginationDto);
  }

  @Post('/pending_appointment')
  @ApiOperation({ summary: 'Create a request for an appointment. This is made by a dentist' })
  @ApiResponse({ status: 201, description: 'Return the created appointment request.', })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: CreatePendingAppointmentDto })
  createPendingAppointmentRequest(@Body() createPendingAppointmentDto: CreatePendingAppointmentDto) {
    return this.appointmentsService.createPendingAppointmentRequest(createPendingAppointmentDto);
  }

  @Get('pending_appointments_by_patient/:patient_id')
  @ApiOperation({ summary: 'Get all pending request for appointments for a patient given his ID' })
  @ApiResponse({ status: 200, description: 'Return an array with all appointments' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiParam({ name: 'patient_id', required: true, description: 'Patient ID in UUID format', example: '62a3bd93-1c50-436a-9644-cd314cf71623' })
  getPendingAppointmentsByPatient(@Param('patient_id', ParseUUIDPipe) patient_id: string) {
    return this.appointmentsService.getPendingAppointmentsByPatient(patient_id);
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
  @ApiQuery(OnlyPastApiQueries)
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

  @Post('get_available_slots')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get available slots for a given date and dentist' })
  @ApiResponse({ status: 200, description: 'Return an array with all available slots.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  getAvailableSlots(@Body() getAvailableSlotsDto: GetAvailableSlotsDto) {
    console.log(getAvailableSlotsDto)
    return this.appointmentsService.getAvailableSlots(getAvailableSlotsDto);
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
