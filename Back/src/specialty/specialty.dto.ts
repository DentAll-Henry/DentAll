import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class specialtyDentalServDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: 'Dental service UUID',
    example: 'a4b0b0c0-1b2c-3b4c-5b6c-7b8c9d0e1f2g',
    type: String,
  })
  id: string;
}

export class specialtyDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name of the specialty',
    example: 'general orthodontics',
    type: String,
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Description of the specialty',
    example:
      'General dentistry focuses on comprehensive dental care, ranging from regular exams and cleanings to restorative treatments such as fillings and crowns.',
    type: String,
  })
  description: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Dental services of the specialty',
    type: [specialtyDentalServDto],
    example: [{ id: 'a4b0b0c0-1b2c-3b4c-5b6c-7b8c9d0e1f2g' }],
    required: false,
  })
  services?: specialtyDentalServDto[];
}

export class updateSpecialtyDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Name of the specialty',
    example: 'Aesthetic dentistry',
    type: String,
    required: false,
  })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Description of the specialty',
    example:
      'Cosmetic dentistry focuses on improving the appearance of the smile and dental aesthetics.',
    type: String,
    required: false,
  })
  description?: string;

  @IsOptional()
  @ApiProperty({
    description: 'Dental services of the specialty',
    type: [specialtyDentalServDto],
    example: [{ id: 'a4b0b0c0-1b2c-3b4c-5b6c-7b8c9d0e1f2g' }],
    required: false,
  })
  services?: specialtyDentalServDto[];
}
