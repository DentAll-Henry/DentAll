import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateAppointmentDto {

    @IsNotEmpty()
    @IsUUID()
    dentist_id: string;

    @IsNotEmpty()
    @IsUUID()
    patient_id: string;

    @IsNotEmpty()
    @IsUUID()
    service_id: string;

    @IsNotEmpty()
    date_time: Date;
    
}
