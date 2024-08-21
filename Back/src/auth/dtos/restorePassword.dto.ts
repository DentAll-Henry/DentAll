import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class RestorePasswordDto {
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
        'New password should has at less 8 characters, including a upper case letter, a lower case letter, a number an a symbol.',
    },
  )
  @ApiProperty({
    description:
      'New password should has at less 8 characters, including a upper case letter, a lower case letter, a number an a symbol.',
    example: 'Pass*123',
  })
  newPass: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Confirm new password, it must be equal to password.',
    example: 'Pass*123',
  })
  confirmNewPass: string;
}
