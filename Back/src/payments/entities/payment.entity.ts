import { Appointment } from 'src/appointments/entities/appointment.entity';
import { DentalServ } from 'src/dentalServ/entities/dentalServ.entity';
import { Patient } from 'src/person/entities/patient.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ nullable: true, default: null, type: 'int' })
  payment_id: number;

  @Column({ nullable: true, default: null, type: 'varchar', length: 50 })
  preference_id: string;

  @Column({ nullable: true, default: null, type: 'varchar', length: 20 })
  payment_status: string;

  @OneToOne(() => Patient)
  patient: Patient['id'];

  @OneToOne(() => DentalServ)
  dentalServ: DentalServ['id'];

  @OneToOne(() => Appointment)
  appointment: Appointment['id'];
}
