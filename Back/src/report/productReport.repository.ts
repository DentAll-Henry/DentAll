import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductReport } from './productReport.entity';
import { Repository } from 'typeorm';
import { productReportDto } from './productReport.dto';
import { ReportService } from './report.service';
import { Report } from './report.entity';
import { ReportRepository } from './report.repository';
@Injectable()
export class ProductReportRepository {
  constructor(
    @InjectRepository(ProductReport)
    private productReportRepository: Repository<ProductReport>,
    @InjectRepository(Report)
    private readonly ReportRepository: Repository<Report>,
  ) {}

  async findOne(id: string) {
    try {
      console.log(id);

      return await this.productReportRepository.findOne({
        where: { id },
        relations: { product: {} },
        select: {
          id: true,
          quantity: true,
          product: {
            id: true,
            name: true,
            // price: true,
            // stock: true,
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Can not find product report');
    }
  }

  async create(productReportDto: productReportDto) {
    try {
      const newProductReport = new ProductReport();
      newProductReport.product = productReportDto.product_id;
      newProductReport.quantity = productReportDto.quantity;
      newProductReport.report = await this.ReportRepository.findOne({
        where: { id: productReportDto.report_id },
      });

      const savedProductReport =
        await this.productReportRepository.save(newProductReport);

      return await this.productReportRepository.findOne({
        where: { id: savedProductReport.id },
        relations: { product: true },
        select: {
          id: true,
          quantity: true,
          product: {
            id: true,
            name: true,
          },
        },
      });
    } catch (error) {
      throw error.message;
    }
  }
}
