import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SystemicBackground } from './systemicBackground.entity';

@Entity({ name: 'clinical_history' })
export class ClinicalHistory {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  guard_card: string;

  @Column()
  date: Date;

  @OneToMany(
    () => SystemicBackground,
    (systemicItem) => systemicItem.clinicalHistory,
  )
  @JoinColumn()
  systemicBackground: SystemicBackground[];

  //TODO: family_background,general_backgroud,treatment,obersvations
}
