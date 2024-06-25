import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { Product } from 'src/product/product.entity';
import { v4 as uuid } from 'uuid';

export class productReportDto {
  @IsNotEmpty()
  product_id: Product;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsUUID()
  @IsNotEmpty()
  report_id: string = uuid();
}
