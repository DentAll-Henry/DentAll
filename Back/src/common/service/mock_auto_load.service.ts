import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomInt } from 'crypto';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { AuthService } from 'src/auth/auth.service';
import { dentalServicesDB } from 'src/db/dental_services';
import { headquartersDB } from 'src/db/headquartersDB';
import { personsDB } from 'src/db/persons';
import { rolesDB } from 'src/db/rolesDB';
import { specialtiesDB } from 'src/db/specialtiesDB';
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
import { SpecialtyService } from 'src/specialty/specialty.service';
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
    private readonly specialtyService: SpecialtyService,
  ) { }

  async onModuleInit() {
    await this.seedDentalServices();
    await this.seedRoles();
    await this.seedPersons();
    await this.seedHeadquarters();
    await this.seedAppointments();
    await this.seedServicesForDentist();
    await this.seedSpecialUsers();
  }

  async seedDentalServices() {
    const dental_services = dentalServicesDB;

    const especialidades = dental_services.reduce((acc, curr) => {
      if (!acc[curr.specialty]) {
        acc[curr.specialty] = [];
      }
      return acc;
    }, {});

    for (const dental_service of dental_services) {
      const ds = await this.dentalservRepository.findOne({
        where: { name: dental_service.name },
      });
     
      if (!ds) {
        const created = await this.dentalservRepository.save(dental_service);
        especialidades[dental_service.specialty].push({ id: created.id });
      } else {
        especialidades[dental_service.specialty].push({ id: ds.id });
      }
    }

    for (const especialidad of Object.keys(especialidades)) {
      const specialty =
        await this.specialtyService.SpecialtyByName(especialidad);
      
      if (specialty === `No se encontro la especialidad con el nombre ${especialidad}`) {
        for (const specialty of specialtiesDB) {
          if (specialty.name === especialidad) {
            await this.specialtyService.createSpecialty({
              name: especialidad,
              services: especialidades[especialidad],
              description: specialty.description,
            });
            break;
          }
        }
      }
    }

    console.log('populated dental services with specialty');
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
            let rate: number;
            let description: string;
            let photo: string;
            let specialtyName: string;
            if (p.first_name === "Sandra") {
              rate = 4.5;
              description = "Experta en corrección de maloclusiones. Utiliza las últimas tecnologías para proporcionar sonrisas hermosas y saludables.";
              photo = "https://res.cloudinary.com/ddpohfyur/image/upload/v1720551424/sandra_alunhu.png";
              specialtyName = "Ortodoncista";
            }
            if (p.first_name === "Lucas") {
              rate = 4.2;
              description = "Cirujano dental especializado en extracciones complejas e implantes. Con más de 10 años de experiencia, asegura el bienestar de sus pacientes.";
              photo = "https://res.cloudinary.com/ddpohfyur/image/upload/v1720551424/lucas_enoado.png";
              specialtyName = "Cirujano oral"
            }
            await this.dentistService.createDentist({
              personId: p.id,
              rate,
              description,
              specialtyName,
            });
            // await this.personService.delRole(p.id, { roleName: Roles.PATIENT })
            await this.personService.updatePerson(p.id, { photo })
            console.log(`<${p.first_name} ${p.last_name}> saved as dentist`);
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

  async seedServicesForDentist() {
    const dentists = await this.dentistService.getAllDentists({
      page: 1,
      limit: 20,
    });

    const services = await this.dentalservRepository.find();


    for (const dent of dentists) {
      let s = 1;
      const servicesToAdd = [{ name: "Consulta de valoración" }]
      while (s < 4) {
        const service = services[Math.floor(Math.random() * services.length)];
        servicesToAdd.push({ name: service.name })

        s++
      }
      const relation = await this.dentistService.addDentalServ(dent.id, servicesToAdd)
    }


    console.log('populated services for dentists');
  }

  async seedAppointments() {
    const persons = await this.personService.getAllPeople({
      page: 1,
      limit: 10,
    });
    const patients = await this.patientRepository.find();
    const dentists = persons.filter((person) => {
      return parseInt(person.phone) % 2 === 0;
    });
    const services = await this.dentalservRepository.find();

    patients.map(async (patient) => {
      const serv = services[Math.floor(Math.random() * services.length)];
      const dentist = dentists[Math.floor(Math.random() * dentists.length)];
      const dentista = await this.dentistRepository
        .createQueryBuilder('dentist')
        .leftJoinAndSelect('dentist.person', 'person')
        .where('dentist.person = :person_id', { person_id: dentist.id })
        .getOne();

      if (!dentista) return;
      const today = new Date();
      today.setHours(randomInt(8, 16), 30);
      const threeDaysFromNow = new Date(today);
      threeDaysFromNow.setDate(today.getDate() + 3);

      const randomTime =
        today.getTime() +
        Math.random() * (threeDaysFromNow.getTime() - today.getTime());

      /* const appointment = await this.appointmentService.create({
        dentist_id: dentista.id,
        patient: patient.id,
        service: serv.id,
        date_time: new Date(today.setDate(today.getDate() + 2)),
        description: 'test',
      }) */
    });
  }

  async seedSpecialUsers() {
    const admin = {
      first_name: 'Sr. Admin',
      last_name: 'General',
      dni: '1234567800',
      email: 'admin@me.com',
      phone: "2345671189",
      address: 'Calle 123',
      location: 'CABA',
      nationality: 'Argentino',
      birthdate: new Date("1990-01-01"),
    }
    const administrativo = {
      first_name: 'Sr. Administrativo',
      last_name: 'General',
      dni: '1234567100',
      email: 'administrativo@me.com',
      phone: "2345671189",
      address: 'Calle 123',
      location: 'CABA',
      nationality: 'Argentino',
      birthdate: new Date("1990-01-01"),
    }

    const exists_admin = await this.personService.personByEmail(admin.email);
    if (!exists_admin) {
      const saved_admin = await this.authService.signUp(admin, {
        email: admin.email,
        password: 'Pass*123',
      });
      await this.personService.addRole(saved_admin.id, { roleName: Roles.ADMIN })
      await this.personService.delRole(saved_admin.id, { roleName: Roles.PATIENT })

      console.log('created a superadmin');
    }

    const exists_administrativo = await this.personService.personByEmail(administrativo.email);
    if (!exists_administrativo) {
      const saved_administrativo = await this.authService.signUp(administrativo, {
        email: administrativo.email,
        password: 'Pass*123',
      });
      await this.personService.addRole(saved_administrativo.id, { roleName: Roles.ADMINISTRATIVE })
      await this.personService.delRole(saved_administrativo.id, { roleName: Roles.PATIENT })

      console.log('created an administrative');
    }
  }

}
