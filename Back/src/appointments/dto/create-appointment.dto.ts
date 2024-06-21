import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsUUID()
  dentist_id: string;

  @IsNotEmpty()
  @IsUUID()
  patient: string;

  @IsNotEmpty()
  @IsUUID()
  service: string;

  @IsNotEmpty({ message: 'Date is required' })
  date_time: Date;

  @IsString()
  description: string;
}
