import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID, IsString, IsOptional, IsEmpty } from "class-validator";
import { IsNull } from "typeorm";

export class CreateAppointmentDto {

    @ApiProperty({
        example: '75277905-5676-41dd-bd26-24d688293c76',
        description: 'Id of the dentist to be assigned. UUID format',
        type: 'UUID',
    })
    @IsNotEmpty()
    @IsUUID()
    dentist_id: string;

    @ApiProperty({
        example: '62a3bd93-1c50-436a-9644-cd314cf71623',
        description: 'Id of the patient to be consulted. UUID format',
        type: 'UUID',
    })
    @IsNotEmpty()
    @IsUUID()
    patient: string;

    @ApiProperty({
        example: '514f20e6-ac09-4d90-99c4-26a5fa0cbaa2',
        description: 'Id of the service to be performed. UUID format',
        type: 'UUID',
    })
    @IsNotEmpty()
    @IsUUID()
    service: string;

    @ApiProperty({
        example: '2022-06-06 14:00',
        description: 'Date of the appointment',
        format: 'YYYY-MM-DD HH:mm',
    })
    @IsNotEmpty({ message: 'Date is required' })
    date_time: Date;

    @ApiProperty({
        description: 'Any considerations that the dentist should have. Optional, otherwise, send an empty string',
        example: 'Many teeth are missing',

    })
    @IsString()
    description: string;

    @ApiProperty({
        example: '62a3bd93-1c50-436a-9644-cd314cf71623',
        description: 'Provide this field if this appointment will be created from a dentist request. UUID format',
        type: 'UUID',
    })
    @IsOptional()
    @IsUUID()
    pending_appointment_id?: string;

    @IsOptional()
    expiration_date: Date | null;
}
