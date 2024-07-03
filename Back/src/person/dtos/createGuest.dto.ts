import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNumberString,
  Length,
} from 'class-validator';

export class CreateGuestDto {
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

  @Length(5, 200)
  @ApiProperty({
    description: 'It must has between 5 and 200 characters',
    example: 'Toothache',
  })
  reason: string;
}