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
@Controller('speciality')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all specialities',
  })
  @ApiResponse({ status: 200, type: [Specialty] })
  @ApiNotFoundResponse({ description: 'Specialities not found' })
  getSpecialities() {
    return this.specialtyService.getSpecialties();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get speciality by id',
  })
  @ApiResponse({ status: 200, type: Specialty })
  @ApiNotFoundResponse({ description: 'Speciality not found' })
  getSpecialtyById(@Param('id') id: string) {
    return this.specialtyService.getSpecialtyById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new specialty',
  })
  @ApiCreatedResponse({ type: Specialty })
  @ApiBadRequestResponse({ description: 'Dental service not found' })
  @ApiBadRequestResponse({ description: 'Specialty already exists' })
  @ApiInternalServerErrorResponse({ description: "Can't create specialty" })
  createSpecialty(@Body() data: specialtyDto) {
    return this.specialtyService.createSpecialty(data);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a specialty',
  })
  @ApiResponse({
    status: 201,
    type: String,
    description: 'Specialty updated successfully',
  })
  @ApiBadRequestResponse({ description: 'Dental service not found' })
  @ApiNotFoundResponse({ description: 'Specialty not found' })
  @ApiInternalServerErrorResponse({ description: "Can't update specialty" })
  updateSpecialty(@Param('id') id: string, @Body() data: updateSpecialtyDto) {
    return this.specialtyService.updateSpecialty(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a specialty',
  })
  @ApiResponse({
    status: 201,
    type: String,
    description: 'Specialty deleted successfully',
  })
  @ApiNotFoundResponse({ description: 'Specialty not found' })
  @ApiInternalServerErrorResponse({ description: "Can't delete specialty" })
  removeSpecialty(@Param('id') id: string) {
    return this.specialtyService.removeSpecialty(id);
  }
}
