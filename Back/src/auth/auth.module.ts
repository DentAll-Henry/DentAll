import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { PeopleModule } from '../person/person.module';
import { KnowRoleMiddleware } from './middlewares/knowRole'
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [PeopleModule, MailModule, TypeOrmModule.forFeature([Auth])],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(KnowRoleMiddleware).forRoutes('/auth/updateperson');
  }
}
