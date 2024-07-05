import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { PaymentsService } from './payments.service';
import { PaymentDto } from './dto/payment.dto';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('new-preference')
  @ApiOperation({ summary: 'Create a new preference' })
  @ApiBody({ type: PaymentDto })
  @ApiResponse({ status: 201, description: 'Return preference id' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Server error.' })
  async createDentalServ(@Body() data: PaymentDto, @Res() res: Response) {
    const preferenceID = await this.paymentsService.createPreference(data);
    res.status(201).json({ preferenceID });
  }
}
