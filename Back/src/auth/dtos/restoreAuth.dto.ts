import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RestoreAuthDto {
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
  
  @IsNotEmpty()
  @ApiProperty({
    description: 'Confirm your password',
    example: 'Pass*123'
  })
  confirmPass: string;
}