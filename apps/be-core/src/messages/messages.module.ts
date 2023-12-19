import { Module } from '@nestjs/common';
import { MessagesResolver } from './messages.resolver';
import { MessagesService } from './messages.service';
import { ChatsModule } from '../chats/chats.module';

@Module({
  imports: [ChatsModule],
  controllers: [],
  providers: [MessagesService, MessagesResolver],
})
export class MessagesModule {}
