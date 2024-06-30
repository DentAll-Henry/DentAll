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

  async getSpecialityById(id: string): Promise<Specialty> {
    try {
      return await this.specialtyRepository.findOne({
        where: { id },
        relations: { services: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        "There're not specialty with that id",
      );
    }
  }

  async getSpecialityByName(name: string) {
    return await this.specialtyRepository.findOne({ where: { name } });
  }

  async removeSpecialty(id: string) {
    try {
      return await this.specialtyRepository.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException("Can't delete specialty");
    }
  }

  async createSpeciality(data: specialtyDto) {
    try {
      const newSpeciality = this.specialtyRepository.create(data);
      const saved = await this.specialtyRepository.save(newSpeciality);
      return this.getSpecialityById(saved.id);
    } catch (error) {
      throw new InternalServerErrorException("Can't create specialty");
    }
  }

  async updateSpecialty(specialty: Specialty) {
    try {
      const updated = await this.specialtyRepository.save(specialty);
      console.log(updated);

      return 'Specialty updated successfully';
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Can't update specialty");
    }
  }
}
