import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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
import { DRoles } from 'src/decorators/roles.decorator';
import { Roles } from 'src/role/enums/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/role/guards/roles.guard';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiBearerAuth()
  @Post('new-preference')
  @DRoles(Roles.ADMIN, Roles.PATIENT)
  @UseGuards(AuthGuard, RolesGuard)
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

  @ApiBearerAuth()
  @Get('payments_by_patient/:patient_id')
  @DRoles(Roles.ADMIN, Roles.ADMINISTRATIVE, Roles.PATIENT)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all payments by patient' })
  @ApiParam({ name: 'patient_id', type: String, description: 'Patient id' })
  @ApiResponse({ status: 200, description: 'Return payments' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Server error.' })
  async getPaymentsByPatient(@Param('patient_id') patient_id: string) {
    return await this.paymentsService.getPaymentsByPatient(patient_id);
  }

  @ApiBearerAuth()
  @Get('by_id/:payment_id')
  @DRoles(Roles.ADMIN, Roles.ADMINISTRATIVE, Roles.PATIENT)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get payment by id' })
  @ApiParam({ name: 'payment_id', type: String, description: 'Payment id' })
  @ApiResponse({ status: 200, description: 'Return payment data' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Server error.' })
  async getPaymentById(@Param('payment_id') payment_id: string) {
    return await this.paymentsService.getPaymentById(payment_id);
  }
}
