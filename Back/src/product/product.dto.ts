import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  description: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  stock: number;
}

export class toUpdateProductDto {
  @IsString()
  @IsOptional()
  @MaxLength(80)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(80)
  description: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  price: number;

  @IsNumber()
  @IsOptional()
  stock: number;
}
