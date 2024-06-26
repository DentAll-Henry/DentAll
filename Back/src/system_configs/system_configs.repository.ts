import { Injectable } from "@nestjs/common";
import { SystemConfig } from "./entities/system_config.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateSystemConfigDto } from "./dto/update-system_config.dto";

@Injectable()
export class SystemConfigsRepository {
    constructor(
        @InjectRepository(SystemConfig) private systemConfig: Repository<SystemConfig>,
    ) {

    }

    async findAll() {
        return await this.systemConfig.find();
    }

    async findOne(slug_name: string) {
        return await this.systemConfig.findOne({ where: { slug_name } });
    }

    async update(updateSystemConfigDto: UpdateSystemConfigDto) {

        return await this.systemConfig.save(updateSystemConfigDto);
    }

}