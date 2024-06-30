import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class specialtyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  services: specialityDentalServDto[];
}

export class specialityDentalServDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class updateSpecialtyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  services?: specialityDentalServDto[];
}
