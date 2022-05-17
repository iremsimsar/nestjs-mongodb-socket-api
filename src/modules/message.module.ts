import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {RoomModule} from '../modules/room.module';
import { Message, MessageSchema } from '../models/messages.models';
import { UserModule } from './user.module';
import { MessageService } from '../services/message.service';
import { MessageController } from '../controllers/messages/messages.controller';
import { EventsModule } from './event.module';

@Module({
  imports: [
    RoomModule,
    UserModule,
    EventsModule,
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}