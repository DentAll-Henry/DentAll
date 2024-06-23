import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { PeopleModule } from '../person/person.module';
import { Auth } from './auth.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Auth])],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  exports: [AuthService, TypeOrmModule],
})
export class AuthModule {}
