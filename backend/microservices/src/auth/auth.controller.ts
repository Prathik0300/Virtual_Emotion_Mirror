import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserLoginDto, UserSignupDto } from './dto/auth.dto';
import { AuthService } from './auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async userSignup(@Body(new ValidationPipe()) userSignupDto: UserSignupDto) {
    return await this.authService.userSignup(userSignupDto);
  }

  @Post('/login')
  @HttpCode(200)
  async userLogin(@Body(new ValidationPipe()) userLoginDto: UserLoginDto) {
    return await this.authService.userLogin(userLoginDto);
  }
}
