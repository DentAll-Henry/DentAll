import { BadRequestException, Injectable } from '@nestjs/common';
import { SpecialtyRepository } from './specialty.repository';
import { Specialty } from './specialty.entity';
import { specialtyDto, updateSpecialtyDto } from './specialty.dto';
import { DentalServService } from 'src/dentalServ/dentalServ.service';

@Injectable()
export class SpecialtyService {
  constructor(
    private readonly specialtyRepository: SpecialtyRepository,
    private readonly dentalServService: DentalServService,
  ) {}
  removeSpecialty(id: string) {
    const specialty = this.specialtyRepository.getspecialtyById(id);

    if (!specialty) {
      throw new BadRequestException('Specialty not found');
    }

    return this.specialtyRepository.removeSpecialty(id)
      ? 'Especialidad eliminada correctamente'
      : 'No se pudo borrar la especialidad';
  }
  async updateSpecialty(id: string, data: updateSpecialtyDto) {
    const specialty = await this.specialtyRepository.getspecialtyById(id);
    if (!specialty) {
      throw new BadRequestException('Especialidad no encontrada');
    }

    if (data.name) {
      specialty.name = data.name;
    }

    if (data.description) {
      specialty.description = data.description;
    }

    if (data.services) {
      const dentalServs = [];
      for (const service of data.services) {
        const existingDentallServ =
          await this.dentalServService.getDentalServByID(service.id);

        if (!existingDentallServ) {
          throw new BadRequestException('No se encontro el servicio');
        }

        dentalServs.push(existingDentallServ);
      }
      specialty.services = dentalServs;
    }

    return await this.specialtyRepository.updateSpecialty(specialty);
  }
  async createSpecialty(specialtyData: specialtyDto) {
    const existingspecialty = await this.specialtyRepository.getspecialtyByName(
      specialtyData.name,
    );
    const dentalServs = [];
    for (const service of specialtyData.services) {
      const existingDentallServ =
        await this.dentalServService.getDentalServByID(service.id);

      if (!existingDentallServ) {
        throw new BadRequestException('No se pudo encontrar el servicio');
      }
      dentalServs.push(existingDentallServ);
    }

    if (existingspecialty) {
      throw new BadRequestException('Especialidad ya existente');
    }
    specialtyData.services = dentalServs;

    return await this.specialtyRepository.createspecialty(specialtyData);
  }
  getSpecialtyById(id: string) {
    const specialty = this.specialtyRepository.getspecialtyById(id);
    return !specialty ? 'No hay especialidad con ese id' : specialty;
  }
  async getSpecialties() {
    return (await this.specialtyRepository.getSpecialties()).length === 0
      ? 'No hay especialidades todavía'
      : await this.specialtyRepository.getSpecialties();
  }

  async SpecialtyByName(name: string) {
    return !(await this.specialtyRepository.getspecialtyByName(name))
      ? `No se encontro la especialidad con el nombre ${name}`
      : await this.specialtyRepository.getspecialtyByName(name);
  }
}