import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Person } from './person.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Specialty } from 'src/specialty/specialty.entity';

@Entity({
  name: 'dentists',
})
export class Dentist {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @OneToOne(() => Specialty)
  @JoinColumn({ name: 'speciality_id' })
  specialty?: Specialty | Specialty['id'] | Specialty['name'];

  @Column('decimal', {
    precision: 2,
    scale: 1,
  })
  rate?: number;

  @OneToOne(() => Person)
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person: Person | Person['id'];

  @OneToMany(() => Appointment, (appointment) => appointment.dentist_id)
  appointments?: Appointment[];

  @Column({
    default: true,
  })
  is_active: boolean;
}
