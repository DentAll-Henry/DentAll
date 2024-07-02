import { DentalServ } from 'src/dentalServ/entities/dentalServ.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Specialty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => DentalServ, {
    cascade: true,
    nullable: true,
  })
  @JoinTable({
    name: 'specialty_dentalServ',
    joinColumn: {
      name: 'specialty_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'dentalServ_id',
      referencedColumnName: 'id',
    },
  })
  services?: DentalServ[];
}
