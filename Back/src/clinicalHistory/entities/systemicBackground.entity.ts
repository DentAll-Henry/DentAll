import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClinicalHistory } from './clinicalHistory.entity';

@Entity({ name: 'systemic_background' })
export class SystemicBackground {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  info: string;

  @ManyToOne(
    () => ClinicalHistory,
    (clinicalHistory) => clinicalHistory.systemicBackground,
  )
  @JoinColumn()
  clinicalHistory: ClinicalHistory;
}
