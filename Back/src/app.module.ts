import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsModule } from './appointments/appointments.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [AppointmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
