import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from '@app/shared/be-chat-messages/entities/chat-message.entity';
import { CreateChatMessageInput } from '@app/shared/be-chat-messages/dto/create-chat-message.input';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { User } from '@app/shared/be-users/entities/user.entity';
import { Observable } from 'rxjs';

@Injectable()
export class ChatMessagesService implements OnModuleInit {
  constructor(
    @InjectRepository(ChatMessage)
    private chatMessagesRepository: Repository<ChatMessage>,
    @Inject('USERS_SERVICE') private readonly usersClient: ClientKafka
    @Inject('CHATS_SERVICE') private readonly chatsClient: ClientKafka
  ) {}

  onModuleInit() {
    this.usersClient.subscribeToResponseOf('get-user');
  }

  async findAllChatMessages(): Promise<ChatMessage[]> {
    return await this.chatMessagesRepository.find();
  }

  async createChatMessage(
    createChatMessageInput: CreateChatMessageInput
  ): Promise<ChatMessage> {
    this.chatsClient.emit("create-chat", "");
    const newChat = this.chatMessagesRepository.create(createChatMessageInput);
    return await this.chatMessagesRepository.save(newChat);
  }

  findUserById(userId: number): Observable<User> {
    return this.usersClient.send('get-user', JSON.stringify(userId));
  }
}
