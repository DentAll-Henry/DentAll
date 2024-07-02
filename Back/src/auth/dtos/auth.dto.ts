import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'It should be a valid email',
    example: 'example@mail.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Enter your password',
    example: 'Pass*123'
  })
  password: string;
}