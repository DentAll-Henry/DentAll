import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class PaymentDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  patient_id: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  appointment_id: string;

  // @IsOptional()
  // @IsNumber()
  // @Min(1)
  // quantity: number;
}
