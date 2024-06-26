import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductReport } from './productReport.entity';
import { Repository } from 'typeorm';
import { productReportDto } from './productReport.dto';
import { Report } from './report.entity';
import { ProductService } from '../product/product.service';
@Injectable()
export class ProductReportRepository {
  constructor(
    @InjectRepository(ProductReport)
    private productReportRepository: Repository<ProductReport>,
    @InjectRepository(Report)
    private readonly ReportRepository: Repository<Report>,
    private readonly productService: ProductService,
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
      const product = await this.productService.getProductById(
        productReportDto.product_id,
      );

      if (!product) {
        throw new BadRequestException('Product not founded');
      }

      const report = await this.ReportRepository.findOne({
        where: { id: productReportDto.report_id },
      });

      if (Number(product.stock) < Number(productReportDto.quantity)) {
        throw new BadRequestException('Insufficient stock');
      } else if (Number(product.stock) === 0) {
        throw new BadRequestException('There is no stock');
      } else product.stock -= productReportDto.quantity;

      console.log(product.stock - productReportDto.quantity);

      const newProductReport = new ProductReport();
      const productArray = [];

      productArray.push(product);

      newProductReport.quantity = productReportDto.quantity;
      newProductReport.report_id = report;
      newProductReport.product = productArray;

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
