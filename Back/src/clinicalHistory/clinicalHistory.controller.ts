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
}
