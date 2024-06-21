import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DentalServ } from './dentalServ.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DentalServRepository {
  constructor(
    @InjectRepository(DentalServ) private dentalServ: Repository<DentalServ>,
  ) {}
  getDentalServ() {
    return this.dentalServ.find();
  }
  postDentalServ() {
    return this.dentalServ.save({
      name: 'test',
      price: 100,
      description: 'test',
    });
  }
}
