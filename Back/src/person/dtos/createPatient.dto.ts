import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsUUID
} from 'class-validator';

export class CreatePatientDto {
    @ApiProperty({
        example: '514f20e6-ac09-4d90-99c4-26a5fa0cbaa2',
        description: 'Id of the person to be added as a patient. UUID format',
        type: 'UUID',
    })
    @IsNotEmpty()
    @IsUUID()
    person_id: string;

    @ApiProperty({
        example: '514f20e6-ac09-4d90-99c4-26a5fa0cbaa2',
        description: 'Id of the dental record to be linked to the patient. UUID format',
        type: 'UUID',
    })
    @IsNotEmpty()
    @IsUUID()
    dental_record_id?: string;
}
