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
import { Response } from 'express';
import { DentalRecordDto } from './dtos/dentalRecord.dto';
import { DentalRecordService } from './dentalRecord.service';
import { DentalRecordDtoForEdit } from './dtos/dentalRecordDtoForEdit.dto';
import { TreatmentDto } from './dtos/treatment.dto';
import { ToothArray } from './dtos/toothArray.dto';
import { LimitApiQueries, PageApiQueries } from 'src/config/swagger-config';

@ApiTags('Dental-Record')
@Controller('dental-record')
export class DentalRecordController {
  constructor(private readonly dentalRecordServService: DentalRecordService) {}

  // @Get('deseases')
  // async getDeseases(@Res() res: Response) {
  //   const deseases = await this.dentalRecordServService.getDeseases();
  //   res.status(200).json(deseases);
  // }

  // @Get()
  // @Get()
  // @ApiOperation({ summary: 'Get all dental records' })
  // @ApiResponse({ status: 200, description: 'Return all dental records' })
  // @ApiInternalServerErrorResponse({ status: 500, description: 'Server error.' })
  // @ApiQuery(LimitApiQueries)
  // @ApiQuery(PageApiQueries)
  // async getDentalRecords(
  //   @Res() res: Response,
  //   @Query('page') page: number = 1,
  //   @Query('limit') limit: number = 5,
  // ) {
  //   const records = await this.dentalRecordServService.getDentalRecords(
  //     page,
  //     limit,
  //   );
  //   res.status(200).json(records);
  // }

  // @Get(':id')
  // @ApiOperation({ summary: 'Get one dental record by id' })
  // @ApiResponse({ status: 200, description: 'Return one dental record' })
  // @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  // @ApiInternalServerErrorResponse({ status: 500, description: 'Server error.' })
  // @ApiParam({
  //   name: 'id',
  //   required: true,
  //   description: 'Dental record id',
  //   example: '62a3bd93-1c50-436a-9644-cd314cf71623',
  // })
  // async getDentalRecordByID(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Res() res: Response,
  // ) {
  //   const record = await this.dentalRecordServService.getDentalRecordByID(id);
  //   res.status(200).json(record);
  // }

  // @Post()
  // @ApiOperation({ summary: 'Create a new dental record' })
  // @ApiBody({ type: DentalRecordDto })
  // @ApiResponse({ status: 201, description: 'Return created record' })
  // @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  // @ApiInternalServerErrorResponse({ status: 500, description: 'Server error.' })
  // async createDentalRecord(
  //   @Body() data: DentalRecordDto,
  //   @Res() res: Response,
  // ) {
  //   const newDentalRecord =
  //     await this.dentalRecordServService.createDentalRecord(data);
  //   res.status(201).json(newDentalRecord);
  // }

  // @Patch('sign/:id')
  // @ApiOperation({ summary: 'Sign one dental record by id' })
  // @ApiResponse({ status: 200, description: 'Return the signed record' })
  // @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  // @ApiInternalServerErrorResponse({ status: 500, description: 'Server error.' })
  // async signDentalRecord(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Res() res: Response,
  // ) {
  //   await this.dentalRecordServService.signDentalRecord(id);
  //   res.status(200).json({ message: 'Se firmo correctamente' });
  // }

  // @Patch('/new-treatment/:id')
  // @ApiOperation({ summary: 'Create a new treatment' })
  // @ApiResponse({ status: 201, description: 'Return created treatment' })
  // @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  // @ApiInternalServerErrorResponse({ status: 500, description: 'Server error.' })
  // @ApiParam({
  //   name: 'id',
  //   required: true,
  //   description: 'Dental record id',
  //   example: '62a3bd93-1c50-436a-9644-cd314cf71623',
  // })
  // @ApiBody({
  //   type: TreatmentDto,
  //   required: true,
  // })
  // async newDentalTreatment(
  //   @Body()
  //   data: TreatmentDto,
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Res() res: Response,
  // ) {
  //   const newTreatment = await this.dentalRecordServService.newDentalTreatment(
  //     id,
  //     data,
  //   );
  //   res.status(201).json(newTreatment);
  // }

  // @Patch('/edit-tooth-info/:id')
  // @ApiOperation({ summary: 'Given an array of teeth, edit them' })
  // @ApiResponse({ status: 200, description: 'Return edited record' })
  // @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  // @ApiInternalServerErrorResponse({ status: 500, description: 'Server error.' })
  // @ApiParam({
  //   name: 'id',
  //   required: true,
  //   description: 'Dental recor id',
  //   example: '62a3bd93-1c50-436a-9644-cd314cf71623',
  // })
  // @ApiBody({
  //   type: ToothArray,
  //   required: true,
  //   description:
  //     'Dental service data. All fields are not required, just the ones to be updated.',
  // })
  // async editToothInfo(
  //   @Body()
  //   data: ToothArray,
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Res() res: Response,
  // ) {
  //   const editedToothInfo = await this.dentalRecordServService.editToothInfo(
  //     id,
  //     data,
  //   );
  //   res.status(200).json(editedToothInfo);
  // }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Edit one dental record by id' })
  // @ApiResponse({ status: 200, description: 'Return edited record' })
  // @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  // @ApiInternalServerErrorResponse({ status: 500, description: 'Server error.' })
  // @ApiParam({
  //   name: 'id',
  //   required: true,
  //   description: 'Dental record id',
  //   example: '62a3bd93-1c50-436a-9644-cd314cf71623',
  // })
  // @ApiBody({
  //   type: DentalRecordDtoForEdit,
  //   description:
  //     'Dental record data. All fields are not required, just the ones to be updated.',
  // })
  // async editDentalRecord(
  //   @Body()
  //   data: DentalRecordDtoForEdit,
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Res() res: Response,
  // ) {
  //   const editedDentalRecord =
  //     await this.dentalRecordServService.editDentalRecord(id, data);
  //   res.status(200).json(editedDentalRecord);
  // }
}
