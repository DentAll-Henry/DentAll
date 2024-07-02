import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dentist } from './entities/dentist.entity';
import { Repository } from 'typeorm';
import { PeopleService } from './person.service';

@Injectable()
export class DentistsRepository {
  constructor(
    @InjectRepository(Dentist) private dentistsRepository: Repository<Dentist>,
    private readonly peopleService: PeopleService,
  ) {}

  async getAllDentists(paginationDto: { page: number; limit: number }) {
    const { page, limit } = paginationDto;
    const queryBuilder = this.dentistsRepository
      .createQueryBuilder('dentists')
      .leftJoinAndSelect('dentists.specialty', 'specialty')
      .leftJoinAndSelect('dentists.person', 'people')
      // .leftJoinAndSelect('dentists.appointments', 'appointments')
      .skip((page - 1) * limit)
      .take(limit);

    return await queryBuilder.getMany();
  }

  async dentistById(id: string) {
    const dentist: Dentist = await this.dentistsRepository.findOne({
      where: {
        id,
      },
      relations: {
        specialty: true,
        person: true,
        // appointments: true,
      },
    });
    if (!dentist) throw new BadRequestException('No existe un dentista con el ID especificado.')
    return dentist;
  }

  async createDentist(dentistInfo: Partial<Dentist>) {
    return await this.dentistsRepository.save(dentistInfo);
  }

  async changeDentistStatus (dentist: Dentist) {
    if (dentist.is_active === true) {
      dentist.is_active = false;

    }
    else dentist.is_active = true;
    return await this.dentistsRepository.save(dentist);
  }
}
