import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Deseases } from '../entities/deseases.entity';
import { ApiProperty } from '@nestjs/swagger';
import { deseases } from 'src/db/deseasesDB';
import { ToothInfoDto } from './toothInfo.dto';
import { Type } from 'class-transformer';

export class DentalRecordDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ToothInfoDto)
  @ApiProperty({
    type: Array,
    description: 'Array of tooth information',
    required: true,
  })
  toothInfo: ToothInfoDto[];

  @IsNotEmpty()
  @IsString()
  @Length(3, 25)
  @ApiProperty({
    description: 'The name of the health insurance',
    example: 'Sanitas',
    type: String,
    required: true,
    maxLength: 25,
    minLength: 3,
  })
  health_Insurance: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty({
    description: 'The id of the patient',
    example: 'd6a2f6a9-5b2f-4f7b-9e9d-8f8e8f8e8f8e',
    type: String,
    required: true,
  })
  patient_id: string;

  @IsString()
  @MaxLength(150)
  @ApiProperty({
    description: 'The observations of the patient',
    example: 'Dental problems',
    type: String,
    required: false,
    maxLength: 150,
  })
  observations: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'The deseases of the patient',
    type: [deseases],
    required: false,
  })
  deseases: Deseases[];

  @IsString()
  @MaxLength(50)
  @ApiProperty({
    description: 'The medication of the patient',
    example: 'Ibuprofen',
    type: String,
    required: false,
    maxLength: 50,
  })
  medication: string;
}
