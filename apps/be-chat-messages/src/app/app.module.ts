import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatMessagesModule } from '../chat-messages/chat-messages.module';

@Module({
  imports: [ChatMessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
