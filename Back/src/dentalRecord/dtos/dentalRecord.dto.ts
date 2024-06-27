import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator';
import { Deseases } from '../entities/deseases.entity';

export class DentalRecordDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 25)
  health_Insurance: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  patient_id: string;

  @IsString()
  @MaxLength(150)
  observations: string;

  @IsArray()
  @IsString({ each: true })
  deseases: Deseases[];

  @IsString()
  @MaxLength(50)
  medication: string;
}
