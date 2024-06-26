import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { SystemicBackgroundDto } from './systemicBackground.dto';

export class ClinicalHistoryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  guard_card: string;

  @IsNotEmpty()
  systemicBackground: SystemicBackgroundDto[];
}
