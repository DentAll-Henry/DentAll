import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Roles } from '../../role/enums/roles.enum';

export class ChangeRoleDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'It should be a valid id person.',
    example: '1939d624-29ab-4e6f-8f4b-1f30150e80b9',
  })
  id_person: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'It should be a valid new role name',
    example: 'patient',
  })
  new_role: Roles;
}
