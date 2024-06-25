import { Product } from 'src/product/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Report } from './report.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class ProductReport {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @IsNotEmpty()
  @Column({ type: 'int' })
  quantity: number;

  @IsNotEmpty()
  @ManyToOne(() => Product, (product) => product.productReports)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Report, (report) => report.products, {
    onDelete: 'CASCADE',
  })
  report: Report;
}
