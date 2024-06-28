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
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { HeadCuartersService } from './headCuarters.service';
import { HeadCuarterDto } from './dtos/headCuarter.dto';

@ApiTags('Head-Cuarter')
@Controller('head-cuarter')
export class HeadCuarterController {
  constructor(private readonly headCuarterService: HeadCuartersService) {}

  @Get()
  async getHeadCuarters(
    @Res() res: Response,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    const cuarter = await this.headCuarterService.getHeadCuarters(page, limit);
    res.status(200).json(cuarter);
  }

  @Get(':id')
  async getHeadCuarterByID(
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const cuarter = await this.headCuarterService.getHeadCuarterByID(id);
    res.status(200).json(cuarter);
  }

  @Post()
  async createHeadCuarter(@Body() data: HeadCuarterDto, @Res() res: Response) {
    const newHeadCuarter =
      await this.headCuarterService.createHeadCuarter(data);
    res.status(201).json(newHeadCuarter);
  }

  @Patch(':id')
  async editHeadCuarter(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: Partial<HeadCuarterDto>,
    @Res() res: Response,
  ) {
    const editedHeadCuarter = await this.headCuarterService.editHeadCuarter(
      id,
      data,
    );
    res.status(200).json(editedHeadCuarter);
  }

  @Delete(':id')
  async deleteHeadCuarter(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const deletedHeadCuarter =
      await this.headCuarterService.deleteHeadCuarter(id);
    res.status(200).json(deletedHeadCuarter);
  }
}
