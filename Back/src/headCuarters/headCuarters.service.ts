import { BadRequestException, Injectable } from '@nestjs/common';
import { HeadCuartersRepository } from './headCuarters.repository';
import { HeadCuarterDto } from './dtos/headCuarter.dto';
import { HeadCuarter } from './entities/headCuarter.entity';

@Injectable()
export class HeadCuartersService {
  constructor(
    private readonly headCuartersRepository: HeadCuartersRepository,
  ) {}

  async getHeadCuarters(page: number, limit: number): Promise<HeadCuarter[]> {
    return await this.headCuartersRepository.getHeadCuarters(page, limit);
  }

  async getHeadCuarterByID(id: string): Promise<HeadCuarter> {
    return await this.headCuartersRepository.getHeadCuarterByID(id);
  }

  async createHeadCuarter(data: HeadCuarterDto): Promise<HeadCuarter> {
    return await this.headCuartersRepository.createHeadCuarter(data);
  }

  async editHeadCuarter(id: string, data: Partial<HeadCuarterDto>) {
    if (Object.keys(data).length === 0) {
      throw new BadRequestException(
        'You must provide name, address, img or cords to update',
      );
    }
    const allowedCords = {
      lat: data.cords?.lat,
      lng: data.cords?.lng,
    };
    const allowedData = {
      name: data.name,
      address: data.address,
      img: data.img,
      cords: allowedCords,
    };
    return await this.headCuartersRepository.editHeadCuarter(id, allowedData);
  }

  async deleteHeadCuarter(id: string) {
    return await this.headCuartersRepository.deleteHeadCuarter(id);
  }
}
