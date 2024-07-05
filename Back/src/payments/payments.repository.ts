import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PaymentDto } from './dto/payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/person/entities/patient.entity';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { DentalServ } from 'src/dentalServ/entities/dentalServ.entity';
import { preference } from 'src/config/mercadopago';

@Injectable()
export class PaymentsRepository {
  constructor(
    @InjectRepository(Patient) private patient: Repository<Patient>,
    @InjectRepository(Payment) private payment: Repository<Payment>,
    @InjectRepository(DentalServ) private dentalServ: Repository<DentalServ>,
  ) {}

  async createPreference(data: PaymentDto) {
    try {
      const patient = await this.patient.findOne({
        where: { id: data.patient_id },
      });
      if (!patient)
        throw new BadRequestException(
          'No se encontró un paciente para la id: ' + data.patient_id,
        );
      const service = await this.dentalServ.findOne({
        where: { id: data.dentalServ_id },
      });
      if (!service)
        throw new BadRequestException(
          'No se encontró un servicio para el id: ' + data.dentalServ_id,
        );
      const body = {
        items: [
          {
            id: service.id,
            title: service.name,
            quantity: data.quantity || 1,
            unit_price: Number(service.price),
          },
        ],
        back_urls: {
          // Auto redirect links
          success: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          failure: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          pending: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
        auto_return: 'approved',
      };
      const response = await preference.create({ body });
      console.log(response.id);

      const newPayment = await this.payment.create({
        preference_id: response.id,
        patient: patient,
        dentalServ: service,
      });
      await this.payment.insert(newPayment);
      return { preferenceID: response.id };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }
}
