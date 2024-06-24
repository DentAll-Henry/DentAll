import { Injectable } from "@nestjs/common";
import { RolesRepository } from "./role.repository";
import { Roles } from "./enums/roles.enum";

@Injectable()
export class RolesService {
    constructor(
        private readonly rolesRespository: RolesRepository,
    ) {}

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