import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ trim: true, unique: true, index: true })
  userId: true;

  @Prop({ trim: true, required: true })
  firstName: string;

  @Prop({ trim: true })
  lastName: string;

  @Prop({ trim: true, required: true, unique: true, index: true })
  emailId: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
