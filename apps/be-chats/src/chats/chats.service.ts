import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from '@app/shared/be-chats/entities/chat.entity';
import { CreateChatInput } from '@app/shared/be-chats/dto/create-chat.input';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { User } from '@app/shared/be-users/entities/user.entity';
import { Observable } from 'rxjs';

@Injectable()
export class ChatsService implements OnModuleInit {
  constructor(
    @InjectRepository(Chat)
    private chatsRepository: Repository<Chat>,
    @Inject('USERS_SERVICE') private readonly usersClient: ClientKafka
  ) {}

  onModuleInit() {
    this.usersClient.subscribeToResponseOf('get-user');
  }

  async findAllChats(): Promise<Chat[]> {
    return await this.chatsRepository.find();
  }

  @EventPattern('create-chat')
  async createChat(createChatInput: CreateChatInput): Promise<Chat> {
    const chat = await this.chatsRepository.findOneBy({
      senderId: createChatInput.senderId,
      receiverId: createChatInput.receiverId,
    });

    if (chat) throw new BadRequestException('Chat is already exist!');

    const newChat = this.chatsRepository.create(createChatInput);

    return await this.chatsRepository.save(newChat);
  }

  async findUserChats(sender_id: number): Promise<Chat[]> {
    return await this.chatsRepository.findBy({
      senderId: sender_id,
    });
  }

  findUserById(userId: number): Observable<User> {
    return this.usersClient.send('get-user', JSON.stringify(userId));
  }
}
