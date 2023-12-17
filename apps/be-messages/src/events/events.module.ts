import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsController } from './events.controller';

@Module({
  imports: [],
  controllers: [EventsController],
  providers: [EventsGateway],
})
export class EventsModule {}
