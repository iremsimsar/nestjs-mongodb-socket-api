import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from '../models/rooms.models';
import { RoomController } from '../controllers/room/room.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { UserService } from '../services/user.service';
import { UserModule } from './user.module';
import { RoomService } from '../services/room.service';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
    ])
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule{}