import { Type } from "class-transformer";
import { IsBoolean, IsInt } from "class-validator";

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
}