import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';
import { EventsGateway } from './events.gateway';
import { CreateMessageInput } from '@app/shared/be-messages/dto/create-message.input';
import { MessageEntity } from '@app/shared/be-messages/entities/message.entity';
import { ChatEntity } from '@app/shared/be-chats/entities/chat.entity';

@Controller()
export class EventsController {
  constructor(private readonly eventsGateway: EventsGateway) {}

  @EventPattern('events.chats')
  handleChatEvents(data: ChatEntity) {
    this.eventsGateway.server.emit(`events.chats.${data.receiverId}`, data);
  }

  @EventPattern('events.messages')
  handleMessageEvents(data: MessageEntity) {
    this.eventsGateway.server.emit(`events.messages.${data.receiverId}`, data);
  }
}
