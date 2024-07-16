import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { Specialty } from './specialty.entity';
import { specialtyDto, updateSpecialtyDto } from './specialty.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Specialty')
@Controller('specialty')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  // @Get()
  // @ApiOperation({
  //   summary: 'Get all specialties',
  // })
  // @ApiResponse({ status: 200, type: [Specialty] })
  // @ApiNotFoundResponse({ description: 'specialties not found' })
  // getspecialties() {
  //   return this.specialtyService.getSpecialties();
  // }

  // @Get(':id')
  // @ApiOperation({
  //   summary: 'Get specialty by id',
  // })
  // @ApiResponse({ status: 200, type: Specialty })
  // @ApiNotFoundResponse({ description: 'specialty not found' })
  // getSpecialtyById(@Param('id') id: string) {
  //   return this.specialtyService.getSpecialtyById(id);
  // }

  // @Post()
  // @ApiOperation({
  //   summary: 'Create a new specialty',
  // })
  // @ApiCreatedResponse({ type: Specialty })
  // @ApiBadRequestResponse({ description: 'Dental service not found' })
  // @ApiBadRequestResponse({ description: 'Specialty already exists' })
  // @ApiInternalServerErrorResponse({ description: "Can't create specialty" })
  // createSpecialty(@Body() data: specialtyDto) {
  //   return this.specialtyService.createSpecialty(data);
  // }

  // @Patch(':id')
  // @ApiOperation({
  //   summary: 'Update a specialty',
  // })
  // @ApiResponse({
  //   status: 201,
  //   type: String,
  //   description: 'Specialty updated successfully',
  // })
  // @ApiBadRequestResponse({ description: 'Dental service not found' })
  // @ApiNotFoundResponse({ description: 'Specialty not found' })
  // @ApiInternalServerErrorResponse({ description: "Can't update specialty" })
  // updateSpecialty(@Param('id') id: string, @Body() data: updateSpecialtyDto) {
  //   return this.specialtyService.updateSpecialty(id, data);
  // }

  // @Delete(':id')
  // @ApiOperation({
  //   summary: 'Delete a specialty',
  // })
  // @ApiResponse({
  //   status: 201,
  //   type: String,
  //   description: 'Specialty deleted successfully',
  // })
  // @ApiNotFoundResponse({ description: 'Specialty not found' })
  // @ApiInternalServerErrorResponse({ description: "Can't delete specialty" })
  // removeSpecialty(@Param('id') id: string) {
  //   return this.specialtyService.removeSpecialty(id);
  // }
}
