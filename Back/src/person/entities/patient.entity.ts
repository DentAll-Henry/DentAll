import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Person } from './person.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { DentalRecord } from 'src/dentalRecord/entities/dentalRecord.entity';
import { Payment } from 'src/payments/entities/payment.entity';

@Entity('patient')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: true,
  })
  is_active: boolean;

  @OneToOne(() => Person)
  @JoinColumn({ name: 'person_id' })
  person: Person | Person['id'];

  @OneToOne(() => DentalRecord)
  @JoinColumn({ name: 'dental_record_id' })
  dentalRecord?: DentalRecord | DentalRecord['id'];


  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments?: Appointment[];

  @OneToMany(() => Payment, (payment) => payment.patient)
  payments?: Payment[];
}
