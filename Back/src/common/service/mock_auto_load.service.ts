import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { dentalServicesDB } from 'src/db/dental_services';
import { headCuartersDB } from 'src/db/headCuartersDB';
import { personsDB } from 'src/db/persons';
import { rolesDB } from 'src/db/rolesDB';
import { DentalServDto } from 'src/dentalServ/dtos/dentalServ.dto';
import { DentalServ } from 'src/dentalServ/entities/dentalServ.entity';
import { Cords } from 'src/headCuarters/entities/cords.entity';
import { HeadCuarter } from 'src/headCuarters/entities/headCuarter.entity';
import { Person } from 'src/person/entities/person.entity';
import { RoleByNameDto } from 'src/role/dtos/role.dto';
import { Role } from 'src/role/entities/role.entity';
import { Roles } from 'src/role/enums/roles.enum';
import { Repository } from 'typeorm';

@Injectable()
export class MockAutoLoadService {
  constructor(
    @InjectRepository(DentalServ)
    private dentalservRepository: Repository<DentalServ>,
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
    @InjectRepository(Person) private personRepository: Repository<Person>,
    private readonly authService: AuthService,
    @InjectRepository(HeadCuarter)
    private headCuarterRepository: Repository<HeadCuarter>,
    @InjectRepository(Cords)
    private cordsRepository: Repository<Cords>,
  ) {}

  async onModuleInit() {
    await this.seedDentalServices();
    await this.seedRoles();
    await this.seedPersons();
    await this.seedHeadCuarters();
  }

  async seedDentalServices() {
    const dental_services: DentalServDto[] = dentalServicesDB;
    dental_services.map(async (dental_service: DentalServDto) => {
      const ds = await this.dentalservRepository.findOne({
        where: { name: dental_service.name },
      });
      !ds && (await this.dentalservRepository.save(dental_service));
    });
    console.log('populated dental services');
  }

  async seedRoles() {
    const roles: RoleByNameDto[] = rolesDB;
    roles.map(async (role: Role) => {
      const rol = await this.rolesRepository.findOne({
        where: { name: role.name },
      });
      !rol && (await this.rolesRepository.save(role));
    });
    console.log('populated roles');
  }

  async seedPersons() {
    const persons = personsDB;
    try {
      persons.map(async (person) => {
        const p = await this.personRepository.findOne({
          where: { email: person.email },
        });
        !p &&
          (await this.authService.signUp(person, {
            email: person.email,
            password: '12345',
          }));
      });

      console.log('populated persons');
    } catch (error) {
      console.log(error);
    }
  }

  async seedHeadCuarters() {
    try {
      const count = await this.cordsRepository.count();
      if (count === 0) {
        for (const cuarter of headCuartersDB) {
          const newCords = await this.cordsRepository.save({
            lat: cuarter.cords.lat,
            lng: cuarter.cords.lng,
          });
          cuarter.cords = newCords;
          await this.headCuarterRepository.save(cuarter);
        }
        console.log('populated head cuarters');
      }
    } catch (error) {
      console.log('Error populating head cuarters:', error);
    }
  }
}
