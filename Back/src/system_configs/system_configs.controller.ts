import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemConfigsService } from './system_configs.service';
import { UpdateSystemConfigDto } from './dto/update-system_config.dto';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('System Configs')
@Controller('system_configs')
export class SystemConfigsController {
  constructor(private readonly systemConfigsService: SystemConfigsService) { }

  @Get()
  //@ApiBearerAuth()
  @ApiOperation({ summary: 'Get system config' })
  @ApiResponse({ status: 200, description: 'Return system configs list', type: UpdateSystemConfigDto, isArray: true })
  findAll() {
    return this.systemConfigsService.findAll();
  }

  @Get(':slug_name')
  @ApiOperation({ summary: 'Get a specific system config by slug_name' })
  @ApiResponse({ status: 200, description: 'Return a system config value', type: UpdateSystemConfigDto })
  @ApiResponse({ status: 404, description: 'System config not found' })
  @ApiParam({ name: 'slug_name', required: true, description: 'System config slug name param', example: 'open_time' })
  findOne(@Param('slug_name') id: string) {
    return this.systemConfigsService.findOne(id);
  }

  @Patch()
  @ApiOperation({ summary: 'Update all system configs' })
  @ApiResponse({ status: 200, description: 'Return the new system configs.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: UpdateSystemConfigDto, description: 'An array of system config DTO', isArray: true })
  update(@Body() updateSystemConfigDto: UpdateSystemConfigDto[]) {
    return this.systemConfigsService.update(updateSystemConfigDto);
  }

}
