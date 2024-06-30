import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Length,
} from 'class-validator';

export class UpdatePersonDto {
  @IsOptional()
  @IsNumberString(
    {},
    {
      message: 'It must have only numbers',
    },
  )
  @ApiProperty({
    description: 'It must have only numbers',
    example: '123456789',
  })
  phone?: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'It must be a valid email',
    },
  )
  @ApiProperty({
    description: 'It must be a valid email',
    example: 'example@mail.com',
  })
  email?: string;

  @IsOptional()
  @Length(2, 50, {
    message: 'Address length must be between 2 and 20 characters',
  })
  @ApiProperty({
    description: 'Address length must be between 2 and 20 characters',
    example: 'Avenida Alvarez Jonte 1234, CABA, Buenos Aires',
  })
  address?: string;

  @IsOptional()
  @Length(2, 50, {
    message: 'Location length must be between 2 and 20 characters',
  })
  @ApiProperty({
    description: 'Location length must be between 2 and 20 characters',
    example: 'Ciudad Autonoma de Buenos Aires - CABA',
  })
  location?: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Confirm your current password',
    example: 'Pass*123',
  })
  confirmPass: string;
}
