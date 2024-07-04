import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ToothNumber } from '../enum/toothNumber.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Code } from '../enum/code.enum';
import { ToothFace } from '../enum/toothFace.enum';

export class TreatmentDto {
  @IsNotEmpty()
  @IsEnum(ToothNumber)
  @ApiProperty({
    type: String,
    description: 'Tooth number',
    example: 15,
    required: true,
  })
  toothNumber: ToothNumber;

  @IsNotEmpty()
  @IsEnum(Code)
  @ApiProperty({
    type: String,
    description: 'Code of treatment',
    example: 'Code 1',
    required: true,
  })
  code: Code;

  @IsNotEmpty()
  @IsEnum(ToothFace)
  @ApiProperty({
    type: String,
    description: 'Tooth face of treatment',
    example: 'Right',
    required: true,
  })
  toothFace: ToothFace;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty({
    description: 'The id of the dental service',
    example: 'd6a2f6a9-5b2f-4f7b-9e9d-8f8e8f8e8f8e',
    type: String,
    required: true,
  })
  dentalServ_id: string;
}
