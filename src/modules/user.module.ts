import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { User, UserSchema } from '../models/users.model';
import { Message, MessageSchema } from '../models/messages.models';
import { AuthController } from '../controllers/auth/auth.controller';
import { Room, RoomSchema } from '../models/rooms.models';
import { AppGateway } from '../gateways/app.gateway';
import {RoomModule} from '../modules/room.module';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { UserService } from '../services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [UserService],
  controllers: [AuthController],
  exports: [UserService] 
})
export class UserModule {}