import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';
import { Message } from './messages.models';
import { Room } from './rooms.models';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({
    required: true,
    maxlength: 20,
    minlength: 5,
    unique: true, // <1>
  })
  nickname: string;

  @Prop({required: true})
  password: string; // <2>

  @Prop()
  loggedIn: boolean; // <3>
  @Prop({type: Types.Array, ref: 'Users'})

  messages: Types.Array<Message>;

  joinedRooms:Types.Array<Room>;
}

export const UserSchema = SchemaFactory.createForClass(User);