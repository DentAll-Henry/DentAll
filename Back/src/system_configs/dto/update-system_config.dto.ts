import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateSystemConfigDto  {

    @ApiProperty()
    slug_name: string;

    @ApiProperty()
    value: string;
}
