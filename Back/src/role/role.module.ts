import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./entities/role.entity";
import { RolesService } from "./role.service";
import { RolesRepository } from "./role.repository";
import { RolesController } from "./role.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    controllers: [RolesController],
    providers: [RolesService, RolesRepository],
    exports: [RolesService, TypeOrmModule]
})
export class RolesModule {}