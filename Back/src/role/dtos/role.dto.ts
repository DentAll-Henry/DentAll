import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';
import { Roles } from '../enums/roles.enum';

export class RoleByNameDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @ApiProperty({
    description: "Roles's name",
    example: 'patient',
  })
  name: Roles;
}
