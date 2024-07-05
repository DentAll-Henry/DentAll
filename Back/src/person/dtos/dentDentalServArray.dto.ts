import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { DentalServNameDto } from './dentDentalServ.dto';
import { Type } from 'class-transformer';

export class ArrayDentalServNameDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => DentalServNameDto)
  @ValidateNested({ each: true })
  @ApiProperty({
    description: 'The dental services names array.',
  })
  names: DentalServNameDto[];
}
