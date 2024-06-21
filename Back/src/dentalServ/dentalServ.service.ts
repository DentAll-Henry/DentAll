import { Injectable } from '@nestjs/common';
import { DentalServRepository } from './dentalServ.repository';

@Injectable()
export class DentalServService {
  constructor(private readonly dentalServRepositiory: DentalServRepository) {}
  getDentalServ() {
    return this.dentalServRepositiory.getDentalServ();
  }
  postDentalServ() {
    return this.dentalServRepositiory.postDentalServ();
  }
}
