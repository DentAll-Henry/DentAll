import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ReportRepository } from './report.repository';
import { ReportDto, UpdateReportDto } from './report.dto';
import { ProductService } from 'src/product/product.service';
import { productReportDto } from './productReport.dto';
import { ProductReportRepository } from './productReport.repository';
import { Report } from './report.entity';
// import { AppointmentsService } from 'src/appointments/appointments.service';

@Injectable()
export class ReportService {
  constructor(
    private readonly reportRepo: ReportRepository,
    private readonly productService: ProductService,
    private readonly productReportrepository: ProductReportRepository,
    // private readonly appService: AppointmentsService,
  ) {}

  async getReport() {
    console.log('llega al servicio');

    const report = await this.reportRepo.getReport();
    if (report.length === 0) {
      return "There's no reports";
    }
    return report;
  }

  async getReportById(id: string) {
    const report = await this.reportRepo.getReportById(id);
    if (!report) {
      throw new BadRequestException('Report not found');
    }
    return report;
  }

  async createReport(report: ReportDto) {
    console.log('llega al servicio');

    const newReport = new Report();

    newReport.appointment_id = report.appointment_id;
    newReport.products = [];

    await this.reportRepo.createReport(newReport);

    for (const producto of report.products) {
      const existingProduct = await this.productService.getProductById(
        producto.id,
      );

      if (!existingProduct) {
        throw new BadRequestException('Product not founded');
      }

      if (Number(existingProduct.stock) < Number(producto.quantity)) {
        throw new BadRequestException('Insufficient stock');
      } else if (Number(existingProduct.stock) === 0) {
        throw new BadRequestException('There is no stock');
      } else existingProduct.stock -= producto.quantity;

      await this.productService.editProduct(existingProduct.id, {
        stock: existingProduct.stock - producto.quantity,
      });

      const productReport = await this.productReportrepository.create({
        product_id: existingProduct,
        quantity: producto.quantity,
        report_id: newReport.id,
      });

      newReport.products.push(productReport);
    }

    // const app = this.appService.findOne(report.appointment_id);

    // if (!app) {
    //   throw new BadRequestException('Appointment not found');
    // }

    const createdReport = await this.reportRepo.createReport(newReport);

    return createdReport;
  }

  async editReport(id: string, data: Partial<UpdateReportDto>) {
    const existingReport = await this.reportRepo.getReportById(id);
    if (!existingReport) {
      throw new BadRequestException('Report not found');
    }
    const updatedProducts = [];

    for (const editProduct of data.products) {
      console.log('entra al for');

      const existingProduct = await this.productService.getProductById(
        editProduct.id,
      );
      if (!existingProduct) {
        throw new BadRequestException('Product not founded');
      }

      const productReport = existingReport.products.find(
        (product) => product.id === editProduct.id,
      );

      if (productReport) {
        console.log('entra al if');

        await this.productService.editProduct(existingProduct.id, {
          stock:
            existingProduct.stock -
            editProduct.quantity +
            productReport.quantity,
        });

        updatedProducts.push(productReport);
      } else {
        console.log('entra al else');

        const newProductReport = await this.productReportrepository.create({
          product_id: existingProduct,
          quantity: editProduct.quantity,
          report_id: existingReport.id,
        });

        console.log('crea el nuevo product report');

        updatedProducts.push(newProductReport);
        console.log('agrega el nuevo product report', updatedProducts);

        data.products = updatedProducts;

        console.log('actualiza data');
        await this.productService.editProduct(existingProduct.id, {
          stock: existingProduct.stock - editProduct.quantity,
        });
      }
    }

    console.log('todo terminando falta editar');
    return this.reportRepo.editReport(existingReport, data);
  }

  async deleteReport(id: string) {
    const existingReport = await this.reportRepo.getReportById(id);
    if (!existingReport) {
      throw new BadRequestException('Report not found');
    }

    for (const product of existingReport.products) {
      await this.productService.unassociateProduct(
        product.product,
        product.quantity,
      );
    }
    return this.reportRepo.deleteReport(existingReport);
  }
}
