import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { User, UserSchema } from '../models/users.model';
import { Message, MessageSchema } from '../models/messages.models';
import { AuthController } from '../controllers/auth/auth.controller';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {name: Message.name, schema: MessageSchema},

    ])
    ],
      controllers: [AppController, AuthController],
      providers: [AppService]
})
export class AppModule { }