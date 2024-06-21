import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'dental-serv' })
export class DentalServ {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'varchar', length: 200 })
  description: string;
}
