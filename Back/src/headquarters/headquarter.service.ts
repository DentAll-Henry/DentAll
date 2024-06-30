import { BadRequestException, Injectable } from '@nestjs/common';
import { HeadquarterRepository } from './headquarter.repository';
import { HeadquarterDto } from './dtos/headquarter.dto';
import { Headquarter } from './entities/headquarter.entity';

@Injectable()
export class HeadquarterService {
  constructor(private readonly headquarterRepository: HeadquarterRepository) {}

  async getHeadquarters(page: number, limit: number): Promise<Headquarter[]> {
    return await this.headquarterRepository.getHeadquarters(page, limit);
  }

  async getHeadquarterByID(id: string): Promise<Headquarter> {
    return await this.headquarterRepository.getHeadquarterByID(id);
  }

  async createHeadquarter(data: HeadquarterDto): Promise<Headquarter> {
    return await this.headquarterRepository.createHeadquarter(data);
  }

  async editHeadquarter(id: string, data: Partial<HeadquarterDto>) {
    if (Object.keys(data).length === 0) {
      throw new BadRequestException(
        'You must provide name, address, img or cords to update',
      );
    }
    const allowedData = {
      name: data.name,
      address: data.address,
      img: data.img,
      lat: data.lat,
      lng: data.lng,
    };
    return await this.headquarterRepository.editHeadquarter(id, allowedData);
  }

  async deleteHeadquarter(id: string) {
    return await this.headquarterRepository.deleteHeadquarter(id);
  }
}
