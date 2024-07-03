import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ToothInfoDto } from './toothInfo.dto';

export class dsads {
  @ValidateNested({ each: true })
  @Type(() => ToothInfoDto)
  toothInfoDto: ToothInfoDto[];
}
