import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Report } from '../report/report.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  name: string;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'float' })
  price: number;

  @Column()
  description: string;

  @OneToMany(() => Report, (Report) => Report.products)
  productReports: Report;
}
