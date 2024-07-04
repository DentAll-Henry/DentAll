import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { DentalServ } from 'src/dentalServ/entities/dentalServ.entity';
import { DentalServNameDto } from './dentDentalServ.dto';
import { Type } from 'class-transformer';

export class ArrayDentalServNameDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true})
  @ApiProperty({
    description: 'The dental service name array.',
    example: "[ { name: 'Protector bucal personalizado'}, { name: 'Limpieza dental'} ]",
  })
  names: DentalServNameDto[];
}