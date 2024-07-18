import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsUUID,
  Length,
} from 'class-validator';

export class UpdatePersonDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: 'The person UUID.',
    example: "3ffa3e35-7ddd-488c-90ea-86270576c14a",
  })
  id: string;

  @IsOptional()
  @IsNumberString(
    {},
    {
      message: 'It must have only numbers',
    },
  )
  @Length(10, 15)
  @ApiProperty({
    description: 'It must have only numbers and must be between 10 and 15 characters',
    example: '123456789',
  })
  phone: string;

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

  @IsOptional()
  @ApiProperty({
    description: 'Confirm your current password',
    example: 'Pass*123',
  })
  password: string;
}
