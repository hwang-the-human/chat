import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';
import { EventsGateway } from './events.gateway';

@Controller()
export class EventsController {
  constructor(private readonly eventsGateway: EventsGateway) {}

  @EventPattern('messages.id')
  sendNewMessage(@Payload() body: any, @Ctx() context: KafkaContext) {
    console.log('Receive from kafka:');
    // console.log('Receive from kafka:', body, context);
    this.eventsGateway.server.emit('id', { message: 'Return back' });
    // 1) Save message to db
    // 2) if user online send message to user
    // 3) if user offline send PN
  }
}
