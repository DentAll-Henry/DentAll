import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HeadCuarter } from './entities/headCuarter.entity';
import { Repository } from 'typeorm';
import { Cords } from './entities/cords.entity';
import { HeadCuarterDto } from './dtos/headCuarter.dto';

@Injectable()
export class HeadCuartersRepository {
  constructor(
    @InjectRepository(HeadCuarter) private headCuarter: Repository<HeadCuarter>,
    @InjectRepository(Cords) private cords: Repository<Cords>,
  ) {}

  async getHeadCuarters(page: number, limit: number): Promise<HeadCuarter[]> {
    try {
      const [cuarters, total] = await this.headCuarter.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: ['cords'],
      });
      return cuarters;
    } catch (error) {
      throw new InternalServerErrorException("Can't get head cuarters");
    }
  }

  async getHeadCuarterByID(id: string): Promise<HeadCuarter> {
    try {
      const cuarter = await this.headCuarter.findOne({
        where: { id: id },
        relations: ['cords'],
      });
      if (!cuarter) {
        throw new BadRequestException('Cuarter not found for id: ' + id);
      }
      return cuarter;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async createHeadCuarter(data: HeadCuarterDto): Promise<HeadCuarter> {
    try {
      const newCords = this.cords.create({ lng: data.lng, lat: data.lat });
      const savedCords = await this.cords.save(newCords);
      const { name, address, img } = data;
      const newCuarter = this.headCuarter.create({ name, address, img });
      newCuarter.cords = savedCords;
      const result = await this.headCuarter.save(newCuarter);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async editHeadCuarter(id: string, data: Partial<HeadCuarterDto>) {
    try {
      const cuarter = await this.getHeadCuarterByID(id);
      const { name, address, img, lat, lng } = data;
      const updatedCuarter = this.headCuarter.merge(cuarter, {
        name,
        address,
        img,
        cords: { lat, lng },
      });
      const result = await this.headCuarter.save(updatedCuarter);
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.log(error);

      throw new InternalServerErrorException();
    }
  }

  async deleteHeadCuarter(id: string) {
    try {
      const cuarter: HeadCuarter = await this.getHeadCuarterByID(id);
      await this.headCuarter.delete(cuarter);
      return await this.cords.delete(cuarter.cords);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
