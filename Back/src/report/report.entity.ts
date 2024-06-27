import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ProductReport } from './productReport.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ManyToOne(() => Appointment, (appointment) => appointment.id)
  appointment: Appointment;

  @OneToMany(() => ProductReport, (productReport) => productReport.report_id, {
    cascade: true,
  })
  @JoinColumn({ name: 'products_used' })
  products: ProductReport[];
}
