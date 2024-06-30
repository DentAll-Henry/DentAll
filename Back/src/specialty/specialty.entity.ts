import { DentalServ } from 'src/dentalServ/entities/dentalServ.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Specialty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => DentalServ, (dentalServ) => dentalServ.id)
  services: DentalServ[];
}
