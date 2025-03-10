import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { UserLoginDto, UserSignupDto } from './dto/auth.dto';
import { AuthService } from './auth';
import { JwtAuthService } from 'src/jwt/jwt-service';
import { Response } from 'express';
import * as cookie from 'cookie';
import { Exception } from 'src/error/error.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  @Post('/authenticate')
  async authenticateUser(
    @Body(new ValidationPipe()) userData: any,
    @Res() response: Response,
  ) {
    try {
      const access_token = this.jwtAuthService.createJwt({ email: userData });
      response.setHeader(
        'Set-Cookie',
        cookie.serialize('access_token', access_token, {
          secure: false,
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
          sameSite: 'lax',
          domain:
            process.env.NODE_ENV === 'production' ? 'example.com' : 'localhost',
        }),
      );
      return response.json({});
    } catch {
      throw new Exception();
    }
  }

  @Post('/signup')
  async userSignup(
    @Body(new ValidationPipe()) userSignupDto: UserSignupDto,
    @Res() response: Response,
  ) {
    try {
      const user = await this.authService.userSignup(userSignupDto);
      return response.json({ ...user });
    } catch (error) {
      return response.json({ ...error, success: false });
    }
  }

  @Post('/login')
  @HttpCode(200)
  async userLogin(
    @Body(new ValidationPipe()) userLoginDto: UserLoginDto,
    @Res() response: Response,
  ) {
    try {
      const user = await this.authService.userLogin(userLoginDto);
      const access_token = await this.jwtAuthService.createJwt({
        email: userLoginDto.emailId,
      });

      response.setHeader(
        'Set-Cookie',
        cookie.serialize('access_token', access_token, {
          secure: false,
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        }),
      );
      return response.json({ ...user });
    } catch (error) {
      return response.json({ ...error, success: false });
    }
  }
}
