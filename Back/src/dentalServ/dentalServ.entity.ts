import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'dental-serv' })
export class DentalServ {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 200 })
  description: string;
}
