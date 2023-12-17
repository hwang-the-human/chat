import { Module } from '@nestjs/common';
import { MessagesResolver } from './messages.resolver';
import { MessagesService } from './messages.service';

@Module({
  imports: [],
  controllers: [],
  providers: [MessagesService, MessagesResolver],
})
export class MessagesModule {}
