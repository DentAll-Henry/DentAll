import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cords')
export class Cords {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 7 })
  lat: number;

  @Column('decimal', { precision: 10, scale: 7 })
  lng: number;
}
