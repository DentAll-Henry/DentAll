import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ProductReport } from './productReport.entity';
import { productReportDto, productReportDto2 } from './productReport.dto';

export class ReportDto {
  @IsOptional()
  products: productReportDto2[];

  @IsNotEmpty()
  @IsUUID()
  appointment_id: string;
}

export class CreateReportDto {
  @IsOptional()
  products: ProductReport[];

  @IsNotEmpty()
  @IsUUID()
  appointment_id: string;
}

export class UpdateReportDto {
  @IsNotEmpty()
  products: productReportDto2[];

  @IsNotEmpty()
  @IsUUID()
  appointment_id: string;
}
