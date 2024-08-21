import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signIn.dto';
import { CreatePersonDto } from '../person/dtos/createPerson.dto';
import { ConfirmPassInterceptor } from './interceptors/confirmPass.interceptor';
import { AuthDto } from './dtos/auth.dto';
import { UpdatePasswordDto } from './dtos/updatePassword.dto';
import { UpdatePersonDto } from '../person/dtos/updatePerson.dto';
import { AuthByEmailDto } from './dtos/authByEmail.dto';
import { ChangeRoleDto } from '../auth/dtos/changeRole.dto';
import { Request } from 'express';
import { RolesGuard } from 'src/role/guards/roles.guard';
import { DRoles } from 'src/decorators/roles.decorator';
import { Roles } from 'src/role/enums/roles.enum';
import { AuthGuard } from './guards/auth.guard';
import { CreateDentistPersonDto } from 'src/person/dtos/createDentistPerson.dto';
import { RestorePasswordDto } from './dtos/restorePassword.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @Get()
  @DRoles(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Returns a credential by email.' })
  @ApiResponse({
    status: 201,
    description: 'Returns the credentials eith the specificated email.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  credentialByEmail(@Body() email: AuthByEmailDto) {
    return this.authService.credentialByEmail(email.email);
  }

  @Post('signup')
  @ApiOperation({
    summary:
      'Create user and its credentials. The request body must has confirmPass.',
  })
  @ApiResponse({ status: 201, description: 'Return the Auth created.' })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid credentials.' })
  @UseInterceptors(ConfirmPassInterceptor)
  signUp(@Body() userInfo: CreatePersonDto) {
    const { password, ...personInfo } = userInfo;
    const authInfo = { email: userInfo.email, password: userInfo.password };
    return this.authService.signUp(personInfo, authInfo);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Validating credential for signin.' })
  @ApiResponse({ status: 201, description: 'Return the token.' })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid credentials.' })
  signIn(@Body() signInInfo: SignInDto) {
    return this.authService.signIn(signInInfo);
  }

  @Post('createdentist')
  @ApiOperation({ summary: 'Create a dentist.' })
  @ApiResponse({
    status: 201,
    description: 'Create a dentist.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request.',
  })
  createDentist(@Body() userInfo: CreateDentistPersonDto) {
    const { password, specialtyName, description, ...personInfo } = userInfo;
    const authInfo = { email: userInfo.email, password };
    const dentistInfo = { specialtyName, description };
    return this.authService.createDentist(personInfo, authInfo, dentistInfo);
  }

  @Post('createpatient')
  @ApiOperation({ summary: 'Create a patient.' })
  @ApiResponse({
    status: 201,
    description: 'Create a person with role.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request.',
  })
  createPatient(@Body() userInfo: CreatePersonDto) {
    const { password, ...personInfo } = userInfo;
    const authInfo = { email: userInfo.email, password };
    return this.authService.signUp(personInfo, authInfo);
  }

  @ApiBearerAuth()
  @Post('changerole')
  @DRoles(Roles.PATIENT, Roles.DENTIST, Roles.ADMIN, Roles.ADMINISTRATIVE)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Validating role to change token.' })
  @ApiResponse({ status: 201, description: 'Return the new token.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  changeRole(@Body() changeRoleInfo: ChangeRoleDto) {
    return this.authService.changeRole(changeRoleInfo);
  }

  @Post('request-restore-password')
  @ApiOperation({ summary: 'Reuqest to restore password.' })
  @ApiResponse({ status: 201, description: 'Return the link to restore password.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request.' })
  requestRestorePassword(@Body() email: AuthByEmailDto) {
    return this.authService.requestRestorePassword(email.email);
  }

  @Post('restore-password/:token')
  @ApiOperation({ summary: 'Restore password.' })
  @ApiResponse({ status: 201, description: 'Password restored.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request.' })
  restorePassword(@Param('token') token: string, @Body() newPasswordInfo: RestorePasswordDto) {
    return this.authService.restorePassword(token, newPasswordInfo);
  }

  @ApiBearerAuth()
  @Delete('delete')
  @DRoles(Roles.ADMIN, Roles.DENTIST, Roles.ADMINISTRATIVE, Roles.PATIENT)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary:
      'Delete a person and its credentials. The request body must has confirmPass.',
  })
  @ApiResponse({ status: 201, description: 'Action confirmed.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @UseInterceptors(ConfirmPassInterceptor)
  deleteAuth(@Body() authInfo: AuthDto) {
    return this.authService.deleteAuth(authInfo);
  }

  @Patch('restore')
  @ApiOperation({
    summary:
      'Restore person and its credentials. The request body must has confirmPass.',
  })
  @ApiResponse({ status: 201, description: 'Return the person restored.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @UseInterceptors(ConfirmPassInterceptor)
  restoreAuth(@Body() authInfo: AuthDto) {
    return this.authService.restoreAuth(authInfo);
  }

  @ApiBearerAuth()
  @Patch('changePassword')
  @DRoles(Roles.ADMIN, Roles.DENTIST, Roles.ADMINISTRATIVE, Roles.PATIENT)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Change the password.' })
  @ApiResponse({ status: 201, description: 'Password updated succesfully.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  changePass(@Body() newPass: UpdatePasswordDto) {
    return this.authService.changePass(newPass);
  }

  @ApiBearerAuth()
  @Patch('updateperson')
  @DRoles(Roles.PATIENT, Roles.DENTIST, Roles.ADMINISTRATIVE, Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary:
      'Update person information. The request body must has confirmPass.',
  })
  @ApiResponse({ status: 201, description: 'Information updated succesfully.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  updatePerson(@Req() req: Request, @Body() infoToUpdate: UpdatePersonDto) {
    const role: Roles = (req as any).userRoles;
    return this.authService.updatePerson(role, infoToUpdate);
  }

  @ApiBearerAuth()
  @Patch('changestatus/:idperson')
  @DRoles(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary:
      'Activate or deactivate users.',
  })
  @ApiResponse({ status: 201, description: 'Information updated succesfully.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  changeStatus(@Param('idperson', ParseUUIDPipe) idperson: string) {
    return this.authService.changeStatus(idperson);
  }
}
