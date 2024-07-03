import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ToothNumber } from '../enum/toothNumber.enum';
import { ToothFace } from '../enum/toothFace.enum';
import { Code } from '../enum/code.enum';
import { DentalServ } from 'src/dentalServ/entities/dentalServ.entity';
import { ApiProperty } from '@nestjs/swagger';
import { DentalRecord } from './dentalRecord.entity';

@Entity({ name: 'treatments' })
export class Treatments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  @ApiProperty({
    type: Date,
    example: '2022-01-01',
    description: 'Date of treatment',
    required: false,
    default: 'Actual date',
  })
  date: Date;

  @Column({ type: 'integer' })
  @ApiProperty({
    type: Number,
    example: 15,
    description: 'Tooth number',
    required: true,
  })
  toothNumber: ToothNumber;

  @Column({ type: 'text' })
  @ApiProperty({
    type: Code,
    example: 'Code 1',
    description: 'Code of treatment',
    required: true,
  })
  code: Code;

  @Column({ type: 'text' })
  @ApiProperty({
    type: String,
    example: 'Top',
    description: 'Tooth face of treatment',
    required: true,
  })
  toothFace: ToothFace;

  @OneToOne(() => DentalServ)
  dentalServ: DentalServ;

  @Column({ type: 'boolean', default: false })
  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'Is signed by the dentist',
    required: false,
  })
  isSigned: boolean;

  @ManyToOne(() => DentalRecord, (record) => record.treatments)
  record: DentalRecord;
}
