import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { Auth } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async signUp(signUpInfo: Omit<Auth, 'id'>) {}
}
