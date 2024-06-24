import { DentalServ } from 'src/dentalServ/dentalServ.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'appointments',
})
@Entity({
  name: 'appointments',
})
export class Appointment {
  /**
   * UUID generated automatically
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  @Column({
    nullable: false,
  })
  date_time: Date;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description: string;

  /**
   * Dentist ID who will cover the appointment
   * TODO: ADD RELATION WITH DENTIST TABLE
   */
  @Column()
  dentist_id: string;

  /**
   * Patient ID who will attend the appointment
   * TODO: ADD RELATION WITH PATIENT TABLE
   */
  @Column()
  patient_id: string;

  /**
   * Service ID for the appointment
   *
   */
  @ManyToOne(() => DentalServ, (dentalServ) => dentalServ.id, {
    cascade: true,
  })
  service: DentalServ | DentalServ['id'];
}
