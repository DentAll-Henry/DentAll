import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from './entities/role.entity';
import { Repository } from "typeorm";
import { Roles } from "./enums/roles.enum";
import { rolesDB } from '../db/rolesDB'

@Injectable()
export class RolesRepository {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async getRoles() {
    const roles: Role[] = await this.rolesRepository.find();
    return roles;
  }

  async roleByName(name: Roles): Promise<Role> {
    const role: Role = await this.rolesRepository.findOne({
        where: {
            name,
        }
    });
    if (!role) throw new BadRequestException('Role with that name does not exist')
    return role;
  }

  async createRoles() {
    const rolesInDB: Role[] = await this.getRoles();
    if (rolesInDB.length !== 0) return 'Data in Roles already exist'
    for(const role of rolesDB) {
      await this.rolesRepository.save(role)
    }
    return 'Data in Roles loaded';
  }
}