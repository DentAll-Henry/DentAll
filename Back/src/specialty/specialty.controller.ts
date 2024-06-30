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

@Controller('speciality')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @Get()
  getSpecialities() {
    return this.specialtyService.getSpecialties();
  }

  @Get(':id')
  getSpecialtyById(@Param('id') id: string) {
    return this.specialtyService.getSpecialtyById(id);
  }

  @Post()
  createSpecialty(@Body() data: specialtyDto) {
    return this.specialtyService.createSpecialty(data);
  }

  @Patch(':id')
  updateSpecialty(@Param('id') id: string, @Body() data: updateSpecialtyDto) {
    return this.specialtyService.updateSpecialty(id, data);
  }

  @Delete(':id')
  removeSpecialty(@Param('id') id: string) {
    return this.specialtyService.removeSpecialty(id);
  }
}
