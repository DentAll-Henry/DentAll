import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportDto } from './report.dto';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getReport() {
    return this.reportService.getReport();
  }

  @Get(':id')
  getReportById(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportService.getReportById(id);
  }

  @Post()
  createReport(@Body() report: ReportDto) {
    return this.reportService.createReport(report);
  }

  @Patch(':id')
  editReport(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() report: ReportDto,
  ) {
    return this.reportService.editReport(id, report);
  }

  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportService.deleteReport(id);
  }
}
