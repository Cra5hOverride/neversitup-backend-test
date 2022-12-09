import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;
@Schema({
  timestamps: true,
})
export class User {

  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop({ unique: true })
  email: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
