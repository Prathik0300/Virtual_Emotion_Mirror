import { Module } from '@nestjs/common';
import { UserServices } from './user';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/database/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserServices],
  controllers: [UserController],
  exports: [UserServices, MongooseModule],
})
export class UserModule {}
