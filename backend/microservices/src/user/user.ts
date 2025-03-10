import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/database/schemas/user.schema';
import { Exception } from 'src/error/error.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserServices {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel
      .findOne({ emailId: createUserDto.emailId })
      .exec();

    if (!user) {
      const passwordHash = await bcrypt.hash(createUserDto.password, 10);
      const newUser = await new this.userModel({
        ...createUserDto,
        password: passwordHash,
      });
      await newUser.save();
      return newUser.toObject();
    }
    throw new Exception(
      `User with email ${createUserDto.emailId} already exists!`,
    );
  }

  async deleteUser(emailId: string): Promise<{ deleted: boolean }> {
    const user = await this.userModel.deleteOne({ emailId: emailId }).exec();
    if (user.deletedCount === 0) {
      throw new Exception(
        `User with email ${emailId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return { deleted: true };
  }

  async getUser(emailId: string): Promise<User> {
    const user = await this.userModel.findOne({ emailId: emailId }).exec();
    if (user) {
      return user.toObject();
    }
    throw new Exception(
      `User with email ${emailId} does not exist!`,
      HttpStatus.NOT_FOUND,
    );
  }
}
