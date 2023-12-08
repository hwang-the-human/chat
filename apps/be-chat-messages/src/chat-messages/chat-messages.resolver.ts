import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import { ChatMessagesService } from './chat-messages.service';
import { CreateChatMessageInput } from '@app/shared/be-chat-messages/dto/create-chat-message.input';
import { ChatMessageEntity } from '@app/shared/be-chat-messages/entities/chat-message.entity';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';
import { Observable } from 'rxjs';
import { PaginationChatMessagesResponse } from '@app/shared/be-chat-messages/dto/paginate-chat-messages-response';
import { PaginationChatMessageOptionsInput } from '@app/shared/be-chat-messages/dto/paginate-chat-messages.input';

@Resolver(() => ChatMessageEntity)
export class ChatMessagesResolver {
  constructor(private chatMessagesService: ChatMessagesService) {}

  @Query(() => [ChatMessageEntity])
  findAllChatMessages(): Promise<ChatMessageEntity[]> {
    return this.chatMessagesService.findAllChatMessages();
  }

  @Mutation(() => ChatMessageEntity)
  createChatMessage(
    @Args('createChatMessageInput', { type: () => CreateChatMessageInput })
    createChatMessageInput: CreateChatMessageInput
  ): Promise<ChatMessageEntity> {
    return this.chatMessagesService.createChatMessage(createChatMessageInput);
  }

  @Query(() => PaginationChatMessagesResponse)
  findUserChatMessages(
    @Args('senderId', { type: () => Int })
    senderId: number,
    // @Args('receiverId', { type: () => Int })
    // receiverId: number,
    @Args('options', {
      type: () => PaginationChatMessageOptionsInput,
      nullable: true,
    })
    options?: PaginationChatMessageOptionsInput
  ): Promise<PaginationChatMessagesResponse> {
    return this.chatMessagesService.findUserChatMessages(
      senderId,
      // receiverId,
      options
    );
  }

  @ResolveField(() => UserEntity)
  sender(@Parent() chatMessage: ChatMessageEntity): Observable<UserEntity> {
    return this.chatMessagesService.findUserById(chatMessage.senderId);
  }

  @ResolveField(() => UserEntity)
  receiver(@Parent() chatMessage: ChatMessageEntity): Observable<UserEntity> {
    return this.chatMessagesService.findUserById(chatMessage.receiverId);
  }
}
