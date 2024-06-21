import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './auth.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
  ) {}

  async signUp(signUpInfo: Omit<Auth, 'id'>): Promise<string> {
    const emailExist: Auth = await this.authRepository.findOne({
        where: {
            email: signUpInfo.email
        }
    })
    if (emailExist) throw new BadRequestException('Email already registered')
    const credentialCreated: Auth = await this.authRepository.save(signUpInfo);
    return credentialCreated.id;
  }

  async signIn(singInInfo: Omit<Auth, 'id'>): Promise<boolean> {
    const credentialSignIn: Auth = await this.authRepository.findOne({
      where: {
        password: singInInfo.password,
      },
    });
    if (!credentialSignIn) throw new BadRequestException('Invalid credentials');
    return true;
  }
}
