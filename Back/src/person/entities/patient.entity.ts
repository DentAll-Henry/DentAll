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

@Entity('patient')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Person)
  @JoinColumn({ name: 'person_id' })
  person_id: Person['id'];

  // @OneToOne(() => ClinicalHistory)
  // @JoinColumn({ name: 'clinicalHistory_id' })
  // clinicalHistory: ClinicalHistory['id'];

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];
}
