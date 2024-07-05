import { APP_FILTER } from '@nestjs/core';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class fileUploadDto {
  @IsNotEmpty()
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;

  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Fotos',
    description: 'Path donde se guarda el archivo',
  })
  path: string;
}
