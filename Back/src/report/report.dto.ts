import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ProductReport } from './productReport.entity';
import { productReportDto, productReportDto2 } from './productReport.dto';
import { AppointmentPaginationDto } from 'src/common/dto/paginationDto';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ReportDto {
  @IsOptional()
  products: productReportDto2[];

  @IsNotEmpty()
  @IsUUID()
  appointment_id: string;
}

export class CreateReportDto {
  @IsOptional()
  products: productReportDto2[];

  @IsNotEmpty()
  @ApiProperty()
  @IsUUID()
  appointment: Appointment;
}

export class UpdateReportDto {
  @IsNotEmpty()
  products: productReportDto2[];

  @IsNotEmpty()
  @IsUUID()
  appointment_id: string;
}
