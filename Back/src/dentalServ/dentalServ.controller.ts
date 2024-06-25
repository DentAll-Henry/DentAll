import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { DentalServService } from './dentalServ.service';
import { Response } from 'express';
import { DentalServDto } from './dentalServ.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dental-Serv')
@Controller('dental-serv')
export class DentalServController {
  constructor(private readonly dentalServService: DentalServService) {}
  @Get('')
  async getDentalServ() {
    return await this.dentalServService.getDentalServ();
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

  @Put(':id')
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

  @Delete(':id')
  async deleteDentalServ(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const result = await this.dentalServService.removeDentalServ(id);
    res.status(200).json({
      status: 200,
      message: 'Service deleted succesfully',
      affected: result.affected,
    });
  }
}
