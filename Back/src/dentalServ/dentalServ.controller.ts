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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dental-Serv')
@Controller('dental-serv')
export class DentalServController {
  constructor(private readonly dentalServService: DentalServService) {}
  @Get('')
  async getDentalServ(@Res() res: Response) {
    const services = await this.dentalServService.getDentalServ();
    res.status(200).json(services);
  }
  @Get(':id')
  async getDentalServById(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const service = await this.dentalServService.getDentalServByID(id);
    res.status(200).json(service);
  }

  @Post('')
  async createDentalServ(@Body() data: DentalServDto, @Res() res: Response) {
    const newDentalServ = await this.dentalServService.createDentalServ(data);
    res.status(201).json(newDentalServ);
  }

  @Patch(':id')
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
