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
  rate?: number;

  @IsUUID('4', {
    message: 'El ID debe ser un UUID válido de versión 4',
  })
  person: string;
}
