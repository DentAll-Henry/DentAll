import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class CreateDentistDto {
  @IsOptional()
  @ApiProperty({
    description: 'The specialty name.',
    example: 'Odontología general',
  })
  specialtyName?: string;

  @IsOptional()
  @ApiProperty({
    description: 'The dental service name.',
    example: 'Consulta de valoración',
  })
  dentalServName?: string;

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
    description:
      'Dentist rating, between 0 an 5, with only one decimal places.',
    example: 4.5,
  })
  rate?: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The UUID of the person who will have the dentist role.',
    example: '3bdd292f-8570-4507-be25-01b5ecfc79d3',
  })
  personId: string;

  @IsOptional()
  @ApiProperty({
    description: 'Dentist description',
    example:
      'Profesional odontólogo especializado en el cuidado y mantenimiento de la salud bucodental.',
  })
  description: string;
}
