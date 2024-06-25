import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportDto, UpdateReportDto } from './report.dto';
import { Report } from './report.entity';
import { productReportDto } from './productReport.dto';
@Injectable()
export class ReportRepository {
  constructor(
    @InjectRepository(Report) private reportRepo: Repository<Report>,
  ) {}

  getReport() {
    console.log('llega al repo');

    return this.reportRepo.find({
      relations: { products: { product: true } },
      select: {
        id: true,
        products: {
          quantity: true,
          product: {
            id: true,
            name: true,
            price: true,
            stock: true,
          },
        },
        appointment_id: true,
      },
    });
  }

  async getReportById(id: string) {
    return await this.reportRepo.findOne({
      where: { id },
      relations: ['products', 'products.product'],
      select: {
        id: true,
        products: {
          quantity: true,
          product: {
            id: true,
            name: true,
            price: true,
            stock: true,
          },
        },
        appointment_id: true,
      },
    });
  }

  async createReport(report: ReportDto) {
    try {
      return this.reportRepo.save(report);
    } catch (error) {
      throw new InternalServerErrorException("Can't create report");
    }
  }

  editReport(report: Report, data: Partial<UpdateReportDto>) {
    try {
      return this.reportRepo.save({ ...report, ...data });
    } catch (error) {
      throw new InternalServerErrorException("Can't edit report");
    }
  }

  deleteReport(report: Report) {
    try {
      return this.reportRepo.remove(report);
    } catch (error) {
      throw new InternalServerErrorException("Can't delete report");
    }
  }
}
