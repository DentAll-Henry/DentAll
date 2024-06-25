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
import { ClinicalHistory } from 'src/clinicalHistory/entities/clinicalHistory.entity';

@Entity('patient')
export class Patient {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => Person)
  @JoinColumn({ name: 'person_id' })
  person_id: Person['id'];

  @OneToOne(() => ClinicalHistory)
  @JoinColumn({ name: 'clinicalHistory_id' })
  clinicalHistory: ClinicalHistory['id'];

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];
}
