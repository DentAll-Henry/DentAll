import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateDentistDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The speciality name.',
    example: 'Endodontics',
  })
  speciality: string;

  @IsOptional()
  @IsNumber(
    {
      maxDecimalPlaces: 1,
    },
    {
      message: 'The maximum number of decimal places is one.',
    },
  )
  @Min(0)
  @Max(5)
  @ApiProperty({
    description: '',
    example: ''
  })
  rate?: number;

  @IsUUID('4', {
    message: 'The UUID of the person who will have the dentist role.',
  })
  person: string;
}
