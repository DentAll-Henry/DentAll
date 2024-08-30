import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dentist } from './entities/dentist.entity';
import { Repository } from 'typeorm';
import { Specialty } from 'src/specialty/specialty.entity';
import { Person } from './entities/person.entity';
import { DentalServ } from 'src/dentalServ/entities/dentalServ.entity';

@Injectable()
export class DentistsRepository {
  constructor(
    @InjectRepository(Dentist) private dentistsRepository: Repository<Dentist>,
  ) {}

  async getAllDentists(paginationDto: { page: number; limit: number }) {
    const { page, limit } = paginationDto;
    const queryBuilder = this.dentistsRepository
      .createQueryBuilder('dentists')
      .leftJoinAndSelect('dentists.specialty', 'specialty')
      .leftJoinAndSelect('dentists.person', 'person')
      .leftJoinAndSelect('person.roles', 'roles')
      .leftJoinAndSelect('dentists.dental_services', 'dental_services')
      .leftJoinAndSelect('dentists.appointments', 'appointments')
      .leftJoinAndSelect('appointments.patient', 'patient')
      .skip((page - 1) * limit)
      .take(limit);

    return await queryBuilder.getMany();
  }

  async getAllDentistsActive(paginationDto: { page: number; limit: number }) {
    const { page, limit } = paginationDto;
    const queryBuilder = this.dentistsRepository
      .createQueryBuilder('dentists')
      .leftJoinAndSelect('dentists.specialty', 'specialty')
      .leftJoinAndSelect('dentists.person', 'person')
      .leftJoinAndSelect('person.roles', 'roles')
      .leftJoinAndSelect('dentists.dental_services', 'dental_services')
      .leftJoinAndSelect('dentists.appointments', 'appointments')
      .leftJoinAndSelect('appointments.patient', 'patient')
      .where('dentists.is_active = :isActive', { isActive: true})
      .skip((page - 1) * limit)
      .take(limit);

    return await queryBuilder.getMany();
  }

  async get4BestRateDentists() {
    const queryBuilder = this.dentistsRepository
      .createQueryBuilder('dentists')
      .leftJoinAndSelect('dentists.specialty', 'specialty')
      .leftJoinAndSelect('dentists.person', 'people')
      .where('dentists.is_active = :isActive', { isActive: true})
      .orderBy('dentists.rate', 'DESC')
      .take(4);

    return await queryBuilder.getMany();
  }

  async dentistsBySpecialty(specialtyName: Specialty['name']): Promise<Dentist[]> {
    const dentists: Dentist[] = await this.dentistsRepository.find({
      where: {
        specialty: {
          name: specialtyName,
        }
      },
      relations: {
        person: true,
      }
    })
    if (dentists.length === 0) throw new BadRequestException('No hay dentistas para la especialidad indicada.')

    return dentists;
  }

  async dentistsByDentalServ(dentalServName: DentalServ['name']): Promise<Dentist[]> {
    const dentists: Dentist[] = await this.dentistsRepository
      .createQueryBuilder('dentist')
      .innerJoinAndSelect('dentist.dental_services', 'dental_service', 'dental_service.name = :name', { name: dentalServName })
      .leftJoinAndSelect('dentist.person', 'person')
      .where('dentist.is_active = :isActive', { isActive: true })
      .getMany();

    if (dentists.length === 0) throw new BadRequestException('No hay dentistas para la especialidad indicada.')

    return dentists;
  }

  async dentistsQuantity() {
    const activeDentistsQuantity: number = await this.dentistsRepository
      .createQueryBuilder('dentists')
      .where('dentists.is_active = :isActive', { isActive: true})
      .getCount();

    const dentistsQuantity: number = await this.dentistsRepository
      .createQueryBuilder('dentists')
      .getCount();

    return { total: dentistsQuantity, active: activeDentistsQuantity, inactive: dentistsQuantity-activeDentistsQuantity };
  }

  async dentalServicesWithDentist() {
    try {
      const dentists: Dentist[] = await this.dentistsRepository.find({
        relations: {
          dental_services: true,
        }
      });

      const dentalServices: DentalServ[] = [];
      
      dentists.forEach(dentist => {
        dentist.dental_services.forEach(service => {
          if(!dentalServices.some(s => s.id === service.id)) {
            dentalServices.push(service);
          }
        })
      })

      return dentalServices;
    } catch (error) {
      throw new BadRequestException("No hay sericios disponibles");
    }
  }

  async dentistByPersonId(idperson: Person['id']) {
    const dentist: Dentist = await this.dentistsRepository.findOne({
      where: {
        person: {
          id: idperson,
        }
      },
      relations: {
        specialty: true,
        person: true,
        appointments: true,
      },
    });
    if (!dentist) throw new BadRequestException('No existe un dentista con el ID de usuario especificado.')
    return dentist;
  }

  async dentistById(id: string) {
    const dentist: Dentist = await this.dentistsRepository.findOne({
      where: {
        id,
      },
      relations: {
        specialty: true,
        person: true,
        appointments: true,
        dental_services: true,
      },
    });

    if (!dentist) throw new BadRequestException('No existe un dentista con el ID especificado.')
    return dentist;
  }

  async createDentist(dentistInfo: Partial<Dentist>) {
    return await this.dentistsRepository.save(dentistInfo);
  }

  async changeDentistStatus (dentist: Dentist) {
    if (dentist.is_active) {
      dentist.is_active = false;
    } else {
      dentist.is_active = true;
    }
    return await this.dentistsRepository.save(dentist);
  }

  async addDentalServ(dentist: Dentist, dentalServices: DentalServ[]) {
    dentist.dental_services = [...dentalServices];
    const dentistWithDentalServ: Dentist = await this.dentistsRepository.save(dentist);
    return dentistWithDentalServ;
  }
}
