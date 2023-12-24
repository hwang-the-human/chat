import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { MessageEntity } from '@app/shared/be-messages/entities/message.entity';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';
import { Observable } from 'rxjs';
import { PaginationMessagesResponse } from '@app/shared/be-messages/dto/paginate-messages-response';
import { PaginationMessageOptionsInput } from '@app/shared/be-messages/dto/paginate-messages.input';
import { CreateMessageInput } from '@app/shared/be-messages/dto/create-message.input';
import { ClientKafka } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { ChatsService } from '../chats/chats.service';
import { CreateChatInput } from '@app/shared/be-chats/dto/create-chat.input';

@Resolver(() => MessageEntity)
export class MessagesResolver {
  constructor(
    private messagesService: MessagesService,
    private readonly chatsService: ChatsService,
    @Inject('EVENTS_SERVICE') private readonly eventsClient: ClientKafka
  ) {}

  @Query(() => PaginationMessagesResponse)
  findMyMessages(
    @Args('senderId')
    senderId: string,
    @Args('receiverId')
    receiverId: string,
    @Args('options', {
      type: () => PaginationMessageOptionsInput,
      nullable: true,
    })
    options?: PaginationMessageOptionsInput
  ): Promise<PaginationMessagesResponse> {
    return this.messagesService.findMyMessages(senderId, receiverId, options);
  }

  @Mutation(() => MessageEntity)
  async createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput
  ): Promise<MessageEntity> {
    const sender = await this.messagesService
      .findUserById(createMessageInput.senderId)
      .toPromise();

    const receiver = await this.messagesService
      .findUserById(createMessageInput.receiverId)
      .toPromise();

    const chat1 = await this.chatsService.createChat({
      senderId: createMessageInput.senderId,
      receiverId: createMessageInput.receiverId,
    } satisfies CreateChatInput);

    if (chat1) {
      this.eventsClient.emit('events.chats', {
        ...chat1,
        sender: receiver,
        receiver: sender,
      });
    }

    const chat2 = await this.chatsService.createChat({
      senderId: createMessageInput.receiverId,
      receiverId: createMessageInput.senderId,
    } satisfies CreateChatInput);

    if (chat2) {
      this.eventsClient.emit('events.chats', {
        ...chat2,
        sender: sender,
        receiver: receiver,
      });
    }

    const createdMessage = await this.messagesService.createMessage(
      createMessageInput
    );

    this.eventsClient.emit('events.messages', {
      ...createdMessage,
      sender: sender,
      receiver: receiver,
    });

    return createdMessage;
  }

  @ResolveField(() => UserEntity)
  sender(@Parent() chatMessage: MessageEntity): Observable<UserEntity> {
    return this.messagesService.findUserById(chatMessage.senderId);
  }

  @ResolveField(() => UserEntity)
  receiver(@Parent() chatMessage: MessageEntity): Observable<UserEntity> {
    return this.messagesService.findUserById(chatMessage.receiverId);
  }
}
