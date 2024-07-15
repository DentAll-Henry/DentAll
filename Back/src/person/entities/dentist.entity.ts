import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Person } from './person.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Specialty } from 'src/specialty/specialty.entity';
import { DentalServ } from 'src/dentalServ/entities/dentalServ.entity';

@Entity({
  name: 'dentists',
})
export class Dentist {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ManyToOne(() => Specialty, (specialty) => specialty.id)
  specialty?: Specialty | Specialty['id'] | Specialty['name'];

  @Column('decimal', {
    precision: 2,
    scale: 1,
    nullable: true
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

  @ManyToMany(() => DentalServ)
  @JoinTable({
    name: 'dentists_dentalservices',
  })
  dental_services: DentalServ[];

  @Column({
    default: '',
    nullable: true,
  })
  description: string;
}
