import { CreateMessageInput } from '@app/shared/be-messages/dto/create-message.input';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessagesService } from '../messages/messages.service';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatMessagesService: MessagesService) {}

  @SubscribeMessage('messages.send')
  onNewMessage(@MessageBody() newMessage: CreateMessageInput) {
    this.chatMessagesService.createMessage(newMessage);
    this.server.emit(`messages.${newMessage.receiverId}`, newMessage);
  }
}
