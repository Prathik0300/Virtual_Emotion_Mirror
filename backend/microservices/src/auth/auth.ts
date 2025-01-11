import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/database/schemas/user.schema';
import {
  UserLoginDto,
  UserAuthResponseDto,
  UserSignupDto,
} from './dto/auth.dto';
import { plainToClass } from 'class-transformer';
import { UserServices } from 'src/user/user';
import { Exception } from 'src/error/error.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userServices: UserServices) {}

  async userSignup(userSignupDto: UserSignupDto): Promise<UserAuthResponseDto> {
    try {
      const newUser = await this.userServices.createUser(userSignupDto);
      if (newUser) {
        const transformedUser = plainToClass(UserAuthResponseDto, {
          ...newUser,
          success: true,
        });
        return transformedUser;
      }
      throw new Exception(
        `User with email ${userSignupDto.emailId} already exists!`,
      );
    } catch (error) {
      console.log({ error });
      throw new Exception(
        error?.response?.message,
        error?.response?.statusCode,
      );
    }
  }

  async userLogin(userLoginDto: UserLoginDto): Promise<UserAuthResponseDto> {
    try {
      const user = await this.userServices.getUser(userLoginDto.emailId);
      if (user) {
        const isValidPassword = await bcrypt.compare(
          userLoginDto.password,
          user.password,
        );
        console.log({ isValidPassword });
        if (isValidPassword) {
          const transformedUser = plainToClass(UserAuthResponseDto, {
            ...user,
            success: true,
          });
          return transformedUser;
        }

        throw new Exception(
          `Invalid email id or password`,
          HttpStatus.UNAUTHORIZED,
        );
      }
      throw new Exception(
        `User with email ${userLoginDto.emailId} does not exist!`,
        HttpStatus.NOT_FOUND,
      );
    } catch (error) {
      throw new Exception(
        error?.response?.message,
        error?.response?.statusCode,
      );
    }
  }
}
