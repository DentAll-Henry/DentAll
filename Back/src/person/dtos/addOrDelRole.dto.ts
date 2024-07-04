import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Roles } from "../../role/enums/roles.enum";

export class AddOrDelRoleDto {
    @IsNotEmpty()
    @ApiProperty({
        description: 'The name of a valid role.',
        example: 'patient'
    })
    roleName: Roles
}