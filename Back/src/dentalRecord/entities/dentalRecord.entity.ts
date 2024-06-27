import { DentalServ } from 'src/dentalServ/entities/dentalServ.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Deseases } from './deseases.entity';

@Entity({ name: 'dental_record' })
export class DentalRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 25 })
  health_Insurance: string;

  // ??
  // @Column({ type: 'int' })
  // number: number;
  // ??

  // @Column()
  // vestibular: string; // ??

  @Column({ type: 'varchar', length: 150 })
  observations: string;

  @OneToMany(() => Deseases, (deseases) => deseases.record)
  deseases: Deseases | Deseases[];

  @Column({ type: 'varchar', length: 50 })
  medication: string;

  @OneToMany(() => DentalServ, (dentalServ) => dentalServ.id)
  services: DentalServ | DentalServ[];
}
