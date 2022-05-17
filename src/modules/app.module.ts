import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {RoomModule} from '../modules/room.module';
import { MessageGateway } from '../gateways/event.gateway';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Message, MessageSchema } from '../models/messages.models';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { MessageModule } from './message.module';
import { UserModule } from './user.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    RoomModule,
    UserModule,
    MessageModule,
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [MessageGateway]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .forRoutes('/api');
  }
}