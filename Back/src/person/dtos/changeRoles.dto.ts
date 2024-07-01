import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Roles } from "src/role/enums/roles.enum";

export class ChangeRoleDto {
    @IsNotEmpty()
    @ApiProperty({
        description: 'The name of a valid role.',
        example: 'patient'
    })
    roleName: Roles
}