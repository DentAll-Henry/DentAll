import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: 'Invalid email',
    },
  )
  @ApiProperty({
    description: 'It should be a valid email',
    example: 'example@mail.com',
  })
  email: string;

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
    description: 'Password should has at less 8 characters, including a upper case letter, a lower case letter, a number an a symbol.',
    example: 'Pass*123'
  })
  password: string;
}
