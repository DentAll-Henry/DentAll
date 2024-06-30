import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { Auth } from './entities/auth.entity';
import { Hash } from '../utils/hash';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PeopleService } from '../person/person.service';
import { Person } from '../person/entities/person.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly peopleService: PeopleService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(
    personInfo: Partial<Person>,
    signUpInfo: Omit<Auth, 'id'>,
  ) {
    const personByEmailExist: Person =
      await this.peopleService.personByEmail(personInfo.email);
    if (personByEmailExist)
      throw new BadRequestException('Email already exist');

    const personByDniExist: Person =
      await this.peopleService.personByDni(personInfo.dni);
    if (personByDniExist) throw new BadRequestException('DNI already exist');

    const credential: Auth =
      await this.authRepository.credentialByEmail(signUpInfo.email);

    if (credential) throw new BadRequestException('Email already exist');

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
      await this.authRepository.credentialByEmail(signInInfo.email);

    if (!credential) throw new BadRequestException('Invalid credentials');

    const isPassCorrect: boolean = await bcrypt.compare(
      signInInfo.password,
      credential.password,
    );
    if (!isPassCorrect) throw new BadRequestException('Invalid credentials');


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

    return { succes: 'Authorized acces', token };
  }

  async deleteAuth(email: string) {
    const authToDelte: Auth = await this.authRepository.credentialByEmail(email);
    if (!authToDelte) throw new BadRequestException('Auth does not exist');
    await this.authRepository.deleteAuth(authToDelte);
    const responsePerson: string = await this.peopleService.deletePerson(authToDelte.email);
    return responsePerson;
  }

  async restoreAuth({ email, password, confirmPass }: { email: string, password: string, confirmPass: string }) {
    if(password === confirmPass) {
      const AuthToRestore: Auth = await this.authRepository.restoreAuth(email, password);
      const person: Person = await this.peopleService.restorePerson(email);
      return person;
    }
  }

  async changePass(newPass: {email: string, currentPass: string, newPass: string, confirmNewPass: string }) {
    const authToUpdate: Auth = await this.authRepository.credentialByEmail(newPass.email);
    
    if (!authToUpdate) throw new BadRequestException('Invalid credentials.');

    const isPassCorrect: boolean = await bcrypt.compare(
      newPass.currentPass,
      authToUpdate.password,
    );
    if (!isPassCorrect) throw new BadRequestException('Invalid credentials');

    if (newPass.newPass !== newPass.confirmNewPass) throw new BadRequestException('New password and confirm new password must be equal.');

    authToUpdate.password = await Hash(newPass.newPass)
    
    return await this.authRepository.changePass(authToUpdate);
  }

  async updatePerson(personId: string, infoToUpdate: { phone?: string, email?: string, address?: string, location?: string, confirmPass: string }){
    const person: Person = await this.peopleService.personById(personId);
    
    const { confirmPass, ...infoPersonToUpdate } = infoToUpdate;
    
    const credentials: Auth = await this.authRepository.credentialByEmail(person.email);
    if(!credentials) throw new BadRequestException('Bad request')
    const isPassCorrect: boolean = await bcrypt.compare(
      credentials.password,
      confirmPass,
    )
    if (!isPassCorrect) throw new BadRequestException('Can not to preccess de request. Wrong information.');

    const personUpdated: Person = await this.peopleService.updatePerson(person.id, infoPersonToUpdate);

    return personUpdated;
  }
}
