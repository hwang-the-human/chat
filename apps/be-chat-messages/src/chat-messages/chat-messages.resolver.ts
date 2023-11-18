import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ChatMessagesService } from './chat-messages.service';
import { CreateChatMessageInput } from '@app/shared/be-chat-messages/dto/create-chat-message.input';
import { ChatMessageEntity } from '@app/shared/be-chat-messages/entities/chat-message.entity';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';
import { Observable } from 'rxjs';

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

  @ResolveField(() => UserEntity)
  sender(@Parent() chatMessage: ChatMessageEntity): Observable<UserEntity> {
    return this.chatMessagesService.findUserById(chatMessage.senderId);
  }

  @ResolveField(() => UserEntity)
  receiver(@Parent() chatMessage: ChatMessageEntity): Observable<UserEntity> {
    return this.chatMessagesService.findUserById(chatMessage.receiverId);
  }
}
