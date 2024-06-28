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

    @Column()
    career: string;

    @Column()
    speciality: string;

    @OneToOne(() => Person)
    @JoinColumn({ name: 'person_id' })
    person: Person | Person['id'];

    @OneToMany(() => Appointment, (appointment) => appointment.id)
    appointments: Appointment[];
}