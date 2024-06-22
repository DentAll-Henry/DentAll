import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('appointments')
export class Appointment {

    /**
     * UUID generated automatically
     */
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "datetime"
    })
    date_time: Date;


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
    @Column()
    patient_id: string;


    /**
     * Service ID for the appointment
     * TODO: ADD RELATION WITH SERVICE TABLE
     */
    @Column()
    service_id: string;



}
