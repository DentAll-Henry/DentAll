import { Product } from 'src/product/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Report } from './report.entity';

@Entity({ name: 'productsReport' })
export class ProductReport {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Report, (report) => report.products)
  @JoinColumn({ name: 'report_id' })
  report_id: Report;

  @ManyToMany(() => Product, { cascade: true })
  @JoinColumn()
  @JoinTable({
    name: 'products_report',
    joinColumn: {
      name: 'productReport_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  product: Product[];
}
