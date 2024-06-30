import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cords')
export class Cords {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: false })
  @ApiProperty({
    name: 'lat',
    type: 'decimal',
    required: true,
    example: 37.7749295,
    description: 'Latitude of the headquarter',
  })
  lat: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: false })
  @ApiProperty({
    name: 'lng',
    type: 'decimal',
    required: true,
    example: -122.4194155,
    description: 'Longitude of the headquarter',
  })
  lng: number;
}
