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
import { CreateMessageInput } from '@app/shared/be-messages/dto/create-message.input';
import { MessageEntity } from '@app/shared/be-messages/entities/message.entity';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';
import { Observable } from 'rxjs';
import { PaginationMessagesResponse } from '@app/shared/be-messages/dto/paginate-messages-response';
import { PaginationMessageOptionsInput } from '@app/shared/be-messages/dto/paginate-messages.input';

@Resolver(() => MessageEntity)
export class ChatMessagesResolver {
  constructor(private chatMessagesService: ChatMessagesService) {}

  @Query(() => [MessageEntity])
  findAllChatMessages(): Promise<MessageEntity[]> {
    return this.chatMessagesService.findAllChatMessages();
  }

  @Mutation(() => MessageEntity)
  createChatMessage(
    @Args('CreateMessageInput', { type: () => CreateMessageInput })
    CreateMessageInput: CreateMessageInput
  ): Promise<MessageEntity> {
    return this.chatMessagesService.createChatMessage(CreateMessageInput);
  }

  @Query(() => PaginationMessagesResponse)
  findUserChatMessages(
    @Args('senderId', { type: () => Int })
    senderId: number,
    // @Args('receiverId', { type: () => Int })
    // receiverId: number,
    @Args('options', {
      type: () => PaginationMessageOptionsInput,
      nullable: true,
    })
    options?: PaginationMessageOptionsInput
  ): Promise<PaginationMessagesResponse> {
    return this.chatMessagesService.findUserChatMessages(
      senderId,
      // receiverId,
      options
    );
  }

  @ResolveField(() => UserEntity)
  sender(@Parent() chatMessage: MessageEntity): Observable<UserEntity> {
    return this.chatMessagesService.findUserById(chatMessage.senderId);
  }

  @ResolveField(() => UserEntity)
  receiver(@Parent() chatMessage: MessageEntity): Observable<UserEntity> {
    return this.chatMessagesService.findUserById(chatMessage.receiverId);
  }
}
