import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity({
    name: 'guests'
})
export class Guest {
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

  @Column({
    unique: true,
    nullable: false,
  })
  dni: string;

  @Column({
    nullable: false,
  })
  address: string;

  @Column()
  birthdate: Date;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  reason: string;
}