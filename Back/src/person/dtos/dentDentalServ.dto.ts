import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { DentalServ } from 'src/dentalServ/entities/dentalServ.entity';

export class DentalServNameDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The dental service name.',
    example: 'Protector bucal personalizado',
  })
  name: DentalServ['name'];
}