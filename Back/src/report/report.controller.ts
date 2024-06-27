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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Report } from './report.entity';

@ApiTags('Report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  @ApiOperation({ summary: 'Get all reports' })
  @ApiResponse({ status: 200, type: [Report] })
  @ApiBadRequestResponse({ status: 404, description: "There's no reports" })
  getReport() {
    return this.reportService.getReport();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one report by id' })
  @ApiResponse({ status: 200, type: Report })
  @ApiBadRequestResponse({ status: 404, description: 'Report not found' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Report id to be retrieved',
  })
  getReportById(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportService.getReportById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new report' })
  @ApiResponse({ status: 201, type: Report })
  @ApiBadRequestResponse({ status: 404, description: "Can't create report" })
  @ApiBody({ type: ReportDto, description: 'Create report' })
  createReport(@Body() report: ReportDto) {
    console.log('llega al controlador');

    return this.reportService.createReport(report);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit a report by id' })
  @ApiResponse({ status: 201, type: Report })
  @ApiBadRequestResponse({ status: 404, description: "Can't edit report" })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Report id to be updated',
  })
  @ApiBody({ type: UpdateReportDto, description: 'Update report' })
  editReport(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() report: UpdateReportDto,
  ) {
    return this.reportService.editReport(id, report);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Get all reports' })
  @ApiResponse({ status: 200, description: 'Report deleted successfully' })
  @ApiBadRequestResponse({ status: 404, description: "Can't delete report" })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Report id to be deleted',
  })
  @ApiBody({ type: ReportDto, description: 'Delete report' })
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportService.deleteReport(id);
  }
}
