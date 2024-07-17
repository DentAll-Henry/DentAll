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
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AppointmentPaginationDto } from 'src/common/dto/paginationDto';
import {
  LimitApiQueries,
  OnlyFutureApiQueries,
  OnlyPastApiQueries,
  PageApiQueries,
} from 'src/config/swagger-config';
import { GetAvailableSlotsDto } from './dto/get_available-slots.dto';
import { CreatePendingAppointmentDto } from './dto/create_pending_appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { GetLastAppointmentDateDto } from './dto/get-last-appointment-date.dto';
import { DRoles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/role/guards/roles.guard';
import { Roles } from 'src/role/enums/roles.enum';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @ApiBearerAuth()
  @Post()
  @DRoles(Roles.ADMIN, Roles.DENTIST, Roles.ADMINISTRATIVE, Roles.PATIENT)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create an appointment' })
  @ApiResponse({
    status: 201,
    description: 'Return the created appointment.',
    type: Appointment,
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: CreateAppointmentDto })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @ApiBearerAuth()
  @Get()
  @DRoles(Roles.ADMIN, Roles.DENTIST, Roles.ADMINISTRATIVE)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all appointments' })
  @ApiResponse({
    status: 200,
    description: 'Return an array with all appointments.',
  })
  @ApiQuery(PageApiQueries)
  @ApiQuery(LimitApiQueries)
  @ApiQuery(OnlyFutureApiQueries)
  @ApiQuery(OnlyPastApiQueries)
  findAll(@Query() paginationDto: AppointmentPaginationDto) {
    return this.appointmentsService.findAll(paginationDto);
  }

  @ApiBearerAuth()
  @Get('/dentist/:dentist_id')
  @DRoles(Roles.ADMIN, Roles.DENTIST, Roles.ADMINISTRATIVE)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all appointments for a dentist given his ID' })
  @ApiResponse({
    status: 200,
    description: 'Return an array with all appointments of the dentist.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiParam({
    name: 'dentist_id',
    required: true,
    description: 'Dentist ID in UUID format',
    example: '62a3bd93-1c50-436a-9644-cd314cf71623',
  })
  @ApiQuery(PageApiQueries)
  @ApiQuery(LimitApiQueries)
  @ApiQuery(OnlyFutureApiQueries)
  @ApiQuery(OnlyPastApiQueries)
  findByDentist(
    @Param('dentist_id', ParseUUIDPipe) dentist_id: string,
    @Query() paginationDto: AppointmentPaginationDto,
  ) {
    const { page, limit, only_future } = paginationDto;
    return this.appointmentsService.findByDentist(dentist_id, paginationDto);
  }

  @ApiBearerAuth()
  @Post('/pending_appointment')
  @DRoles(Roles.ADMIN, Roles.DENTIST)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Create a request for an appointment. This is made by a dentist',
  })
  @ApiResponse({
    status: 201,
    description: 'Return the created appointment request.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: CreatePendingAppointmentDto })
  createPendingAppointmentRequest(
    @Body() createPendingAppointmentDto: CreatePendingAppointmentDto,
  ) {
    return this.appointmentsService.createPendingAppointmentRequest(
      createPendingAppointmentDto,
    );
  }

  @ApiBearerAuth()
  @Get('pending_appointments_by_patient/:patient_id')
  @DRoles(Roles.ADMIN, Roles.ADMINISTRATIVE, Roles.PATIENT)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary:
      'Get all pending request for appointments for a patient given his ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Return an array with all appointments',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiParam({
    name: 'patient_id',
    required: true,
    description: 'Patient ID in UUID format',
    example: '62a3bd93-1c50-436a-9644-cd314cf71623',
  })
  getPendingAppointmentsByPatient(
    @Param('patient_id', ParseUUIDPipe) patient_id: string,
  ) {
    return this.appointmentsService.getPendingAppointmentsByPatient(patient_id);
  }

  @ApiBearerAuth()
  @Get('/patient/:patient_id')
  @DRoles(Roles.ADMIN, Roles.ADMINISTRATIVE, Roles.PATIENT)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all appointments for a patient given his ID' })
  @ApiResponse({
    status: 200,
    description: 'Return an array with all appointments of the patient.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiParam({
    name: 'patient_id',
    required: true,
    description: 'Patient ID in UUID format',
    example: '62a3bd93-1c50-436a-9644-cd314cf71623',
  })
  @ApiQuery(PageApiQueries)
  @ApiQuery(LimitApiQueries)
  @ApiQuery(OnlyFutureApiQueries)
  @ApiQuery(OnlyPastApiQueries)
  findByPatient(
    @Param('patient_id', ParseUUIDPipe) id: string,
    @Query() paginationDto: AppointmentPaginationDto,
  ) {
    return this.appointmentsService.findByPatient(id, paginationDto);
  }

  @ApiBearerAuth()
  @Get(':appointment_id')
  @DRoles(Roles.ADMIN, Roles.DENTIST, Roles.ADMINISTRATIVE, Roles.PATIENT)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get an appointment given his ID' })
  @ApiResponse({
    status: 200,
    description: 'Return all data of the appointment.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiParam({
    name: 'appointment_id',
    required: true,
    description: 'Appointment ID in UUID format',
    example: '62a3bd93-1c50-436a-9644-cd314cf71623',
  })
  findOne(@Param('appointment_id', ParseUUIDPipe) id: string) {
    return this.appointmentsService.findOne(id);
  }

  // @Patch(':appointment_id')
  // @ApiBearerAuth()
  // @ApiOperation({
  //   summary:
  //     'Update an appointment given his ID as a parameter and the data to be updated in the body',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Return the new updated appointment.',
  // })
  // @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  // @ApiParam({
  //   name: 'appointment_id',
  //   required: true,
  //   description: 'Appointment ID in UUID format',
  //   example: '62a3bd93-1c50-436a-9644-cd314cf71623',
  // })
  // @ApiBody({
  //   type: CreateAppointmentDto,
  //   description:
  //     'Appointment data to be updated. All fields are not required, just the ones to be updated.',
  // })
  // update(
  //   @Param('appointment_id', ParseUUIDPipe) id: string,
  //   @Body() updateAppointmentDto: UpdateAppointmentDto,
  // ) {
  //   return this.appointmentsService.update(id, updateAppointmentDto);
  // }

  @ApiBearerAuth()
  @Post('get_available_slots')
  @DRoles(Roles.ADMIN, Roles.PATIENT)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Get available slots for a given date and dentist' })
  @ApiResponse({
    status: 200,
    description: 'Return an array with all available slots.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  async getAvailableSlots(@Body() getAvailableSlotsDto: GetAvailableSlotsDto) {
    return await this.appointmentsService.getAvailableSlots(
      getAvailableSlotsDto,
    );
  }

  @ApiBearerAuth()
  @Get('last_appointment_date/:dentist_id/:patient_id')
  @DRoles(Roles.ADMIN, Roles.DENTIST)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Find the last appointment date for a patient by dentist.',
  })
  @ApiResponse({
    status: 201,
    description: 'Return the date and time of the last appointment.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  getLastAppointment(
    @Param('dentist_id', ParseUUIDPipe) dentist_id: string,
    @Param('patient_id', ParseUUIDPipe) patient_id: string,
  ) {
    const getLastAppointmentDate: GetLastAppointmentDateDto = {
      dentist_id,
      patient_id,
    };
    return this.appointmentsService.getLastAppointment(getLastAppointmentDate);
  }

  @ApiBearerAuth()
  @Delete(':appointment_id')
  @DRoles(Roles.ADMIN, Roles.DENTIST, Roles.ADMINISTRATIVE, Roles.PATIENT)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Delete an appointment given his ID as a parameter',
  })
  @ApiResponse({
    status: 200,
    description: 'Return a message that the appointment has been deleted.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiParam({
    name: 'appointment_id',
    required: true,
    description: 'Appointment ID in UUID format',
    example: '62a3bd93-1c50-436a-9644-cd314cf71623',
  })
  remove(@Param('appointment_id', ParseUUIDPipe) id: string) {
    return this.appointmentsService.remove(id);
  }
}
