import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DentalRecordDtoForEdit {
  @IsOptional()
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

  @IsOptional()
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

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'The deseases of the patient',
    type: [String],
    required: false,
  })
  deseases: string[];

  @IsOptional()
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
