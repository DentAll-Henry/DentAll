import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Roles } from '../enums/roles.enum';

@Entity({
  name: 'roles',
})
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ unique: true })
  name: Roles;

  @Column()
  description: string;
}
