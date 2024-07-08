import { DentalServ } from 'src/dentalServ/entities/dentalServ.entity';
import { Patient } from 'src/person/entities/patient.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ nullable: true, default: null, type: 'varchar', length: 150 })
  collection_id: string;

  @Column({ nullable: true, default: null, type: 'varchar', length: 150 })
  collection_status: string;

  @Column({ nullable: true, default: null, type: 'varchar', length: 150 })
  payment_id: string;

  @Column({ nullable: true, default: null, type: 'varchar', length: 150 })
  status: string;

  @Column({ nullable: true, default: null, type: 'varchar', length: 150 })
  external_reference: string;

  @Column({ nullable: true, default: null, type: 'varchar', length: 150 })
  payment_type: string;

  @Column({ nullable: true, default: null, type: 'varchar', length: 150 })
  merchant_order_id: string;

  @Column({ nullable: true, default: null, type: 'varchar', length: 150 })
  preference_id: string;

  @Column({ nullable: true, default: null, type: 'varchar', length: 150 })
  site_id: string;

  @Column({ nullable: true, default: null, type: 'varchar', length: 150 })
  processing_mode: string;

  @Column({ nullable: true, default: null, type: 'varchar', length: 150 })
  merchant_account_id: string;

  @OneToOne(() => Patient)
  patient: Patient;

  @OneToOne(() => DentalServ)
  dentalServ: DentalServ;
}
