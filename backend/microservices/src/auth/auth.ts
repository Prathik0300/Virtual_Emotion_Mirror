import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/database/schemas/user.schema';
import { UserLoginDto, UserSignupDto } from './dto/auth.dto';
import { UserServices } from 'src/user/user';
import { Exception } from 'src/error/error.service';

@Injectable()
export class AuthService {
  constructor(private readonly userServices: UserServices) {}

  async userSignup(userSignupDto: UserSignupDto): Promise<User> {
    try {
      const newUser = await this.userServices.createUser(userSignupDto);
      if (newUser) {
        return newUser;
      }
      throw new Exception(
        `User with email ${userSignupDto.emailId} already exists!`,
      );
    } catch (error) {
      throw new Exception(
        error?.response?.message,
        error?.response?.statusCode,
      );
    }
  }

  async userLogin(userLoginDto: UserLoginDto): Promise<User> {
    try {
      const user = await this.userServices.getUser(userLoginDto.emailId);
      if (user) {
        if (user.password === userLoginDto.password) {
          return user;
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
