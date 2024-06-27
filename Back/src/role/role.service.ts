import { Injectable, OnModuleInit } from '@nestjs/common';
import { RolesRepository } from './role.repository';
import { Roles } from './enums/roles.enum';

@Injectable()
export class RolesService implements OnModuleInit {
  constructor(private readonly rolesRespository: RolesRepository) {}
  async onModuleInit() {
    return await this.rolesRespository.init();
  }

  async getRoles() {
    return this.rolesRespository.getRoles();
  }

  async roleByName(name: Roles) {
    return this.rolesRespository.roleByName(name);
  }

  async createRoles() {
    return this.rolesRespository.createRoles();
  }
}
