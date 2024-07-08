import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDateString, IsInt, IsOptional, IsString } from "class-validator";

export class PaginationDto {
    @IsInt()
    @Type(() => Number)
    page: number = 1;

    @IsInt()
    @Type(() => Number)
    limit: number = 10;
}

export class AppointmentPaginationDto extends PaginationDto {
    @IsBoolean()
    @Type(() => Boolean)
    only_future: boolean = false;

    @IsBoolean()
    @Type(() => Boolean)
    only_past: boolean = false;

    @IsOptional()
    @IsDateString()
    start: string;

    @IsOptional()
    @IsDateString()
    end: string;

    @IsOptional()
    @IsString()
    dentists: string;
}