import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from '@app/shared/be-messages/entities/message.entity';
import { CreateMessageInput } from '@app/shared/be-messages/dto/create-message.input';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';
import { Observable, timeout } from 'rxjs';
import { CreateChatInput } from '@app/shared/be-chats/dto/create-chat.input';
import { PaginationMessagesResponse } from '@app/shared/be-messages/dto/paginate-messages-response';
import { PaginationMessageOptionsInput } from '@app/shared/be-messages/dto/paginate-messages.input';

@Injectable()
export class ChatMessagesService implements OnModuleInit {
  constructor(
    @InjectRepository(MessageEntity)
    private chatMessagesRepository: Repository<MessageEntity>,
    @Inject('USERS_SERVICE') private readonly usersClient: ClientKafka,
    @Inject('CHATS_SERVICE') private readonly chatsClient: ClientKafka
  ) {}

  onModuleInit() {
    this.usersClient.subscribeToResponseOf('get-user');
  }

  async findAllChatMessages(): Promise<MessageEntity[]> {
    return await this.chatMessagesRepository.find();
  }

  async createChatMessage(
    CreateMessageInput: CreateMessageInput
  ): Promise<MessageEntity> {
    this.chatsClient.emit('create-chat', {
      senderId: CreateMessageInput.senderId,
      receiverId: CreateMessageInput.receiverId,
    } satisfies CreateChatInput);

    const newChat = this.chatMessagesRepository.create(CreateMessageInput);
    return await this.chatMessagesRepository.save(newChat);
  }

  async findUserChatMessages(
    senderId: number,
    // receiverId: number,
    options?: PaginationMessageOptionsInput
  ): Promise<PaginationMessagesResponse> {
    const take = options?.limit || 10;
    const skip = options?.page || 0;

    const [result, total] = await this.chatMessagesRepository.findAndCount({
      where: [
        {
          senderId: senderId,
        },
        {
          receiverId: senderId,
        },
      ],
      // order: { id: 'DESC' },
      take: take,
      skip: skip,
    });

    return {
      items: result,
      totalItems: total,
    };
  }

  findUserById(userId: number): Observable<UserEntity> {
    return this.usersClient.send('get-user', userId).pipe(timeout(5000));
  }
}
