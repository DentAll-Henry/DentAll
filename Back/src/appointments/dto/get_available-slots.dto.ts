import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsNotEmpty, IsUUID } from "class-validator";

export class GetAvailableSlotsDto {

    @ApiProperty({
        example: '75277905-5676-41dd-bd26-24d688293c76',
        description: 'Id of the dentist to be assigned. UUID format',
        type: 'UUID',
    })
    @IsNotEmpty()
    @IsUUID()
    dentist_id: string;

    @ApiProperty({
        example: '2026-06-16',
        description: 'Date to check available slots',
        format: 'YYYY-MM-DD',
    })
    @IsNotEmpty({ message: 'Date is required' })
    @IsDateString()
    date: Date;

}
