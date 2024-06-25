import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Product } from '../product/product.entity';
import { ProductReport } from './productReport.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  appointment_id: string = uuid();

  @OneToMany(() => ProductReport, (productReport) => productReport.report)
  @JoinColumn({ name: 'products' })
  products: ProductReport[];
}
