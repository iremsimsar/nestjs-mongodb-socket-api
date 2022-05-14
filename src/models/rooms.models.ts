import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';
import { User } from '../models/users.model';
import { Message } from './messages.models';

export type RoomDocument = Room & Document;
@Schema()
export class Room {
    _id: Types.ObjectId;

    @Prop({required: true, maxlength: 20, minlength: 5})
    name: string;
    
    @Prop({type: Types.Array, ref: 'Messages'})
    messages: Types.Array<Message>

    @Prop({type: Types.Array, ref: 'Users'})
    connectedUsers: Types.Array<User>;
}

export const UserSchema = SchemaFactory.createForClass(Room);