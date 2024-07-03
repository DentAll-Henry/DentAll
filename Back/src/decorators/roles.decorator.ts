import { SetMetadata } from "@nestjs/common";
import { Roles } from '../role/enums/roles.enum';

export const DRoles = (...roles: Roles[]) => SetMetadata('roles', roles)