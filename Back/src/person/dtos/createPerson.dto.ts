import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreatePersonDto {
  @Length(2, 20, {
    message: 'First name length must be between 2 and 20 characters',
  })
  @ApiProperty({
    description: 'First name length must be between 2 and 20 characters',
    example: 'John',
  })
  first_name: string;

  @Length(2, 20, {
    message: 'Last name length must be between 2 and 20 characters',
  })
  @ApiProperty({
    description: 'Last name length must be between 2 and 20 characters',
    example: 'Doe',
  })
  last_name: string;

  @IsDateString(
    {},
    {
      message: 'It must be a valid date',
    },
  )
  @ApiProperty({
    description: 'It must be a valid date',
    example: '2000-01-25',
  })
  birthdate: Date;

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
  dni: string;

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
  email: string;

  @Length(2, 50, {
    message: 'Address length must be between 2 and 20 characters',
  })
  @ApiProperty({
    description: 'Address length must be between 2 and 20 characters',
    example: 'Avenida Alvarez Jonte 1234, CABA, Buenos Aires',
  })
  address: string;

  @Length(2, 50, {
    message: 'Location length must be between 2 and 20 characters',
  })
  @ApiProperty({
    description: 'Location length must be between 2 and 20 characters',
    example: 'Ciudad Autonoma de Buenos Aires - CABA',
  })
  location: string;

  @Length(2, 20, {
    message: 'Nationality length must be between 2 and 20 characters',
  })
  @ApiProperty({
    description: 'Nationality length must be between 2 and 20 characters',
    example: 'Argentino',
  })
  nationality: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'It is needed only for user from auth0',
    example: false,
  })
  is_auth0?: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Image URL',
    example: false,
  })
  photo?: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password should has at less 8 characters, including a upper case letter, a lower case letter, a number an a symbol.',
    },
  )
  @ApiProperty({
    description:
      'Password should has at less 8 characters, including a upper case letter, a lower case letter, a number an a symbol.',
    example: 'Pass*123',
  })
  password: string;
}
