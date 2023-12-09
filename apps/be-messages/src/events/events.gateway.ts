import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  constructor(
    @Inject('MESSAGES_SERVICE') private readonly messagesClient: ClientKafka
  ) {}

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log('Send to kafka');
    this.messagesClient.emit('messages.id', { message: 'hello bro' });
  }
}
