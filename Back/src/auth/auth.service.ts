import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { Auth } from './auth.entity';
import { Hash } from 'src/utils/hash';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
// import { PeopleService } from '../person/person.service';
// import { Person } from 'src/person/person.entity';

@Injectable()
export class AuthService {
  constructor(
    // private readonly peopleService: PeopleService,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(signUpInfo: Omit<Auth, 'id'>): Promise<string> {
    const credential: Auth = await this.authRepository.credentialByEmail(signUpInfo.email);
    if (credential) throw new BadRequestException('Email already exist');
    signUpInfo.password = await Hash(signUpInfo.password);
    const newCredentialId: string = await this.authRepository.signUp(signUpInfo)
    return newCredentialId;
  }

  async signIn(signInInfo: Omit<Auth, 'id'>) {
    const credential: Auth = await this.authRepository.credentialByEmail(signInInfo.email);
    if (!credential) throw new BadRequestException('Invalid credentials');
    
    const isPassCorrect: boolean = await bcrypt.compare(signInInfo.password, credential.password);
    if (!isPassCorrect) throw new BadRequestException('Invalid credentials');

    // const person: Person = await this.peopleService.personByAuthId(credential.id)
    
    const userPayload = {
        // id: person.id,
        email: credential.email,
        // roles: person.role, //! Si el usuario tiene varios roles, debe seleccionar con el que se va a loggear
    }
    
    const token = this.jwtService.sign(userPayload, {
        secret: this.configService.get<string>('JWT_SECRET'),
    });

    return ({ succes: 'Authorized acces', token })
  }
}
