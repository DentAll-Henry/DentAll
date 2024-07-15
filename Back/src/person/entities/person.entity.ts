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

  @Column({
    nullable: true,
  })
  address?: string;

  @Column({
    nullable: true,
  })
  location?: string;

  @Column({
    nullable: true,
  })
  nationality?: string;

  @Column({
    default: false,
  })
  is_auth0?: boolean;

  @Column({
    default: 'https://res.cloudinary.com/ddpohfyur/image/upload/v1719842517/profileImage_okbvqw.jpg',
  })
  photo?: string;
  
  @Column({
    default: true,
  })
  is_active: boolean;

  @DeleteDateColumn({
    nullable: true,
  })
  deleteDate?: Date;

  @OneToOne(() => Auth)
  @JoinColumn({ name: 'auth' })
  auth: Auth | Auth['id'];

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'people_roles',
  })
  roles: Role[];
}
