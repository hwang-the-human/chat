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
export class MessagesService implements OnModuleInit {
  constructor(
    @InjectRepository(MessageEntity)
    private chatMessagesRepository: Repository<MessageEntity>,
    @Inject('USERS_SERVICE') private readonly usersClient: ClientKafka,
    @Inject('CHATS_SERVICE') private readonly chatsClient: ClientKafka
  ) {}

  onModuleInit() {
    this.usersClient.subscribeToResponseOf('users.get');
  }

  async findAllChatMessages(): Promise<MessageEntity[]> {
    return await this.chatMessagesRepository.find();
  }

  async createChatMessage(
    CreateMessageInput: CreateMessageInput
  ): Promise<MessageEntity> {
    this.chatsClient.emit('chats.create', {
      senderId: CreateMessageInput.senderId,
      receiverId: CreateMessageInput.receiverId,
    } satisfies CreateChatInput);

    const newChat = this.chatMessagesRepository.create(CreateMessageInput);
    return await this.chatMessagesRepository.save(newChat);
  }

  async findUserChatMessages(
    senderId: string,
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

  findUserById(user_id: string): Observable<UserEntity> {
    return this.usersClient.send('users.get', user_id).pipe(timeout(5000));
  }
}
