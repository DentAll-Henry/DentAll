import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Auth } from 'src/auth/auth.entity';

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
  @JoinColumn({ name: 'auth_id' })
  auth: Auth | Auth['id'];
}
