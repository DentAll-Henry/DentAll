import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { Auth } from './entities/auth.entity';
import { Hash } from '../utils/hash';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PeopleService } from '../person/person.service';
import { Person } from '../person/entities/person.entity';
import { ComparePass } from '../utils/comparePass';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly peopleService: PeopleService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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

    const isPassCorrect: boolean = await ComparePass(signInInfo.password, credential.password)
    if (!isPassCorrect) throw new BadRequestException('Credenciales de acceso inválidas.');


    const person: Person =
      await this.peopleService.personByEmail(credential.email);

    const userPayload = {
      id: person.id,
      email: credential.email,
      roles: person.roles[0].name, //! Revisar cambio de rol
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

  async updatePerson(personId: string, infoToUpdate: { phone?: string, email?: string, address?: string, location?: string, confirmPass: string }){
    const person: Person = await this.peopleService.personById(personId);
    
    const { confirmPass, ...infoPersonToUpdate } = infoToUpdate;
    
    const credentials: Auth = await this.credentialByEmail(person.email);
    if(!credentials) throw new BadRequestException('Error en la solicitud.')
    const isPassCorrect: boolean = await ComparePass(credentials.password, confirmPass);
    if (!isPassCorrect) throw new BadRequestException('No se puede proceder con la solicitud. Información incorrecta.');

    const personUpdated: Person = await this.peopleService.updatePerson(person.id, infoPersonToUpdate);

    return personUpdated;
  }
}
