import { ApiProperty } from '@nestjs/swagger';

export class fileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
