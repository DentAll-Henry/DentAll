import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Headquarter } from './entities/headquarter.entity';
import { Repository } from 'typeorm';
import { Cords } from './entities/cords.entity';
import { HeadquarterDto } from './dtos/headquarter.dto';

@Injectable()
export class HeadquarterRepository {
  constructor(
    @InjectRepository(Headquarter) private headquarter: Repository<Headquarter>,
    @InjectRepository(Cords) private cords: Repository<Cords>,
  ) {}

  async getHeadquarters(page: number, limit: number): Promise<Headquarter[]> {
    try {
      const [headquarters, total] = await this.headquarter.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: ['cords'],
      });
      return headquarters;
    } catch (error) {
      throw new InternalServerErrorException("Can't get Headquarters");
    }
  }

  async getHeadquarterByID(id: string): Promise<Headquarter> {
    try {
      const headquarter = await this.headquarter.findOne({
        where: { id: id },
        relations: ['cords'],
      });
      if (!headquarter) {
        throw new BadRequestException('Headquarter not found for id: ' + id);
      }
      return headquarter;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async createHeadquarter(data: HeadquarterDto): Promise<Headquarter> {
    try {
      const newCords = this.cords.create({ lng: data.lng, lat: data.lat });
      const savedCords = await this.cords.save(newCords);
      const { name, address, img } = data;
      const newHeadquarter = this.headquarter.create({ name, address, img });
      newHeadquarter.cords = savedCords;
      const result = await this.headquarter.save(newHeadquarter);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async editHeadquarter(id: string, data: Partial<HeadquarterDto>) {
    try {
      const Headquarter = await this.getHeadquarterByID(id);
      const { name, address, img, lat, lng } = data;
      const updatedHeadquarter = this.headquarter.merge(Headquarter, {
        name,
        address,
        img,
        cords: { lat, lng },
      });
      const result = await this.headquarter.save(updatedHeadquarter);
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }

  async deleteHeadquarter(id: string) {
    try {
      const headquarter: Headquarter = await this.getHeadquarterByID(id);
      await this.headquarter.delete(headquarter);
      return await this.cords.delete(headquarter.cords);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
