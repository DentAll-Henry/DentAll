import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ProductReport } from './productReport.entity';

export class ReportDto {
  @IsOptional()
  products: ProductReport[];

  @IsNotEmpty()
  @IsUUID()
  appointment_id: string;
}
