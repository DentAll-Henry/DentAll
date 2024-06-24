import { Body, Controller, Get } from "@nestjs/common";
import { RolesService } from "./role.service";
import { Roles } from "./enums/roles.enum";

@Controller('roles')
export class RolesController {
    constructor(
        private readonly rolesService: RolesService,
    ){}

    @Get()
    async getRoles() {
        return this.rolesService.getRoles();
    }

    @Get()
    async roleByName(@Body() name: Roles) {
        return this.rolesService.roleByName(name);
    }
}