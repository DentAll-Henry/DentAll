import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { DentalServRepository } from './dentalServ.repository';
import { DentalServDto } from './dtos/dentalServ.dto';
import { DentalServ } from './entities/dentalServ.entity';

@Injectable()
export class DentalServService implements OnModuleInit {
  constructor(private readonly dentalServRepositiory: DentalServRepository) {}
  async onModuleInit() {
    return await this.dentalServRepositiory.init();
  }
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
    const { name, price, description } = data;
    if (Object.keys(data).length === 0) {
      throw new BadRequestException(
        'You must provide name, price or description to update',
      );
    }
    return await this.dentalServRepositiory.editDentalServ(id, {
      name,
      price,
      description,
    });
  }

  async updateIsActive(id: string): Promise<DentalServ> {
    return await this.dentalServRepositiory.updateIsActive(id);
  }
}
