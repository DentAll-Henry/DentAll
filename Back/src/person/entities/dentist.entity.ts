import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Person } from "./person.entity";
import { Appointment } from "src/appointments/entities/appointment.entity";

@Entity({
    name: 'dentists'
})
export class Dentist {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    // @OneToOne(() => Speciality)
    // @JoinColumn({ name: 'speciality_id'})
    // speciality: Speciality | Speciality['id'] | Speciality['name'];

    @Column()
    rate?: number;

    @OneToOne(() => Person)
    @JoinColumn({ name: 'person_id' })
    person: Person | Person['id'];

    @OneToMany(() => Appointment, (appointment) => appointment.id)
    appointments?: Appointment[];
}