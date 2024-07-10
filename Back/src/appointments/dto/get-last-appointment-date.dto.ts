import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsNotEmpty, IsUUID } from "class-validator";

export class GetLastAppointmentDateDto {

    @ApiProperty({
        example: '75277905-5676-41dd-bd26-24d688293c76',
        description: 'Id of the dentist. UUID format',
        type: 'UUID',
    })
    @IsNotEmpty()
    @IsUUID()
    dentist_id: string;

    @ApiProperty({
        example: '75277905-5676-41dd-bd26-24d688293c76',
        description: 'Id of the patient. UUID format',
        type: 'UUID',
    })
    @IsNotEmpty()
    @IsUUID()
    patient_id: string;

}
