import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { Auth } from './entities/auth.entity';
import { Hash } from '../utils/hash';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PeopleService } from '../person/person.service';
import { Person } from '../person/entities/person.entity';
import { ComparePass } from '../utils/comparePass';
import { Roles } from 'src/role/enums/roles.enum';
import { Role } from 'src/role/entities/role.entity';
import { Dentist } from 'src/person/entities/dentist.entity';
import { DentistsService } from 'src/person/dentist.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly peopleService: PeopleService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly dentistsService: DentistsService,
  ) {}

  async credentialByEmail(email: string): Promise<Auth> {
    return await this.authRepository.credentialByEmail(email);
  }

  async signUp(
    personInfo: Partial<Person>,
    signUpInfo: Omit<Auth, 'id'>,
  ) {
    const personByEmailExist: Person =
      await this.peopleService.personByEmail(personInfo.email);
    if (personByEmailExist)
      throw new BadRequestException(`El email ${personInfo.email} ya existe.`);

    const personByDniExist: Person =
      await this.peopleService.personByDni(personInfo.dni);
    if (personByDniExist) throw new BadRequestException(`El DNI ${personInfo.dni} ya existe.`);

    const credential: Auth =
      await this.credentialByEmail(signUpInfo.email);

    if (credential) throw new BadRequestException(`El email ${personInfo.email} ya existe.`);

    signUpInfo.password = 
      await Hash(signUpInfo.password);

    const newCredential: Auth = 
      await this.authRepository.signUp(signUpInfo);

    return await this.peopleService.createPersonAsPatient({
      auth: newCredential,
      ...personInfo,
    });
  }

  async signIn(signInInfo: Omit<Auth, 'id'>) {
    const credential: Auth =
      await this.credentialByEmail(signInInfo.email);

    if (!credential) throw new BadRequestException('Credenciales de acceso inválidas.');
    if (credential.deleteDate !== null) throw new BadRequestException('Credenciales de acceso inválidas.');

    const isPassCorrect: boolean = await ComparePass(signInInfo.password, credential.password)
    if (!isPassCorrect) throw new BadRequestException('Credenciales de acceso inválidas.');


    const person: Person =
      await this.peopleService.personByEmail(credential.email);

    const userPayload = {
      id: person.id,
      email: credential.email,
      roles: person.roles[0].name,
    };

    const token = this.jwtService.sign(userPayload, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    return { succes: 'Authorized acces', token, userData: person };
  }

  async createDentist(
    personInfo: Partial<Person>,
    signUpInfo: Omit<Auth, 'id'>,
    dentistInfo: Partial<Dentist>,
  ) {
    const personByEmailExist: Person =
      await this.peopleService.personByEmail(personInfo.email);
    if (personByEmailExist)
      throw new BadRequestException(`El email ${personInfo.email} ya existe.`);

    const personByDniExist: Person =
      await this.peopleService.personByDni(personInfo.dni);
    if (personByDniExist) throw new BadRequestException(`El DNI ${personInfo.dni} ya existe.`);

    const credential: Auth =
      await this.credentialByEmail(signUpInfo.email);
    if (credential) throw new BadRequestException(`El email ${personInfo.email} ya existe.`);

    signUpInfo.password = 
      await Hash(signUpInfo.password);

    const newCredential: Auth = 
      await this.authRepository.signUp(signUpInfo);

    const newPerson: Person = await this.peopleService.createPerson(
      {
        auth: newCredential,
        ...personInfo,
      }
    );

    await this.dentistsService.createDentist({...dentistInfo, personId: newPerson.id})

    return newPerson;
  }

  async changeRole(changeRoleInfo: { id_person: string, new_role: Roles}) {
    const { id_person, new_role } = changeRoleInfo;

    const person: Person = await this.peopleService.personById(id_person);

    if (!person) throw new BadRequestException('No se encuentra registro para la persona indicada.');

    let hasRole: boolean = false;

    for(const role of person.roles) {
      if(role.name === new_role) {
        hasRole = true;
      }
    }

    if(!hasRole) throw new BadRequestException(`No tiene permiso para cambiar al rol ${new_role}`);

    const userPayload = {
      id: person.id,
      email: person.email,
      roles: new_role,
    };

    const token = this.jwtService.sign(userPayload, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    return { succes: 'Authorized acces', token, userData: person };
  }

  async deleteAuth(authInfo: Partial<Auth>) {
    const authToDelte: Auth = await this.credentialByEmail(authInfo.email);
    if (!authToDelte) throw new BadRequestException(`No existen credenciales de acceso para el email ${authInfo.email}.`);

    if (! await ComparePass(authInfo.password, authToDelte.password))
      throw new BadRequestException('Credenciales inválidas. No se pueden eliminar las credenciales.')
    
    await this.authRepository.deleteAuth(authToDelte);
    const responsePerson: string = await this.peopleService.deletePerson(authToDelte.email);
    return responsePerson;
  }

  async restoreAuth({ email, password }: Partial<Auth>) {
    const AuthToRestore: Auth = await this.authRepository.restoreAuth(email, password);
    const person: Person = await this.peopleService.restorePerson(email);
    return person;
  }

  async changePass(newPass: {email: string, currentPass: string, newPass: string, confirmNewPass: string }) {
    const authToUpdate: Auth = await this.credentialByEmail(newPass.email);
    
    if (!authToUpdate) throw new BadRequestException('Credenciales de acceso inválidas.');

    const isPassCorrect: boolean = await ComparePass(newPass.currentPass, authToUpdate.password);
    if (!isPassCorrect) throw new BadRequestException('Credenciales de acceso inválidas.');

    if (newPass.newPass !== newPass.confirmNewPass)
      throw new BadRequestException('La contraseña nueva debe ser igual a la confirmación de la contraseña.');

    authToUpdate.password = await Hash(newPass.newPass)
    
    return await this.authRepository.changePass(authToUpdate);
  }

  async updatePerson(role: Roles, infoToUpdate: { id: string, phone?: string, email?: string, address?: string, location?: string, password?: string }){
    const { id, password, ...infoPersonToUpdate } = infoToUpdate;

    const person: Person = await this.peopleService.personById(id);
    if(!person) throw new BadRequestException('Error en la solicitud.')
    
    const credentials: Auth = person.auth as Auth;
    if(!credentials) throw new BadRequestException('Error en la solicitud.')
      
    if(!person.is_auth0) {
      const isPassCorrect: boolean = await ComparePass(password, credentials.password);
      if (!isPassCorrect) throw new BadRequestException('No se puede proceder con la solicitud. Información incorrecta.');
    }

    const personUpdated: Person = await this.peopleService.updatePerson(person.id, infoPersonToUpdate);

    const { auth, ...personToReturn } = personUpdated

    const userPayload = {
      id: personUpdated.id,
      email: personUpdated.email,
      roles: role,
    };

    const token = this.jwtService.sign(userPayload, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    return { token, userData: personToReturn};
  }

  async changeStatus (idperson: string) {
    const person: Person = await this.peopleService.personById(idperson);
    if (!person) throw new BadRequestException('No existe usuario con el id especificado.');
    
    const auth: Auth = await this.credentialByEmail(person.email);
    
    let action: string;
    
    if(person.is_active) {
      person.is_active = false;
      action = 'deactivate';
    } else {
      person.is_active = true
      action = 'activate';
    };

    await this.authRepository.changeStatus(auth, action);

    const personUpdated: Person = await this.peopleService.updatePerson(person.id, person);

    return personUpdated;
  }
}
