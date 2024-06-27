import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  @ApiProperty({
    description: 'Product name',
    maxLength: 80,
    example: 'Product 1',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  @ApiProperty({
    description: 'Product description',
    maxLength: 80,
    example: 'Product 1 description',
  })
  description: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @ApiProperty({
    description: 'Product price',
    example: 100,
  })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Product stock',
    example: 10,
  })
  stock: number;
}

export class toUpdateProductDto {
  @IsString()
  @IsOptional()
  @MaxLength(80)
  @ApiProperty({
    description: 'Product name',
    maxLength: 80,
    example: 'Product 1',
  })
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(80)
  @ApiProperty({
    description: 'Product description',
    maxLength: 80,
    example: 'Product 1 description',
  })
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @ApiProperty({
    description: 'Product price',
    example: 100,
  })
  price?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'Product stock',
    example: 10,
  })
  stock?: number;
}
