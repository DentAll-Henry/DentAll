import { Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './role.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from './enums/roles.enum';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async getRoles() {
    return this.rolesService.getRoles();
  }

  @Get(':id')
  async roleByName(@Param('role') role: Roles) {
    return this.rolesService.roleByName(role);
  }

  @Post()
  async createRoles() {
    return this.rolesService.createRoles();
  }
}
