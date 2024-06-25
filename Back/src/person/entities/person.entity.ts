import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Auth } from '../../auth/entities/auth.entity';
import { Role } from '../../role/entities/role.entity';

@Entity({
  name: 'people',
})
export class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  first_name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  last_name: string;

  @Column()
  birthdate: Date;

  @Column({
    unique: true,
  })
  dni: string;

  @Column()
  phone: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column()
  address: string;

  @Column()
  location: string;

  @Column()
  nationality: string;

  @DeleteDateColumn({
    nullable: true,
  })
  deleteDate?: Date;

  @OneToOne(() => Auth)
  @JoinColumn({ name: 'auth' })
  auth: Auth | Auth['id'];

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'people_roles'
  })
  roles: Role[];
}
