import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'auths',
})
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    select: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  resetPasswordToken: string;

  @Column({
    type: Date,
    nullable: true,
  })
  resetPasswordExpires: Date;

  @DeleteDateColumn({
    nullable: true,
  })
  deleteDate?: Date;
}
