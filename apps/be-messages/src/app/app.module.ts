import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatMessagesModule } from '../messages/messages.module';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [ChatMessagesModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
