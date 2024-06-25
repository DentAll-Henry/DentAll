import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DentalServ } from './dentalServ.entity';
import { DeleteResult, QueryFailedError, Repository } from 'typeorm';
import { DentalServDto } from './dentalServ.dto';

@Injectable()
export class DentalServRepository {
  constructor(
    @InjectRepository(DentalServ) private dentalServ: Repository<DentalServ>,
  ) {}
  async getDentalServ(): Promise<DentalServ[]> {
    try {
      return await this.dentalServ.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getDentalServByID(id: string): Promise<DentalServ> {
    try {
      const service = await this.dentalServ.findOne({ where: { id: id } });
      if (!service) {
        throw new BadRequestException('Service not found for id: ' + id);
      }
      return service;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async createDentalServ(data: DentalServDto): Promise<DentalServ> {
    try {
      const newService = this.dentalServ.create(data);
      const result = await this.dentalServ.save(newService);
      return result;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException('Service already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async editDentalServ(
    id: string,
    data: Partial<DentalServDto>,
  ): Promise<DentalServ> {
    try {
      const service = await this.getDentalServByID(id);
      const updatedService = this.dentalServ.merge(service, data);
      const result = await this.dentalServ.save(updatedService);
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async updateIsActive(id: string): Promise<DentalServ> {
    try {
      const service = await this.getDentalServByID(id);
      const updatedService = this.dentalServ.merge(service, {
        isActive: !service.isActive,
      });
      const result = await this.dentalServ.save(updatedService);
      return result;
    } catch (error) {
      if (error.response) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
