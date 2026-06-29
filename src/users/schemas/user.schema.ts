import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ unique: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  })
  role: string;

  @Prop()
  isEmailVerified: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: User;
}

export const UserSchema = SchemaFactory.createForClass(User);
