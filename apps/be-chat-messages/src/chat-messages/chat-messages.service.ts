import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessageEntity } from '@app/shared/be-chat-messages/entities/chat-message.entity';
import { CreateChatMessageInput } from '@app/shared/be-chat-messages/dto/create-chat-message.input';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';
import { Observable, timeout } from 'rxjs';
import { CreateChatInput } from '@app/shared/be-chats/dto/create-chat.input';

@Injectable()
export class ChatMessagesService implements OnModuleInit {
  constructor(
    @InjectRepository(ChatMessageEntity)
    private chatMessagesRepository: Repository<ChatMessageEntity>,
    @Inject('USERS_SERVICE') private readonly usersClient: ClientKafka,
    @Inject('CHATS_SERVICE') private readonly chatsClient: ClientKafka
  ) {}

  onModuleInit() {
    this.usersClient.subscribeToResponseOf('get-user');
  }

  async findAllChatMessages(): Promise<ChatMessageEntity[]> {
    return await this.chatMessagesRepository.find();
  }

  async createChatMessage(
    createChatMessageInput: CreateChatMessageInput
  ): Promise<ChatMessageEntity> {
    this.chatsClient.emit('create-chat', {
      senderId: createChatMessageInput.senderId,
      receiverId: createChatMessageInput.receiverId,
    } satisfies CreateChatInput);

    const newChat = this.chatMessagesRepository.create(createChatMessageInput);
    return await this.chatMessagesRepository.save(newChat);
  }

  findUserById(userId: number): Observable<UserEntity> {
    return this.usersClient.send('get-user', userId).pipe(timeout(5000));
  }
}
