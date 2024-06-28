import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateSystemConfigDto  {

    @ApiProperty({
        example: "open_time",
        description: "Slug name of the system config to be updated",
        type: "string"
    })
    @IsNotEmpty()
    slug_name: string;

    @ApiProperty({
        example: "08:00",
        description: "Value of the system config",
        type: "string"
    })
    @IsNotEmpty()
    value: string;
}
