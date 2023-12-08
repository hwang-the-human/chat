import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ChatEntity } from '@app/shared/be-chats/entities/chat.entity';
import { CreateChatInput } from '@app/shared/be-chats/dto/create-chat.input';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';
import { Observable, timeout } from 'rxjs';
import { PaginationChatOptionsInput } from '@app/shared/be-chats/dto/paginate-chats.input';
import { PaginationChatsResponse } from '@app/shared/be-chats/dto/paginate-chats-response';

@Injectable()
export class ChatsService implements OnModuleInit {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatsRepository: Repository<ChatEntity>,
    @Inject('USERS_SERVICE') private readonly usersClient: ClientKafka
  ) {}

  onModuleInit() {
    this.usersClient.subscribeToResponseOf('get-user');
  }

  async findAllChats(): Promise<ChatEntity[]> {
    return await this.chatsRepository.find();
  }

  async findChatById(chatId: number): Promise<ChatEntity> {
    const chat = await this.chatsRepository.findOneBy({ id: chatId });

    if (!chat) throw new NotFoundException('Chat not found');

    return chat;
  }

  async findUserChats(
    senderId: number,
    options?: PaginationChatOptionsInput
  ): Promise<PaginationChatsResponse> {
    const take = options?.limit || 10;
    const skip = options?.page || 0;

    const [result, total] = await this.chatsRepository.findAndCount({
      where: { senderId: senderId },
      // order: { id: 'DESC' },
      take: take,
      skip: skip,
    });

    return {
      items: result,
      totalItems: total,
    };
  }

  async createChat(createChatInput: CreateChatInput): Promise<ChatEntity> {
    const chat = await this.chatsRepository.findOneBy({
      senderId: createChatInput.senderId,
      receiverId: createChatInput.receiverId,
    });

    // if (chat) throw new BadRequestException('Chat is already exist!');
    if (chat) return;

    const newChat = this.chatsRepository.create(createChatInput);

    return await this.chatsRepository.save(newChat);
  }

  findUserById(userId: number): Observable<UserEntity> {
    return this.usersClient.send('get-user', userId).pipe(timeout(5000));
  }
}
