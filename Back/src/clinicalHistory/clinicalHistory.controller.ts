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
import { ApiTags } from '@nestjs/swagger';
import { ClinicalHistoryService } from './clinicalHistory.service';
import { Response } from 'express';
import { ClinicalHistoryDto } from './dtos/clinicalHistory.dto';

@ApiTags('Clinical-History')
@Controller('clinical-history')
export class ClinicalHistoryController {
  constructor(
    private readonly clinicalHistoryServService: ClinicalHistoryService,
  ) {}
  @Get()
  async getClinicalHistories() {
    return await this.clinicalHistoryServService.getClinicalHistories();
  }

  @Get(':id')
  async getClinicalHistoryByID(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const history =
      await this.clinicalHistoryServService.getClinicalHistoryByID(id);
    res.status(200).json(history);
  }

  @Post()
  async createClinicalHistory(
    @Body() data: ClinicalHistoryDto,
    @Res() res: Response,
  ) {
    const newClinicalHistory =
      await this.clinicalHistoryServService.createClinicalHistory(data);
    res.status(201).json(newClinicalHistory);
  }
}
