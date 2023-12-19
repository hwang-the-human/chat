import { Module } from '@nestjs/common';
import { ChatsResolver } from './chats.resolver';
import { ChatsService } from './chats.service';
import { ChatsController } from './chat.controller';

@Module({
  imports: [],
  controllers: [ChatsController],
  providers: [ChatsService, ChatsResolver],
  exports: [ChatsService],
})
export class ChatsModule {}
