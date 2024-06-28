import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signIn.dto';
import { CreatePersonDto } from '../person/dtos/createPerson.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('singin')
  @ApiOperation({ summary: 'Validating credential for signin.' })
  @ApiResponse({ status: 201, description: 'Return the token.', })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid credentials.' })
  signIn(@Body() signInInfo: SignInDto) {
    return this.authService.signIn(signInInfo);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Creating an user and its credentials.' })
  @ApiResponse({ status: 201, description: 'Return the Auth created.', })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid credentials.' })
  signUp(@Body() userInfo: CreatePersonDto) {
    const { password, ...personInfo } = userInfo;
    const authInfo = { email: userInfo.email, password: userInfo.password };
    return this.authService.signUp(personInfo, authInfo);
  }
}
