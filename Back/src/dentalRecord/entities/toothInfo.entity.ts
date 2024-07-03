import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ToothNumber } from '../enum/toothNumber.enum';
import { Paint } from '../enum/paint.enum';
import { ApiProperty } from '@nestjs/swagger';
import { DentalRecord } from './dentalRecord.entity';

@Entity({ name: 'toothInfo' })
export class ToothInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => DentalRecord, (dentalRecord) => dentalRecord.toothInfo)
  record: DentalRecord;

  @Column({ type: 'varchar', length: 150, nullable: true, default: null })
  @ApiProperty({
    type: String,
    example: 'No observations',
    description: 'The observations of the tooth',
    required: false,
    default: null,
  })
  observations: string;

  @Column({ type: 'integer' })
  @ApiProperty({
    type: Number,
    example: '15',
    description: 'The valid number of the tooth',
    required: true,
  })
  toothNumber: ToothNumber;

  @Column({ type: 'boolean', default: false })
  @ApiProperty({
    type: Boolean,
    example: 'true',
    description: 'Indicates if the tooth is for extraction',
    required: false,
    default: false,
  })
  forExtraction: boolean;

  @Column({ type: 'boolean', default: false })
  @ApiProperty({
    type: Boolean,
    example: 'true',
    description: 'Indicates if the tooth is absent',
    required: false,
    default: false,
  })
  absent: boolean;

  @Column({ type: 'varchar', length: 8, nullable: true, default: null })
  @ApiProperty({
    type: String,
    example: 'red',
    description: 'Red for caries, Blue for restoration',
    required: false,
    default: null,
  })
  top: Paint;

  @Column({ type: 'varchar', length: 8, nullable: true, default: null })
  @ApiProperty({
    type: String,
    example: 'red',
    description: 'Red for caries, Blue for restoration',
    required: false,
    default: null,
  })
  bottom: Paint;

  @Column({ type: 'varchar', length: 8, nullable: true, default: null })
  @ApiProperty({
    type: String,
    example: 'red',
    description: 'Red for caries, Blue for restoration',
    required: false,
    default: null,
  })
  left: Paint;

  @Column({ type: 'varchar', length: 8, nullable: true, default: null })
  @ApiProperty({
    type: String,
    example: 'red',
    description: 'Red for caries, Blue for restoration',
    required: false,
    default: null,
  })
  right: Paint;

  @Column({ type: 'varchar', length: 8, nullable: true, default: null })
  @ApiProperty({
    type: String,
    example: 'red',
    description: 'Red for caries, Blue for restoration',
    required: false,
    default: null,
  })
  center: Paint;
}
