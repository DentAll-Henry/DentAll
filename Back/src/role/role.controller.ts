import { Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
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

  @Get(':name')
  async roleById(@Param('name') name: Roles) {
    return this.rolesService.roleByName(name);
  }

  @Post()
  async createRoles() {
    return this.rolesService.createRoles();
  }
}
