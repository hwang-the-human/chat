import { CreateMessageInput } from '@app/shared/be-messages/dto/create-message.input';
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

  @SubscribeMessage('messages.send')
  onNewMessage(@MessageBody() newMessage: CreateMessageInput) {
    this.messagesClient.emit(`messages`, newMessage);
  }
}
