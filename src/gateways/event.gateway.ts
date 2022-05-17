import { UserService } from '../services/user.service';

import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private userService: UserService) { }
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    client.emit('disconnect', {
      user_id: client.id,
    });
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    try {
      const decoded = await this.userService.verify(client?.handshake?.query?.token)
      this.logger.log(`Client connected: ${client.id}`);

      const user = this.userService.findById(decoded._id)

      if(!user) throw new Error('User not found')

      client.emit('authenticated', { decoded })

    } catch (error) {
      console.log("not authenticated", error);
      client.disconnect();
    }
  }
}