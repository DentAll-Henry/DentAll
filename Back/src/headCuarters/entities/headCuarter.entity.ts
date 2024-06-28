import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cords } from './cords.entity';

@Entity('head_cuarters')
export class HeadCuarter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  address: string;

  @Column({ type: 'varchar', length: 200 })
  img: string;

  @OneToOne(() => Cords, { cascade: true })
  @JoinColumn({ name: 'cords_id' })
  cords: Cords;
}
