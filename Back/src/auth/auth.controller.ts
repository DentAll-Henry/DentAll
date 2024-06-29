import { Body, Controller, Delete, Param, ParseUUIDPipe, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signIn.dto';
import { CreatePersonDto } from '../person/dtos/createPerson.dto';
import { SignUpInterceptor } from './interceptors/signUp.interceptor';
import { RestoreAuthDto } from './dtos/restoreAuth.dto';
import { UpdatePasswordDto } from './dtos/updatePassword.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: 'Validating credential for signin.' })
  @ApiResponse({ status: 201, description: 'Return the token.', })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid credentials.' })
  signIn(@Body() signInInfo: SignInDto) {
    return this.authService.signIn(signInInfo);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Create user and its credentials. It is important to add confirmPass to the request body.' })
  @ApiResponse({ status: 201, description: 'Return the Auth created.', })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid credentials.' })
  @UseInterceptors(SignUpInterceptor)
  signUp(@Body() userInfo: CreatePersonDto) {
    const { password, ...personInfo } = userInfo;
    const authInfo = { email: userInfo.email, password: userInfo.password };
    return this.authService.signUp(personInfo, authInfo);
  }

  @Delete('email')
  @ApiOperation({ summary: 'Delete a person and itd credentials.' })
  @ApiResponse({ status: 201, description: 'Action confirmed.', })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  async deleteAuth(@Body() email: string) {
    return this.authService.deleteAuth(email);
  }

  @Patch('restore')
  @ApiOperation({ summary: 'Restore person and its credentials.' })
  @ApiResponse({ status: 201, description: 'Return the person restored.', })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  async restoreAuth(@Body() authInfo: RestoreAuthDto) {
    return this.authService.restoreAuth(authInfo);
  }
  
  @Patch('changePassword')
  @ApiOperation({ summary: 'Change the password.' })
  @ApiResponse({ status: 201, description: 'Password updated succesfully.', })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  async changePass(@Body() newPass: UpdatePasswordDto) {
    return this.authService.changePass(newPass);
  }
}
