import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
    _id: Types.ObjectId;

    @Prop({required: true})
    text: string;
  
    @Prop({required: true, default: Date.now})
    created: Date;
  
    @Prop({required: true, ref: 'User'})
    owner: Types.ObjectId;
  
    @Prop({required: true, ref: 'Room'})
    room: Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);