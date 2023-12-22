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
import { ChatsService } from '../chats/chats.service';

@Injectable()
export class MessagesService implements OnModuleInit {
  constructor(
    @InjectRepository(MessageEntity)
    private messagesRepository: Repository<MessageEntity>,
    @Inject('USERS_SERVICE') private readonly usersClient: ClientKafka
  ) {}

  onModuleInit() {
    this.usersClient.subscribeToResponseOf('users.get');
  }

  async createMessage(
    createMessageInput: CreateMessageInput
  ): Promise<MessageEntity> {
    const newMessage = this.messagesRepository.create(createMessageInput);
    return await this.messagesRepository.save(newMessage);
  }

  async findMyMessages(
    senderId: string,
    receiverId: string,
    options?: PaginationMessageOptionsInput
  ): Promise<PaginationMessagesResponse> {
    const take = options?.limit || 30;
    const skip = options?.page || 0;

    const [result, total] = await this.messagesRepository.findAndCount({
      where: [
        {
          senderId: senderId,
          receiverId: receiverId,
        },
        {
          senderId: receiverId,
          receiverId: senderId,
        },
      ],
      order: { id: 'DESC' },
      take: take,
      skip: skip,
    });

    return {
      items: result.reverse(),
      totalItems: total,
    };
  }

  findUserById(user_id: string): Observable<UserEntity> {
    return this.usersClient.send('users.get', user_id).pipe(timeout(5000));
  }
}
