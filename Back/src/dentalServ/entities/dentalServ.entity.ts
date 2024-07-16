import { ApiProperty } from '@nestjs/swagger';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'dental_serv' })
export class DentalServ {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  @ApiProperty({
    description: 'The name of the service',
    example: 'Caries',
    type: String,
    required: true,
    maxLength: 100,
  })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @ApiProperty({
    description: 'The price of the service',
    example: 100,
    type: Number,
    required: true,
  })
  price: number;

  @Column({ type: 'varchar', length: 200, nullable: false })
  @ApiProperty({
    description: 'The description of the service',
    example: 'Service for caries',
    type: String,
    required: true,
    maxLength: 200,
  })
  description: string;

  @Column({ type: 'varchar', nullable: true, length: 200 })
  @ApiProperty({
    description: 'The image of the service',
    example:
      'https://shop.bbc.com/cdn/shop/products/14847_300x.jpg?v=1567526955',
    type: String,
    required: false,
    maxLength: 200,
  })
  img: string;

  @Column({ type: 'boolean', default: true })
  @ApiProperty({
    description: 'The status of the service',
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => Appointment, (appo) => appo.service)
  @ApiProperty({
    description: 'The appointments of the service',
    type: [Appointment],
    required: false,
  })
  appo: Appointment | Appointment['id'];

  @OneToMany(() => Payment, (payment) => payment.dentalServ)
  payments?: Payment[];
  // implement treathments
  // @ManyToOne(() => DentalRecord, (dentalRecord) => dentalRecord.id)
  // record: DentalRecord | DentalRecord['id'];
}
