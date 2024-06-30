import { Injectable } from '@nestjs/common';
import { RolesRepository } from './role.repository';
import { Roles } from './enums/roles.enum';

@Injectable()
export class RolesService{
  constructor(private readonly rolesRespository: RolesRepository) {}

  async getRoles(paginationDto: {page: number , limit: number}) {
    return this.rolesRespository.getRoles(paginationDto);
  }

  async roleByName(name: Roles) {
    return this.rolesRespository.roleByName(name);
  }
}
