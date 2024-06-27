import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DentalRecord } from './dentalRecord.entity';

@Entity({ name: 'deseases' })
export class Deseases {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ManyToOne(() => DentalRecord, (dentalRecord) => dentalRecord.deseases)
  record: DentalRecord | DentalRecord['id'];
}
