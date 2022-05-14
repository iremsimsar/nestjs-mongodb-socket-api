import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../models/users.model';
import { Room } from './rooms.models';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
    _id: Types.ObjectId | string;

    @Prop({required: true})
    text: string;
  
    @Prop({required: true})
    created: Date;
  
    @Prop({required: true, ref: 'User'})
    owner: User | string | any;
  
    @Prop({required: true, ref: 'Room'})
    room: Room | string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);