import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DentalRecord } from './dentalRecord.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'deseases' })
export class Deseases {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  @ApiProperty({
    description: 'Desease name',
    example: 'Diabetes',
    type: String,
    maxLength: 50,
    required: true,
  })
  name: string;

  @ManyToOne(() => DentalRecord, (dentalRecord) => dentalRecord.deseases)
  @ApiProperty({
    description: 'Dental record related to the desease',
    type: DentalRecord,
    required: true,
  })
  record: DentalRecord | DentalRecord['id'];
}
