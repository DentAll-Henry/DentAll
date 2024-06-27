import { Injectable } from '@nestjs/common';
import { UpdateSystemConfigDto } from './dto/update-system_config.dto';
import { SystemConfigsRepository } from './system_configs.repository';

@Injectable()
export class SystemConfigsService {

  constructor(
    private readonly systemConfigsRepository: SystemConfigsRepository
  ) { }

  async onModuleInit() {
    const response = await this.systemConfigsRepository.seedSystemConfigsSeeder();
    console.log(response)
  }

  findAll() {
    return this.systemConfigsRepository.findAll();
  }

  findOne(slug_name: string) {
    return this.systemConfigsRepository.findOne(slug_name);
  }

  update(updateSystemConfig: UpdateSystemConfigDto[]) {

    updateSystemConfig.map(async (systemConfig) => {
      const param: UpdateSystemConfigDto = systemConfig
      await this.systemConfigsRepository.update(systemConfig);
    })
    return "System Configs updated successfully"
  }

}
