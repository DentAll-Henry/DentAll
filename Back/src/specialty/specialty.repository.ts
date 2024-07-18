import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Specialty } from './specialty.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { specialtyDto, updateSpecialtyDto } from './specialty.dto';

@Injectable()
export class SpecialtyRepository {
  constructor(
    @InjectRepository(Specialty)
    private readonly specialtyRepository: Repository<Specialty>,
  ) {}

  async getSpecialties(): Promise<Specialty[]> {
    return await this.specialtyRepository.find({
      relations: { services: true },
    });
  }

  async getspecialtyById(id: string): Promise<Specialty> {
    try {
      return await this.specialtyRepository.findOne({
        where: { id },
        relations: { services: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `No hay especialidad con el id ${id}`,
      );
    }
  }

  async getspecialtyByName(name: string) {
    try {
      return await this.specialtyRepository.findOne({ where: { name } });
    } catch (error) {
      throw new InternalServerErrorException(
        `No hay especialidad con el nombre ${name}`,
      );
    }
  }

  async removeSpecialty(id: string) {
    try {
      return await this.specialtyRepository.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException(
        'No se pudo borrar la especialidad',
      );
    }
  }

  async createspecialty(data: specialtyDto) {
    try {
      const newspecialty = this.specialtyRepository.create(data);
      const saved = await this.specialtyRepository.save(newspecialty);
      return this.getspecialtyById(saved.id);
    } catch (error) {
      throw new InternalServerErrorException(
        'No se pudo crear la especialidad',
      );
    }
  }

  async updateSpecialty(specialty: Specialty) {
    try {
      const updated = await this.specialtyRepository.save(specialty);
      return 'Esecialidad actualizada correctamente';
    } catch (error) {
      throw new InternalServerErrorException(
        'No se pudo actualizar la especialidad',
      );
    }
  }
}
