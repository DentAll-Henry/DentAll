import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cords } from './cords.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('headquarters')
export class Headquarter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  @ApiProperty({
    example: 'Headquarter 1',
    description: 'Name of the headquarter',
    required: true,
    type: String,
    maxLength: 50,
  })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty({
    example: 'Street 1',
    description: 'Address of the headquarter',
    required: true,
    type: String,
    maxLength: 100,
  })
  address: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  @ApiProperty({
    example: 'http://example.com/image.jpg',
    description: 'URL of the image of the headquarter',
    required: false,
    type: String,
    maxLength: 200,
  })
  img: string;

  @OneToOne(() => Cords, { cascade: true })
  @JoinColumn({ name: 'cords_id' })
  @ApiProperty({
    example: { lat: 37.7749295, lng: -122.4194155 },
    description: 'Cords of the headquarter',
    required: true,
    type: Cords,
  })
  cords: Cords;
}
