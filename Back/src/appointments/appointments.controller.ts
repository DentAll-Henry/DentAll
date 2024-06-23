import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    try {
      console.log(createAppointmentDto)
      return this.appointmentsService.create(createAppointmentDto);
    } catch (error) {
      console.log(error)
    }
  }

  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get('/dentist/:id')
  findByDentist(@Param('id', ParseUUIDPipe) id: string) {
    return this.appointmentsService.findByDentist(id);
  }

  @Get('/patient/:id')
  findByPatient(@Param('id', ParseUUIDPipe) id: string) {
    return this.appointmentsService.findByPatient(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.appointmentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.appointmentsService.remove(id);
  }
}
