import { BadRequestException, Injectable } from '@nestjs/common';
import { DentalServRepository } from './dentalServ.repository';
import { DentalServDto } from './dtos/dentalServ.dto';
import { DentalServ } from './entities/dentalServ.entity';

@Injectable()
export class DentalServService {
  constructor(private readonly dentalServRepositiory: DentalServRepository) {}

  async getDentalServ(page: number, limit: number) {
    return await this.dentalServRepositiory.getDentalServ(page, limit);
  }

  async createDentalServ(data: DentalServDto): Promise<DentalServ> {
    return await this.dentalServRepositiory.createDentalServ(data);
  }

  async getDentalServByID(id: string): Promise<DentalServ> {
    return await this.dentalServRepositiory.getDentalServByID(id);
  }

  async getDentalServByFilter(name: string, isActive) {
    if (name || isActive) {
      if (isActive === 'false') isActive = false;
      else if (isActive === 'true') isActive = true;
      return await this.dentalServRepositiory.getDentalServByFilter(
        name,
        isActive,
      );
    }
    throw new BadRequestException('Debes proveer nombre o estado para filtrar');
  }

  async editDentalServ(
    id: string,
    data: Partial<DentalServDto>,
  ): Promise<DentalServ> {
    const { name, price, description, img } = data;
    if (Object.keys(data).length === 0) {
      throw new BadRequestException(
        'Debes enviar nombre, precio,descripción o imagen para editar',
      );
    }
    return await this.dentalServRepositiory.editDentalServ(id, {
      name,
      price,
      description,
      img,
    });
  }

  async updateIsActive(id: string): Promise<DentalServ> {
    return await this.dentalServRepositiory.updateIsActive(id);
  }

  async getDentalServByName(name: string) {
    if (name.length < 3)
      throw new BadRequestException('El nombre debe tener mas de 3 caracteres');
    if (name.length > 50)
      throw new BadRequestException(
        'El nombre debe tener menos de 50 caracteres',
      );
    return await this.dentalServRepositiory.getDentalServByName(name);
  }
}