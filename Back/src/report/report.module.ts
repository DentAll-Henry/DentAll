import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportController } from './report.controller';
import { ReportRepository } from './report.repository';
import { ReportService } from './report.service';
import { Report } from './report.entity';
import { ProductModule } from 'src/product/product.module';
import { AppointmentsModule } from 'src/appointments/appointments.module';
import { ProductReportRepository } from './productReport.repository';
import { ProductReport } from './productReport.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]),
    TypeOrmModule.forFeature([ProductReport]),
    AppointmentsModule,
    ProductModule,
  ],
  controllers: [ReportController],
  providers: [ReportRepository, ReportService, ProductReportRepository],
})
export class ReportModule {}
