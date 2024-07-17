import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HeadquarterService } from './headquarter.service';
import { HeadquarterDto } from './dtos/headquarter.dto';
import { LimitApiQueries, PageApiQueries } from 'src/config/swagger-config';
import { DRoles } from 'src/decorators/roles.decorator';
import { Roles } from 'src/role/enums/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/role/guards/roles.guard';

@ApiTags('Headquarter')
@Controller('headquarter')
export class HeadquarterController {
  constructor(private readonly headquarterService: HeadquarterService) {}

  @Get()
  @ApiOperation({ summary: 'Get all headquarters' })
  @ApiResponse({ status: 200, description: 'Return all headquarters.' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Server error.' })
  @ApiQuery(PageApiQueries)
  @ApiQuery(LimitApiQueries)
  async getHeadquarters(
    @Res() res: Response,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    const headquarter = await this.headquarterService.getHeadquarters(
      page,
      limit,
    );
    res.status(200).json(headquarter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a headquarter by ID' })
  @ApiResponse({ status: 200, description: 'Return a headquarter.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Server error.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Headquarter ID in UUID format',
    example: '62a3bd93-1c50-436a-9644-cd314cf71623',
  })
  async getHeadquarterByID(
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const headquarter = await this.headquarterService.getHeadquarterByID(id);
    res.status(200).json(headquarter);
  }

  @ApiBearerAuth()
  @Post()
  @DRoles(Roles.ADMIN, Roles.ADMINISTRATIVE)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create a new headquarter' })
  @ApiResponse({ status: 201, description: 'Return the new headquarter.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Server error.' })
  @ApiBody({ type: HeadquarterDto })
  async createHeadquarter(@Body() data: HeadquarterDto, @Res() res: Response) {
    const newHeadquarter =
      await this.headquarterService.createHeadquarter(data);
    res.status(201).json(newHeadquarter);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @DRoles(Roles.ADMIN, Roles.ADMINISTRATIVE)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Edit a headquarter by ID' })
  @ApiResponse({ status: 200, description: 'Return the edited headquarter.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Server error.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Headquarter ID in UUID format',
    example: '62a3bd93-1c50-436a-9644-cd314cf71623',
  })
  @ApiBody({ type: HeadquarterDto })
  async editHeadquarter(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: Partial<HeadquarterDto>,
    @Res() res: Response,
  ) {
    const editedHeadquarter = await this.headquarterService.editHeadquarter(
      id,
      data,
    );
    res.status(200).json(editedHeadquarter);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @DRoles(Roles.ADMIN, Roles.ADMINISTRATIVE)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete a headquarter by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return a message that headquarter was deleted.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Server error.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Headquarter ID in UUID format',
    example: '62a3bd93-1c50-436a-9644-cd314cf71623',
  })
  async deleteHeadquarter(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const deletedHeadquarter =
      await this.headquarterService.deleteHeadquarter(id);
    res.status(200).json(deletedHeadquarter);
  }
}
