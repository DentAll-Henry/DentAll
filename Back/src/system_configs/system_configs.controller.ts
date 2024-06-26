import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemConfigsService } from './system_configs.service';
import { UpdateSystemConfigDto } from './dto/update-system_config.dto';

@Controller('system_configs')
export class SystemConfigsController {
  constructor(private readonly systemConfigsService: SystemConfigsService) {}


  @Get()
  findAll() {
    return this.systemConfigsService.findAll();
  }

  @Get(':slug_name')
  findOne(@Param('slug_name') id: string) {
    return this.systemConfigsService.findOne(id);
  }

  @Patch()
  update(@Body() updateSystemConfigDto: UpdateSystemConfigDto[]) {
    return this.systemConfigsService.update(updateSystemConfigDto);
  }

}
