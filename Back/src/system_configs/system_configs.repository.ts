import { Injectable } from "@nestjs/common";
import { SystemConfig } from "./entities/system_config.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateSystemConfigDto } from "./dto/update-system_config.dto";
import { system_default_configs } from "src/db/system_config";


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

    async seedSystemConfigsSeeder() {
        try {
            const default_config = system_default_configs
            for (const config of default_config) {
                const param = await this.findOne(config.slug_name)
                if (!param)
                    await this.systemConfig.save(config)
            }
            
        } catch (error) {
            throw error
        }

        return "System config created/updated successfully"
    }

}