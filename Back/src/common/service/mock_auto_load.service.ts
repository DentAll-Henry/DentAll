import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { AuthService } from 'src/auth/auth.service';
import { dentalServicesDB } from 'src/db/dental_services';
import { headquartersDB } from 'src/db/headquartersDB';
import { personsDB } from 'src/db/persons';
import { rolesDB } from 'src/db/rolesDB';
import { DentalServDto } from 'src/dentalServ/dtos/dentalServ.dto';
import { DentalServ } from 'src/dentalServ/entities/dentalServ.entity';
import { Cords } from 'src/headquarters/entities/cords.entity';
import { Headquarter } from 'src/headquarters/entities/headquarter.entity';
import { DentistsService } from 'src/person/dentist.service';
import { Dentist } from 'src/person/entities/dentist.entity';
import { Patient } from 'src/person/entities/patient.entity';
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
    private readonly dentistService: DentistsService,
    private readonly appointmentService: AppointmentsService,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Dentist)
    private dentistRepository: Repository<Dentist>,
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
    await this.seedAppointments();
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
            //await this.personService.addRole(p.id, { roleName: Roles.DENTIST });
            await this.dentistService.createDentist({ personId: p.id, rate: 4 })
            console.log(
              `<${p.first_name} ${p.last_name}> saved as dentist`,
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

  async seedAppointments() {
    const persons = await this.personService.getAllPeople({
      page: 1,
      limit: 10,
    });
    const patients = await this.patientRepository.find();
    const dentists = persons.filter(person => {

      return parseInt(person.phone) % 2 === 0
    });
    const services = await this.dentalservRepository.find();

    patients.map(async (patient) => {
      const serv = services[Math.floor(Math.random() * services.length)];
      const dentist = dentists[Math.floor(Math.random() * dentists.length)];
      const dentista = await this.dentistRepository.createQueryBuilder('dentist')
        .leftJoinAndSelect('dentist.person', 'person')
        .where('dentist.person = :person_id', { person_id: dentist.id })
        .getOne();

      const today = new Date();
      const threeDaysFromNow = new Date(today);
      threeDaysFromNow.setDate(today.getDate() + 3);

      const randomTime = today.getTime() + Math.random() * (threeDaysFromNow.getTime() - today.getTime());

      const appointment = await this.appointmentService.create({
        dentist_id: dentista.id,
        patient: patient.id,
        service: serv.id,
        date_time: new Date(randomTime),
        description: 'test',
      })
    });

  }
}