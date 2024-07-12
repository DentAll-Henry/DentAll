import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DentalServ } from './entities/dentalServ.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { DentalServDto } from './dtos/dentalServ.dto';

@Injectable()
export class DentalServRepository {
  constructor(
    @InjectRepository(DentalServ) private dentalServ: Repository<DentalServ>,
  ) {}

  async getDentalServ(page: number, limit: number) {
    try {
      const [services, total] = await this.dentalServ.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });
      return { services, total };
    } catch (error) {
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }

  async getDentalServByID(id: string): Promise<DentalServ> {
    try {
      const service = await this.dentalServ.findOne({ where: { id: id } });
      if (!service) {
        throw new BadRequestException(
          'Servicio no encontrado para el id: ' + id,
        );
      }
      return service;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }

  async getDentalServByFilter(name?: string, isActive?: boolean) {
    try {
      const query = this.dentalServ.createQueryBuilder('dentalServ');
      if (name !== undefined) {
        query.andWhere('dentalServ.name LIKE :name', { name: `%${name}%` });
      }
      if (isActive !== undefined) {
        query.andWhere('dentalServ.isActive = :isActive', { isActive });
      }
      const services = await query.getMany();
      return services;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(error);
      }
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }

  async createDentalServ(data: DentalServDto): Promise<DentalServ> {
    try {
      const newService = this.dentalServ.create(data);
      const result = await this.dentalServ.save(newService);
      return result;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException('El servicio ya existe');
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
      throw new InternalServerErrorException('Error interno del servidor');
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
      if (error instanceof BadRequestException) {
        throw error;
      }
      if (error.response) {
        throw error;
      }
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }

  async getDentalServByName(name: string) {
    try {
      const query = this.dentalServ.createQueryBuilder('dentalServ');
      query.andWhere('dentalServ.name LIKE :name', { name: `%${name}%` });
      const service = await query.getMany();
      if (!service) {
        throw new BadRequestException(
          'No se encontro un servicio que coincida con el nombre: ' + name,
        );
      }
      return service;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }
}
