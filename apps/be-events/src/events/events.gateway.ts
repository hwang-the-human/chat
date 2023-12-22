import { CreateMessageInput } from '@app/shared/be-messages/dto/create-message.input';
import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class EventsGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Connected:', socket.id);
    });
  }

  // @SubscribeMessage('events')
  // onNewMessage(@MessageBody() newMessage: CreateMessageInput) {
  //   console.log('GET!!!!');
  //   this.server.emit('lol', 'HELLLO!');
  // }
}
