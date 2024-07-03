import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DentalServIdDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The dental service ID.',
    example: '67039ad6-fceb-4a8c-b220-c139d487e917',
  })
  dentalServId: string;
}