import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { ComparePass } from '../utils/comparePass';

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
        deleteDate: true
      },
      withDeleted: true,
    });
    return credential;
  }
  
  async signUp(signUpInfo: Omit<Auth, 'id'>): Promise<Auth> {
    const emailExist: Auth = await this.authRepository.findOne({
      where: {
        email: signUpInfo.email,
      },
    });
    if (emailExist) throw new BadRequestException('Ya existe usuario registrado con ese email.');
    const credentialCreated: Auth = await this.authRepository.save(signUpInfo);
    return credentialCreated;
  }

  async deleteAuth(authToDelete: Auth) {
    await this.authRepository.softDelete(authToDelete.id)
    return `Las credenciales con ID ${authToDelete.id} fueron eliminadas.`
  }

  async restoreAuth(email: string, password: string): Promise<Auth> {
    const authToRestore: Auth = await this.authRepository
      .createQueryBuilder('auth')
      .withDeleted()
      .where('auth.email = :email', { email })
      .andWhere('auth.deleteDate IS NOT NULL')
      .select(['auth.password', 'auth.id'])
      .getOne()
    
    if (!authToRestore) throw new BadRequestException('Credenciales erroneas. No es posible restaurar el usuario.');

    if (await ComparePass(password, authToRestore.password)) {
      await this.authRepository.restore(authToRestore);
      return authToRestore;
    }

    throw new BadRequestException('Credenciales erroneas. No es posible restaurar el usuario.');
  }

  async changePass(authToUpdate: Auth) {
    return this.authRepository.save(authToUpdate);
  }

  async changeStatus(credential: Auth, action: string) {
    const email = credential.email;
    if(action === 'activate') {
      const authToRestore: Auth = await this.authRepository
        .createQueryBuilder('auth')
        .withDeleted()
        .where('auth.email = :email', { email })
        .andWhere('auth.deleteDate IS NOT NULL')
        .select(['auth.password', 'auth.id'])
        .getOne()

      await this.authRepository.restore(authToRestore);
      console.log("No es posible restore")
    } else if (action === 'deactivate') {
      await this.authRepository.softDelete(credential);
    } else {
      console.log("No es posible")
    }
  }
}
