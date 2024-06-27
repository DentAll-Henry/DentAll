import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { Product } from 'src/product/product.entity';
import { v4 as uuid } from 'uuid';

export class productReportDto {
  @ApiProperty({
    description: 'Product UUID',
    required: true,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  product_id: string;

  @ApiProperty({
    description: 'Quantity of products used',
    required: true,
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    description: 'Report UUID',
    required: true,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  report_id: string;
}

export class productReportDto2 {
  @ApiProperty({
    description: 'Product UUID',
    required: true,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  id: string = uuid();

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Extra quantity of products used. Not the total ',
    required: true,
    example: 5,
  })
  quantity: number;
}
