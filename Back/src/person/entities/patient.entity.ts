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

@Entity('patient')
export class Patient {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => Person)
  @JoinColumn({ name: 'person_id' })
  person_id: Person['id'];

  @OneToOne(() => DentalRecord)
  @JoinColumn({ name: 'dental_record_id' })
  dentalRecord?: DentalRecord | DentalRecord['id'];

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];
}
