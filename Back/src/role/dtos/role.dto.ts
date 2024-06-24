import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Roles } from '../enums/roles.enum';

export class RoleByNameDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "Roles's name",
    example: 'patient',
  })
  name: Roles;
}
