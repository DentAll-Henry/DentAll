import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class DentalRecordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  guard_card: string;
}
