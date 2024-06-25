import { DentalServ } from "src/dentalServ/dentalServ.entity";
import { Person } from "src/person/entities/person.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'appointments'
})
export class Appointment {

    /**
     * UUID generated automatically
     */
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        nullable: false
    })
    date_time: Date;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true
    })
    description: string;

    /**
     * Dentist ID who will cover the appointment
     * TODO: ADD RELATION WITH DENTIST TABLE
     */
    @Column()
    dentist_id: string;

    /**
     * Patient ID who will attend the appointment
     * TODO: ADD RELATION WITH PATIENT TABLE
     */
    @ManyToOne(() => Person, (person) => person.id, {
        cascade: true
    })
    patient: Person | Person['id']


    /**
     * Service ID for the appointment
     * 
     */
    @ManyToOne(() => DentalServ, (dentalServ) => dentalServ.id, {
        cascade: true
    })
    service: DentalServ | DentalServ['id']


}
