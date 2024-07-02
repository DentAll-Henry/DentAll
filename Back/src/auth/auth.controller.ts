import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signIn.dto';
import { CreatePersonDto } from '../person/dtos/createPerson.dto';
import { ConfirmPassInterceptor } from './interceptors/confirmPass.interceptor';
import { AuthDto } from './dtos/Auth.dto';
import { UpdatePasswordDto } from './dtos/updatePassword.dto';
import { UpdatePersonDto } from '../person/dtos/updatePerson.dto';
import { AuthByEmailDto } from './dtos/authByEmail.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiOperation({ summary: 'Returns a credential by email.' })
  @ApiResponse({ status: 201, description: 'Returns the credentials eith the specificated email.', })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  credentialByEmail(@Body() email: AuthByEmailDto) {
    return this.authService.credentialByEmail(email.email);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Create user and its credentials. The request body must has confirmPass.' })
  @ApiResponse({ status: 201, description: 'Return the Auth created.', })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid credentials.' })
  @UseInterceptors(ConfirmPassInterceptor)
  signUp(@Body() userInfo: CreatePersonDto) {
    const { password, ...personInfo } = userInfo;
    const authInfo = { email: userInfo.email, password: userInfo.password };
    return this.authService.signUp(personInfo, authInfo);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Validating credential for signin.' })
  @ApiResponse({ status: 201, description: 'Return the token.', })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid credentials.' })
  signIn(@Body() signInInfo: SignInDto) {
    return this.authService.signIn(signInInfo);
  }  

  @Delete('delete')
  @ApiOperation({ summary: 'Delete a person and its credentials. The request body must has confirmPass.' })
  @ApiResponse({ status: 201, description: 'Action confirmed.', })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @UseInterceptors(ConfirmPassInterceptor)
  async deleteAuth(@Body() authInfo: AuthDto) {
    return this.authService.deleteAuth(authInfo);
  }

  @Patch('restore')
  @ApiOperation({ summary: 'Restore person and its credentials. The request body must has confirmPass.' })
  @ApiResponse({ status: 201, description: 'Return the person restored.', })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  @UseInterceptors(ConfirmPassInterceptor)
  async restoreAuth(@Body() authInfo: AuthDto) {
    return this.authService.restoreAuth(authInfo);
  }
  
  @Patch('changePassword')
  @ApiOperation({ summary: 'Change the password.' })
  @ApiResponse({ status: 201, description: 'Password updated succesfully.', })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  async changePass(@Body() newPass: UpdatePasswordDto) {
    return this.authService.changePass(newPass);
  }

  @Patch('updateperson/:idperson')
  @ApiOperation({ summary: 'Update person information.' })
  @ApiResponse({ status: 201, description: 'Onformation updated succesfully.' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  async updatePerson(@Param('id', ParseUUIDPipe) personId: string, @Body() infoToUpdate: UpdatePersonDto) {
    return this.authService.updatePerson(personId, infoToUpdate);
  }
}
