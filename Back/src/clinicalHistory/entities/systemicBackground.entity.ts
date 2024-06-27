import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClinicalHistory } from './clinicalHistory.entity';
import { IsString, Length } from 'class-validator';

@Entity({ name: 'systemic_background' })
export class SystemicBackground {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  @IsString()
  @Length(3, 50)
  name: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @Length(3, 100)
  info: string;

  @ManyToOne(
    () => ClinicalHistory,
    (clinicalHistory) => clinicalHistory.systemicBackground,
  )
  clinicalHistory: ClinicalHistory;
}
