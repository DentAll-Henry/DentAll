import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DentalServModule } from './dentalServ/dentalServ.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { environment } from './config/environment';
import { AuthModule } from './auth/auth.module';
import { PeopleModule } from './person/person.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { RolesModule } from './role/role.module';
import { MailModule } from './mail/mail.module';
import { ProductModule } from './product/product.module';
import { SystemConfigsModule } from './system_configs/system_configs.module';
import { DentalRecordModule } from './dentalRecord/dentalRecord.module';
import { MockAutoLoadService } from './common/service/mock_auto_load.service';
import { DentalServ } from './dentalServ/entities/dentalServ.entity';
import { AuthService } from './auth/auth.service';
import { Auth } from './auth/entities/auth.entity';
import { AuthRepository } from './auth/auth.repository';
import { FilesController } from './files/files.controller';
import { FilesService } from './files/files.service';
import { FilesModule } from './files/files.module';
import { SpecialtyModule } from './specialty/specialty.module';
import { HeadquarterModule } from './headquarters/headquarter.module';
import { Cords } from './headquarters/entities/cords.entity';
import { Headquarter } from './headquarters/entities/headquarter.entity';
import { DentistsService } from './person/dentist.service';
import { DentistsRepository } from './person/dentist.repository';
import { MailerModule } from '@nestjs-modules/mailer';
import nodemailerConfig from './config/nodemailer';
import { PaymentsModule } from './payments/payments.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AppService } from './app.service';
import { AppointmentsRepository } from './appointments/appointments.repository';
import { Appointment } from './appointments/entities/appointment.entity';
import { Payment } from './payments/entities/payment.entity';

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
    MailerModule.forRootAsync({
      useFactory: () => nodemailerConfig,
    }),
    ScheduleModule.forRoot(),
    DentalServModule,
    AuthModule,
    AppointmentsModule,
    PeopleModule,
    RolesModule,
    ProductModule,
    DentalRecordModule,
    HeadquarterModule,
    PaymentsModule,

    JwtModule.register({
      global: true,
      secret: environment.jwt,
      signOptions: {
        expiresIn: '1h',
      },
    }),
    MailModule,
    SystemConfigsModule,
    TypeOrmModule.forFeature([DentalServ, Cords, Headquarter, Appointment, Payment]),
    TypeOrmModule.forFeature([Auth]),
    FilesModule,
    SpecialtyModule
  ],
  controllers: [FilesController],

  providers: [
    AppService,
    MockAutoLoadService,
    AuthService,
    AuthRepository,
    FilesService,
    DentistsService,
    DentistsRepository
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
