import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import {RoomModule} from '../modules/room.module';
import {MessageGateway} from '../gateways/event.gateway';


@Module({
    imports: [
        RoomModule,
        UserModule,
    ],
    providers: [MessageGateway],
    exports: [MessageGateway]
  })
  export class EventsModule {}
