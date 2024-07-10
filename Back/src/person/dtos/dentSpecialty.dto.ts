import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SpecialtyNameDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The specialty name.',
    example: 'Endodoncia',
  })
  specialtyName: string;
}
