import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { DentalServService } from './dentalServ.service';
import { Response } from 'express';
import { DentalServDto } from './dtos/dentalServ.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LimitApiQueries, PageApiQueries } from 'src/config/swagger-config';

@ApiTags('Dental-Serv')
@Controller('dental-serv')
export class DentalServController {
  constructor(private readonly dentalServService: DentalServService) {}
  @Get()
  @ApiOperation({ summary: 'Get all dental services' })
  @ApiResponse({ status: 200, description: 'Return all dental services' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Server error.' })
  @ApiQuery(LimitApiQueries)
  @ApiQuery(PageApiQueries)
  async getDentalServ(@Res() res: Response) {
    const services = await this.dentalServService.getDentalServ();
    res.status(200).json(services);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one dental service by id' })
  @ApiResponse({ status: 200, description: 'Return one dental service' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Server error.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Dental service id',
    example: '62a3bd93-1c50-436a-9644-cd314cf71623',
  })
  async getDentalServById(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const service = await this.dentalServService.getDentalServByID(id);
    res.status(200).json(service);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new dental service' })
  @ApiBody({ type: DentalServDto })
  @ApiResponse({ status: 201, description: 'Return created service' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Server error.' })
  @ApiBody({ type: DentalServDto })
  async createDentalServ(@Body() data: DentalServDto, @Res() res: Response) {
    const newDentalServ = await this.dentalServService.createDentalServ(data);
    res.status(201).json(newDentalServ);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit one dental service by id' })
  @ApiResponse({ status: 200, description: 'Return edited service' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Server error.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Dental service id',
    example: '62a3bd93-1c50-436a-9644-cd314cf71623',
  })
  @ApiBody({
    type: DentalServDto,
    description:
      'Dental service data. All fields are not required, just the ones to be updated.',
  })
  async editDentalServ(
    @Body() data: Partial<DentalServDto>,
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const editedDentalServ = await this.dentalServService.editDentalServ(
      id,
      data,
    );
    res.status(200).json(editedDentalServ);
  }

  @Patch('switch/:id')
  @ApiOperation({ summary: 'Switch active status of one service by id' })
  @ApiResponse({ status: 200, description: 'Return edited service' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Server error.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Dental service id',
    example: '62a3bd93-1c50-436a-9644-cd314cf71623',
  })
  async updateIsActive(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const result = await this.dentalServService.updateIsActive(id);
    let message = `Service with id: ${id}, is no longer active`;
    if (result.isActive) {
      message = `Service with id: ${id}, is now active`;
    }
    res.status(200).json({
      status: 200,
      message,
      info: result,
    });
  }
}
