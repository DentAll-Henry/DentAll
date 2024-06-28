import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID, IsString } from "class-validator";

export class CreatePendingAppointmentDto {

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
        description: 'Any considerations that the patients should have. Optional, otherwise, send an empty string',
        example: 'Must bring a toothbrush, a toothpaste, and some soap',
    })
    @IsString()
    description: string;

}
