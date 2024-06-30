import { BadRequestException, Injectable } from '@nestjs/common';
import { SpecialtyRepository } from './speciality.repository';
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
    const speciality = this.specialtyRepository.getSpecialityById(id);

    if (!speciality) {
      throw new BadRequestException('Specialty not found');
    }

    return this.specialtyRepository.removeSpecialty(id)
      ? 'Specialty deleted successfully'
      : 'Specialty cannot be deleted';
  }
  async updateSpecialty(id: string, data: updateSpecialtyDto) {
    const speciality = await this.specialtyRepository.getSpecialityById(id);
    if (!speciality) {
      throw new BadRequestException('Specialty not found');
    }

    if (data.name) {
      speciality.name = data.name;
    }

    if (data.description) {
      speciality.description = data.description;
    }

    if (data.services) {
      const dentalServs = [];
      for (const service of data.services) {
        const existingDentallServ =
          await this.dentalServService.getDentalServByID(service.id);

        if (!existingDentallServ) {
          throw new BadRequestException('Dental service not found');
        }

        dentalServs.push(existingDentallServ);
      }
      speciality.services = dentalServs;
    }

    return await this.specialtyRepository.updateSpecialty(speciality);
  }
  async createSpecialty(specialtyData: specialtyDto) {
    console.log('llega al servicio');

    const existingSpeciality =
      await this.specialtyRepository.getSpecialityByName(specialtyData.name);
    console.log(existingSpeciality);

    const dentalServs = [];
    for (const service of specialtyData.services) {
      const existingDentallServ =
        await this.dentalServService.getDentalServByID(service.id);

      if (!existingDentallServ) {
        throw new BadRequestException('Dental service not found');
      }

      dentalServs.push(existingDentallServ);
    }

    if (existingSpeciality) {
      throw new BadRequestException('Specialty already exists');
    }
    specialtyData.services = dentalServs;
    console.log(specialtyData);

    return this.specialtyRepository.createSpeciality(specialtyData);
  }
  getSpecialtyById(id: string) {
    const speciality = this.specialtyRepository.getSpecialityById(id);
    return !speciality ? "There's no specialty with that id" : speciality;
  }
  async getSpecialties() {
    return (await this.specialtyRepository.getSpecialties()).length === 0
      ? "There're no specialties"
      : await this.specialtyRepository.getSpecialties();
    // return await this.specialtyRepository.getSpecialties();
  }

  async SpecialtyByName(name: string) {
    return !(await this.specialtyRepository.getSpecialityByName(name))
      ? 'Specialty not found'
      : await this.specialtyRepository.getSpecialityByName(name);
  }
}
