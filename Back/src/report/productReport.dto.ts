import { ApiProperty } from '@nestjs/swagger';
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

export class productReportDto2 {
  @ApiProperty()
  @IsNotEmpty()
  id: string = uuid();

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Extra quantity of products used. Not the total ',
  })
  quantity: number;

  @IsUUID()
  @IsNotEmpty()
  newProduct_id: Product;
}
