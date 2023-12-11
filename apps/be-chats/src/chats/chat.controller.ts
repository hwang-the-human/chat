import { Controller, Get } from '@nestjs/common';

import { ChatsService } from './chats.service';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { CreateChatInput } from '@app/shared/be-chats/dto/create-chat.input';

@Controller()
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @EventPattern('chats.create')
  async createChat(createChatInput: CreateChatInput) {
    return await this.chatsService.createChat(createChatInput);
  }
}
