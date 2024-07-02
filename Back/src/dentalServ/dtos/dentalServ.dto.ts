import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class DentalServDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @ApiProperty({
    description: 'Name of the service',
    example: 'Implant',
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Price of the service',
    example: 1000,
    type: Number,
    required: true,
  })
  price: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  @MaxLength(200)
  @ApiProperty({
    description: 'Description of the service',
    example: 'Service for implants',
    type: String,
    required: true,
    minLength: 20,
    maxLength: 200,
  })
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty({
    description: 'Image of the service',
    example:
      'https://shop.bbc.com/cdn/shop/products/14847_300x.jpg?v=1567526955',
    type: String,
    required: false,
  })
  img: string;
}
