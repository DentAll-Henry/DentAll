import { DentalServ } from 'src/dentalServ/entities/dentalServ.entity';
import { Patient } from 'src/person/entities/patient.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'varchar', length: 115 })
  preference_id: string;

  @OneToOne(() => Patient)
  patient: Patient;

  @OneToOne(() => DentalServ)
  dentalServ: DentalServ;
}
