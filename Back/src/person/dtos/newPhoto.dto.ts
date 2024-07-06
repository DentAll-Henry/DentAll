import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class NewPhotoDto {
  @IsNotEmpty()
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;
}