import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';

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

  async deleteAuth(authToDelete: Auth) {
    await this.authRepository.softDelete(authToDelete.id)
    return `Auth whit ID ${authToDelete.id} was deleted.`
  }

  async restoreAuth(email: string, password: string): Promise<Auth> {
    const authToRestore: Auth = await this.authRepository
      .createQueryBuilder('auth')
      .withDeleted()
      .where('auth.email = :email', { email })
      .andWhere('auth.deleteDate IS NOT NULL')
      .select(['auth.password', 'auth.id'])
      .getOne()
    
    if (!authToRestore) throw new BadRequestException('Wrong credentials. It is not possible to restore person.');

    if (await bcrypt.compare(password, authToRestore.password)) {
      await this.authRepository.restore(authToRestore);
      return authToRestore;
    }

    throw new BadRequestException('Wrong credentials. It is not possible to restore person.');
  }

  async changePass(authToUpdate: Auth) {
    return this.authRepository.save(authToUpdate);
  }
}
