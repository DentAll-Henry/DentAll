import { Appointment } from 'src/appointments/entities/appointment.entity';
import { DentalRecord } from 'src/dentalRecord/entities/dentalRecord.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'dental_serv' })
export class DentalServ {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Appointment, (appo) => appo.service)
  appo: Appointment | Appointment['id'];

  // implement treathments
  // @ManyToOne(() => DentalRecord, (dentalRecord) => dentalRecord.id)
  // record: DentalRecord | DentalRecord['id'];
}
