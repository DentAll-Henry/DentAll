import { Body, Controller, Delete, Param, ParseUUIDPipe, Post, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signIn.dto';
import { CreatePersonDto } from '../person/dtos/createPerson.dto';
import { SignUpInterceptor } from './interceptors/signUp.interceptor';

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

  @Delete('id')
  @ApiOperation({ summary: 'Delete a person by ID.' })
  @ApiResponse({ status: 201, description: 'Action confirmed.', })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request.' })
  async deleteAuth(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.deleteAuth(id);
  }
}
