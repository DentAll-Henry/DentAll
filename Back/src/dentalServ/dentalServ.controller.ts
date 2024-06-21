import { Controller, Get } from '@nestjs/common';
import { DentalServService } from './dentalServ.service';

@Controller('dental-serv')
export class DentalServController {
  constructor(private readonly dentalServService: DentalServService) {}
  @Get('get')
  getDentalServ() {
    return this.dentalServService.getDentalServ();
  }

  @Get('post')
  postDentalServ() {
    return this.dentalServService.postDentalServ();
  }
}
