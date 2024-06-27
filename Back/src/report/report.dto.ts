import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ProductReport } from './productReport.entity';
import { productReportDto, productReportDto2 } from './productReport.dto';
import { AppointmentPaginationDto } from 'src/common/dto/paginationDto';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ReportDto {
  @IsOptional()
  @ApiProperty({ type: productReportDto2, isArray: true })
  products: productReportDto2[];

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    type: String,
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  appointment_id: string;
}

export class CreateReportDto {
  @IsOptional()
  @ApiProperty({ type: productReportDto2, isArray: true })
  products: productReportDto2[];

  @IsNotEmpty()
  @ApiProperty({
    type: Appointment,
    example: {
      id: '123e4567-e89b-12d3-a456-426655440000',
      date_time: new Date(),
      description: 'Description',
      dentist_id: '123e4567-e89b-12d3-a456-426655440000',
      patient: '123e4567-e89b-12d3-a456-426655440000',
      service: '123e4567-e89b-12d3-a456-426655440000',
    },
  })
  @IsUUID()
  appointment: Appointment;
}

export class UpdateReportDto {
  @IsNotEmpty()
  @ApiProperty({ type: productReportDto2, isArray: true })
  products: productReportDto2[];

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    type: String,
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  appointment_id: string;
}
