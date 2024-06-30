import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class HeadquarterDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    type: String,
    maxLength: 50,
    example: 'Headquarter 1',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    type: String,
    maxLength: 100,
    example: 'Street 1',
  })
  address: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  @ApiProperty({
    type: String,
    maxLength: 200,
    example: 'http://example.com/image1.jpg',
  })
  img: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(-90)
  @Max(90)
  @ApiProperty({
    type: Number,
    example: 40.7128,
  })
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(-180)
  @Max(180)
  @ApiProperty({
    type: Number,
    example: 40.7128,
  })
  lng: number;
}
