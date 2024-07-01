import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { dentalServicesDB } from 'src/db/dental_services';
import { headquartersDB } from 'src/db/headquartersDB';
import { personsDB } from 'src/db/persons';
import { rolesDB } from 'src/db/rolesDB';
import { DentalServDto } from 'src/dentalServ/dtos/dentalServ.dto';
import { DentalServ } from 'src/dentalServ/entities/dentalServ.entity';
import { Cords } from 'src/headquarters/entities/cords.entity';
import { Headquarter } from 'src/headquarters/entities/headquarter.entity';
import { Person } from 'src/person/entities/person.entity';
import { PeopleService } from 'src/person/person.service';
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
    private readonly personService: PeopleService,
    @InjectRepository(Headquarter)
    private headquarterRepository: Repository<Headquarter>,
    @InjectRepository(Cords)
    private cordsRepository: Repository<Cords>,
  ) { }

  async onModuleInit() {
    await this.seedDentalServices();
    await this.seedRoles();
    await this.seedPersons();
    await this.seedHeadquarters();
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
    const personsInDB = await this.personRepository.find();
    if (personsInDB.length === 0)
      try {
        const p = await Promise.all(
          persons.map(async (person) => {
            const p = await this.personService.personByEmail(person.email);
            if (!p)
              return await this.authService.signUp(person, {
                email: person.email,
                password: 'Pass*123',
              });
          }),
        );
        const people = await this.personService.getAllPeople({
          page: 1,
          limit: 10,
        });
        people.map(async (person) => {
          const p = await this.personService.personById(person.id);
          if (parseInt(p.phone) % 2 === 0) {
            await this.personService.addRole(p.id, Roles.DENTIST)
            // will saved as dentist
            console.log(
              `<${p.first_name} ${p.last_name}> will be saved as dentist`,
            );
          }
        });
      } catch (error) {
        console.log(error);
      }

    console.log('populated persons and credentials as patients and dentists');
  }

  async seedHeadquarters() {
    try {
      const count = await this.cordsRepository.count();
      if (count === 0) {
        for (const headquarter of headquartersDB) {
          const newCords = await this.cordsRepository.save({
            lat: headquarter.cords.lat,
            lng: headquarter.cords.lng,
          });
          headquarter.cords = newCords;
          await this.headquarterRepository.save(headquarter);
        }
        console.log('populated Headquarter');
      }
    } catch (error) {
      console.log('Error populating Headquarter', error);
    }
  }
}