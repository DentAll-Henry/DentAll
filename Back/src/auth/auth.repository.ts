import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
  ) {}

  async credentialByEmail(email: string): Promise<Auth> {
    const credential: Auth = await this.authRepository.findOne({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
    return credential;
  }
  
  async signUp(signUpInfo: Omit<Auth, 'id'>): Promise<Auth> {
    const emailExist: Auth = await this.authRepository.findOne({
      where: {
        email: signUpInfo.email,
      },
    });
    if (emailExist) throw new BadRequestException('Email already registered');
    const credentialCreated: Auth = await this.authRepository.save(signUpInfo);
    return credentialCreated;
  }
}
