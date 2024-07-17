import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { SystemConfigsService } from './system_configs.service';
import { UpdateSystemConfigDto } from './dto/update-system_config.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ValidateSystemConfigPipe } from './pipes/validate_system_config_pipe';
import { DRoles } from 'src/decorators/roles.decorator';
import { Roles } from 'src/role/enums/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/role/guards/roles.guard';

@ApiTags('System Configs')
@Controller('system_configs')
export class SystemConfigsController {
  constructor(private readonly systemConfigsService: SystemConfigsService) {}

  
  @ApiBearerAuth()
  @Get()
  @DRoles(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  //@ApiBearerAuth()
  @ApiOperation({ summary: 'Get system config' })
  @ApiResponse({
    status: 200,
    description: 'Return system configs list',
    type: UpdateSystemConfigDto,
    isArray: true,
  })
  findAll() {
    return this.systemConfigsService.findAll();
  }

  @ApiBearerAuth()
  @Get(':slug_name')
  @DRoles(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get a specific system config by slug_name' })
  @ApiResponse({
    status: 200,
    description: 'Return a system config value',
    type: UpdateSystemConfigDto,
  })
  @ApiResponse({ status: 404, description: 'System config not found' })
  @ApiParam({
    name: 'slug_name',
    required: true,
    description: 'System config slug name param',
    example: 'open_time',
  })
  findOne(@Param('slug_name') id: string) {
    return this.systemConfigsService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch()
  @DRoles(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update all system configs' })
  @ApiResponse({ status: 200, description: 'Return the new system configs.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({
    type: UpdateSystemConfigDto,
    description: 'An array of system config DTO',
    isArray: true,
  })
  @UsePipes(new ValidateSystemConfigPipe())
  update(@Body() updateSystemConfigDto: UpdateSystemConfigDto[]) {
    return this.systemConfigsService.update(updateSystemConfigDto);
  }
}
