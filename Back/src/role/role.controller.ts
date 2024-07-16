import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RolesService } from './role.service';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from './enums/roles.enum';
import { LimitApiQueries, PageApiQueries } from '../config/swagger-config';
import { PaginationDto } from '../common/dto/paginationDto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // @Get()
  // @ApiOperation({ summary: 'Get all roles.' })
  // @ApiResponse({ status: 200, description: 'Returns an array with all of the roles.' })
  // @ApiQuery(PageApiQueries)
  // @ApiQuery(LimitApiQueries)
  // async getRoles(@Query() paginationDto: PaginationDto) {
  //   return this.rolesService.getRoles(paginationDto);
  // }

  // @Get(':name')
  // @ApiOperation({ summary: 'Get role by name.' })
  // @ApiResponse({ status: 200, description: 'Returns a role by name.' })
  // @ApiBadRequestResponse({ status: 400, description: 'Role with that name does not exist.' })
  // async roleByName(@Param('name') name: Roles) {
  //   return this.rolesService.roleByName(name);
  // }
}
