import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UpdateSystemConfigDto } from '../dto/update-system_config.dto';


@Injectable()
export class ValidateSystemConfigPipe implements PipeTransform {
  transform(value: UpdateSystemConfigDto[]): UpdateSystemConfigDto[] {
    for (const dto of value) {

      const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (dto.slug_name === 'open_time') {
        if (typeof dto.value !== 'string' || !timeRegex.test(dto.value)) {
          throw new BadRequestException(`'open_time' debe ser de tipo string representando una hora en formato HH:mm.`);
        }
      } else if (dto.slug_name === 'close_time') {
        if (typeof dto.value !== 'string' || !timeRegex.test(dto.value)) {
          throw new BadRequestException(`'close_time' debe ser de tipo string representando una hora en formato HH:mm.`);
        }
      } else if (dto.slug_name === 'appointment_duration') {
        if (isNaN(parseInt(dto.value)) || parseInt(dto.value) <= 0) {
          throw new BadRequestException(`'appointment_duration' debe ser un numero mayor a 0 representando la duración en minutos de una cita.`);
        }
      } else if (dto.slug_name === 'email') {
        if (typeof dto.value !== 'string' || !emailRegex.test(dto.value)) {
          throw new BadRequestException(`'email' debe ser de tipo string representando un email valido.`);
        }
      }
    }
    return value;
  }
}
