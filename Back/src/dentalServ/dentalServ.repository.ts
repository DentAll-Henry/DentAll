import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DentalServ } from './dentalServ.entity';
import { DeleteResult, Repository } from 'typeorm';
import { DentalServDto } from './dentalServ.dto';

@Injectable()
export class DentalServRepository {
  constructor(
    @InjectRepository(DentalServ) private dentalServ: Repository<DentalServ>,
  ) {}
  async getDentalServ() {
    try {
      return await this.dentalServ.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getDentalServByID(id: string) {
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

  async createDentalServ(data: DentalServDto) {
    try {
      const services = await this.getDentalServ();
      for (const service of services) {
        console.log(service.name);

        if (service.name === data.name) {
          throw new BadRequestException('Service already exists');
        }
      }
      const newService = this.dentalServ.create(data);
      const result = await this.dentalServ.save(newService);
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async editDentalServ(id: string, data: Partial<DentalServDto>) {
    try {
      const service = await this.getDentalServByID(id);
      if (!service) {
        throw new BadRequestException('Service not found for id: ' + id);
      }
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

  async removeDentalServ(id: string) {
    try {
      const result: DeleteResult = await this.dentalServ.delete(id);
      if (result.affected === 0)
        throw new NotFoundException('Service not found for id: ' + id);
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
