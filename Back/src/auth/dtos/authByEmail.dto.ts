import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class AuthByEmailDto {
  @IsEmail()
  @ApiProperty({
    description: 'It should be a valid email',
    example: 'example@mail.com',
  })
  email: string;
}
