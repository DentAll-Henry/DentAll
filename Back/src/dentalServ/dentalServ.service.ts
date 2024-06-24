import { BadRequestException, Injectable } from '@nestjs/common';
import { DentalServRepository } from './dentalServ.repository';
import { DentalServDto } from './dentalServ.dto';
import { DeleteResult } from 'typeorm';
import { DentalServ } from './dentalServ.entity';

@Injectable()
export class DentalServService {
  constructor(private readonly dentalServRepositiory: DentalServRepository) {}
  async getDentalServ(): Promise<DentalServ[]> {
    return await this.dentalServRepositiory.getDentalServ();
  }

  async createDentalServ(data: DentalServDto): Promise<DentalServ> {
    return await this.dentalServRepositiory.createDentalServ(data);
  }

  async getDentalServByID(id: string): Promise<DentalServ> {
    return await this.dentalServRepositiory.getDentalServByID(id);
  }

  async editDentalServ(
    id: string,
    data: Partial<DentalServDto>,
  ): Promise<DentalServ> {
    if (Object.keys(data).length === 0) {
      throw new BadRequestException(
        'You must provide name, price or description to update',
      );
    }
    return await this.dentalServRepositiory.editDentalServ(id, data);
  }
  async removeDentalServ(id: string): Promise<DeleteResult> {
    return await this.dentalServRepositiory.removeDentalServ(id);
  }
}
