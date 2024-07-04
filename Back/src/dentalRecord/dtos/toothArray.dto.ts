import { Type } from 'class-transformer';
import { ToothInfoDto } from './toothInfo.dto';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class ToothArray {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ToothInfoDto)
  @ValidateNested({ each: true })
  data: ToothInfoDto[];
}
