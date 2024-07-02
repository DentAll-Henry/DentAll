import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ToothNumber } from '../entities/toothNumber.enum';
import { Paint } from '../entities/paint.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ToothInfoDto {
  @IsOptional()
  @IsString()
  @MaxLength(150)
  @ApiProperty({
    type: String,
    description: 'Observations of the tooth',
    example: 'Tooth it is stained',
    required: false,
  })
  observations: string;

  @IsNotEmpty()
  @IsEnum(ToothNumber)
  @ApiProperty({
    type: ToothNumber,
    description: 'Tooth number',
    example: '',
    required: true,
  })
  toothNumber: ToothNumber;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: 'For extraction',
    example: true,
    required: false,
  })
  forExtraction: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: 'Absent',
    example: true,
    required: false,
  })
  absent: boolean;

  @IsOptional()
  @IsEnum(Paint)
  @ApiProperty({
    type: Paint,
    description: 'Top diagram of the tooth',
    example: 'red',
    required: false,
  })
  top: Paint;

  @IsOptional()
  @IsEnum(Paint)
  @ApiProperty({
    type: Paint,
    description: 'Bottom diagram of the tooth',
    example: 'red',
    required: false,
  })
  bottom: Paint;

  @IsOptional()
  @IsEnum(Paint)
  @ApiProperty({
    type: Paint,
    description: 'Left diagram of the tooth',
    example: 'red',
    required: false,
  })
  left: Paint;

  @IsOptional()
  @IsEnum(Paint)
  @ApiProperty({
    type: Paint,
    description: 'Right diagram of the tooth',
    example: 'red',
    required: false,
  })
  right: Paint;

  @IsOptional()
  @IsEnum(Paint)
  @ApiProperty({
    type: Paint,
    description: 'Center diagram of the tooth',
    example: 'red',
    required: false,
  })
  center: Paint;
}
