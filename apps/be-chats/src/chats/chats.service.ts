import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { CreateChatInput } from './dto/create-chat.input';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatsRepository: Repository<Chat>
  ) {}

  async createChat(createChatInput: CreateChatInput): Promise<Chat> {
    const chat = await this.chatsRepository.findOneBy({
      sender_id: createChatInput.sender_id,
      receiver_id: createChatInput.receiver_id,
    });

    if (chat) throw new BadRequestException('Chat is already exist!');

    const newChat = this.chatsRepository.create(createChatInput);

    return await this.chatsRepository.save(newChat);
  }

  async findUserChats(sender_id: number): Promise<Chat[]> {
    return await this.chatsRepository.findBy({
      sender_id: sender_id,
    });
  }
}
