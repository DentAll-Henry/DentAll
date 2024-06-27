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
import { ReportModule } from './report/report.module';
import { ClinicalHistoryModule } from './clinicalHistory/clinicalHistory.module';

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
    RolesModule,
    ProductModule,
    ReportModule,
    ClinicalHistoryModule,
    JwtModule.register({
      global: true,
      secret: environment.jwt,
      signOptions: {
        expiresIn: '1h',
      },
    }),
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
