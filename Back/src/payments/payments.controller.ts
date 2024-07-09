import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response, Request } from 'express';
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
  async createDentalServ(
    @Body() data: PaymentDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const preferenceId = await this.paymentsService.createPreference(
      data,
      baseUrl,
    );
    res.status(201).json(preferenceId);
  }

  @Post('/success/')
  @ApiOperation({ summary: 'Indicate payment success' })
  @ApiParam({ name: 'id', type: String, description: 'Preference id' })
  @ApiResponse({ status: 200, description: 'Return success' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Server error.' })
  async success(
    @Query('id') id: string,
    @Query('data.id') id2: string,
    @Query('patient_id') patient_id: string,
    @Query('dentalServ_id') dentalServ_id: string,
    @Query('appointment_id') appointment_id: string,
    @Body() data: any,
    @Res() res: Response,
  ) {
    const body = {
      id,
      id2,
      data,
      patient_id,
      dentalServ_id,
      appointment_id,
    };
    const dsad = await this.paymentsService.success(body);
    res.send(dsad);
  }

  // @Get('/failure/:id')
  // @ApiOperation({ summary: 'Indicate payment failure' })
  // @ApiParam({ name: 'id', type: String, description: 'Preference id' })
  // @ApiResponse({ status: 200, description: 'Return failure' })
  // @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  // @ApiInternalServerErrorResponse({ status: 500, description: 'Server error.' })
  // async failure(
  //   @Query('collection_id') collection_id: string,
  //   @Query('collection_status') collection_status: string,
  //   @Query('payment_id') payment_id: string,
  //   @Query('status') status: string,
  //   @Query('external_reference') external_reference: string,
  //   @Query('payment_type') payment_type: string,
  //   @Query('merchant_order_id') merchant_order_id: string,
  //   @Query('preference_id') preference_id: string,
  //   @Query('site_id') site_id: string,
  //   @Query('processing_mode') processing_mode: string,
  //   @Query('merchant_account_id') merchant_account_id: string,
  //   @Res() res: Response,
  // ) {
  //   const data = {
  //     collection_id,
  //     collection_status,
  //     payment_id,
  //     status,
  //     external_reference,
  //     payment_type,
  //     merchant_order_id,
  //     preference_id,
  //     site_id,
  //     processing_mode,
  //     merchant_account_id,
  //   };
  //   await this.paymentsService.failure(data);
  //   res.send('Failure');
  // }
}
