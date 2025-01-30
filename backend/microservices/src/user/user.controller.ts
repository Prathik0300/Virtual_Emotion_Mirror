import {
  Body,
  Controller,
  ValidationPipe,
  Post,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserServices } from './user';

@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserServices) {}

  @Post('/create')
  async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return await this.userServices.createUser(createUserDto);
  }

  @Get(':email')
  async getUser(@Param() emailId: string) {
    return await this.userServices.getUser(emailId);
  }

  @Delete(':email')
  async deleteUser(@Param() emailId: string) {
    return await this.userServices.deleteUser(emailId);
  }
}
