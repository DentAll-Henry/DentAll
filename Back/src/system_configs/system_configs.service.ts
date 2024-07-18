import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateSystemConfigDto } from './dto/update-system_config.dto';
import { SystemConfigsRepository } from './system_configs.repository';

@Injectable()
export class SystemConfigsService {

  constructor(
    private readonly systemConfigsRepository: SystemConfigsRepository
  ) { }

  async onModuleInit() {
    const response = await this.systemConfigsRepository.seedSystemConfigsSeeder();
  }

  findAll() {
    return this.systemConfigsRepository.findAll();
  }

  async findOne(slug_name: string) {
    const param = await this.systemConfigsRepository.findOne(slug_name);

    if (!param) throw new NotFoundException(`System Config with slug_name ${slug_name} does not exist`)

    return param
  }

  async update(updateSystemConfig: UpdateSystemConfigDto[]) {

    await Promise.all(updateSystemConfig.map(async (systemConfig) => {
      const param: UpdateSystemConfigDto = systemConfig
      const config = await this.systemConfigsRepository.findOne(param.slug_name);

      if (!config) throw new NotFoundException(`System Config with slug_name ${param.slug_name} does not exist`)

      await this.systemConfigsRepository.update(param)
    }))
    return this.findAll()
  }

}
