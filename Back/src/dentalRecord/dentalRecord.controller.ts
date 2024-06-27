import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { DentalRecordDto } from './dtos/dentalRecord.dto';
import { DentalRecordService } from './dentalRecord.service';

@ApiTags('Dental-Record')
@Controller('dental-record')
export class DentalRecordController {
  constructor(private readonly dentalRecordServService: DentalRecordService) {}

  // @Get('deseases')
  // async getDeseases(@Res() res: Response) {
  //   const deseases = await this.dentalRecordServService.getDeseases();
  //   res.status(200).json(deseases);
  // }

  @Get()
  async getDentalRecords(
    @Res() res: Response,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    const records = await this.dentalRecordServService.getDentalRecords(
      page,
      limit,
    );
    res.status(200).json(records);
  }

  @Get(':id')
  async getDentalRecordByID(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const record = await this.dentalRecordServService.getDentalRecordByID(id);
    res.status(200).json(record);
  }

  @Post()
  async createClinicalHistory(
    @Body() data: DentalRecordDto,
    @Res() res: Response,
  ) {
    const newDentalRecord =
      await this.dentalRecordServService.createDentalRecord(data);
    res.status(201).json(newDentalRecord);
  }

  @Patch(':id')
  async editDentalRecord(
    @Body() data: Partial<DentalRecordDto>,
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    // const editedDentalRecord =
    //   await this.dentalRecordServService.editDentalServ(id, data);
    // res.status(200).json(editedDentalRecord);
  }
}
