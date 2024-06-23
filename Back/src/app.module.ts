import { Module } from '@nestjs/common';
import { DentalServModule } from './dentalServ/dentalServ.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { environment } from './config/environment';
import { AuthModule } from './auth/auth.module';
import { PeopleModule } from './person/person.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    DentalServModule,
    AuthModule,
    AppointmentsModule,
    PeopleModule,
    JwtModule.register({
      global: true,
      secret: environment.jwt,
      signOptions: {
        expiresIn: '1h'
      }
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
