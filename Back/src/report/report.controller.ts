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
import { ReportDto, UpdateReportDto } from './report.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Report')
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
    console.log('llega al controlador');

    return this.reportService.createReport(report);
  }

  @Patch(':id')
  editReport(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() report: UpdateReportDto,
  ) {
    return this.reportService.editReport(id, report);
  }

  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportService.deleteReport(id);
  }
}
