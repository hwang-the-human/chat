import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';
import { EventsGateway } from './events.gateway';
import { CreateMessageInput } from '@app/shared/be-messages/dto/create-message.input';

@Controller()
export class EventsController {
  constructor(private readonly eventsGateway: EventsGateway) {}

  @EventPattern('messages')
  sendNewMessage(
    @Payload() newMessage: CreateMessageInput,
    @Ctx() context: KafkaContext
  ) {
    this.eventsGateway.server.emit(
      `messages.${newMessage.receiverId}`,
      newMessage
    );
    // 1) Save message to db
    // 2) if user online send message to user
    // 3) if user offline send PN
  }
}
