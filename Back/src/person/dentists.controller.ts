import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DentistsService } from './dentist.service';
import { CreateDentistDto } from './dtos/createDentist.dto';
import { PaginationDto } from 'src/common/dto/paginationDto';

@ApiTags('Dentists')
@Controller('dentists')
export class DentistsController {
  constructor(private readonly dentistsService: DentistsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all dentists.' })
  @ApiResponse({
    status: 200,
    description: 'Returns the information of all dentists.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  async getAllDentists(@Query() paginationDto: PaginationDto) {
    return this.dentistsService.getAllDentists(paginationDto)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a dentist by ID.' })
  @ApiResponse({
    status: 200,
    description: 'Returns to the dentist with the specified ID.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  async dentistById(@Param('id', ParseUUIDPipe) id: string) {
    return this.dentistsService.dentistById(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a dentist.' })
  @ApiResponse({
    status: 201,
    description: 'Returns the information of the created dentist.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  async createDentist(@Body() dentistInfo: CreateDentistDto) {
    return this.dentistsService.createDentist(dentistInfo);
  }

  @Patch()
  @ApiOperation({ summary: 'Enable o disable a dentist with the specific ID.'})
  @ApiResponse({ status: 201, description: 'Returns the dentist with the status changed.'})
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.'})
  async changeDentistStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.dentistsService.changeDentistStatus(id);
  }
}
