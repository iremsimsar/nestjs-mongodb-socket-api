import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {RoomModule} from '../modules/room.module';
import { AppGateway } from '../gateways/app.gateway';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Message, MessageSchema } from '../models/messages.models';
import { AuthMiddleware } from '../middleware/auth.middleware';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    RoomModule,
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [AppGateway]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .forRoutes('/api');
  }
}