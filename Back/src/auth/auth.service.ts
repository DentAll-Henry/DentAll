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

  async signUp(personInfo: Partial<Person>, signUpInfo: Omit<Auth, 'id' | 'roles'>): Promise<string> {
    const personByEmailExist: Person =
      await this.peopleService.personByEmail(personInfo.email);
    if (personByEmailExist)
      throw new BadRequestException('Email already exist');

    const personByDniExist: Person = 
      await this.peopleService.personByDni(personInfo.dni);
    if (personByDniExist)
      throw new BadRequestException('DNI already exist');

    const credential: Auth =
      await this.authRepository.credentialByEmail(signUpInfo.email);
    
    if (credential) throw new BadRequestException('Email already exist');
    
    signUpInfo.password = await Hash(signUpInfo.password);
    
    const newCredentialId: string = await this.authRepository.signUp(signUpInfo)

    await this.peopleService.createPerson({ auth: newCredentialId, ...personInfo });

    return newCredentialId;
  }

  async signIn(signInInfo: Omit<Auth, 'id' | 'roles'>) {
    const credential: Auth = await this.authRepository.credentialByEmail(signInInfo.email);
    if (!credential) throw new BadRequestException('Invalid credentials');
    
    const isPassCorrect: boolean = await bcrypt.compare(signInInfo.password, credential.password);
    if (!isPassCorrect) throw new BadRequestException('Invalid credentials');

    const person: Person = await this.peopleService.personByAuthId(credential.id)
    
    const userPayload = {
        id: person.id,
        email: credential.email,
        roles: person.roles[0], //! Revisar cambio de rol
    }
    
    const token = this.jwtService.sign(userPayload, {
        secret: this.configService.get<string>('JWT_SECRET'),
    });

    return ({ succes: 'Authorized acces', token })
  }
}
