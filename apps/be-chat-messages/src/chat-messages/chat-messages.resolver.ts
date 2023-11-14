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
import { ChatMessage } from '@app/shared/be-chat-messages/entities/chat-message.entity';
import { User } from '@app/shared/be-users/entities/user.entity';
import { Observable } from 'rxjs';

@Resolver(() => ChatMessage)
export class ChatMessagesResolver {
  constructor(private chatMessagesService: ChatMessagesService) {}

  @Query(() => [ChatMessage])
  findAllChatMessages(): Promise<ChatMessage[]> {
    return this.chatMessagesService.findAllChatMessages();
  }

  @Mutation(() => ChatMessage)
  createChatMessage(
    @Args('createChatMessageInput')
    createChatMessageInput: CreateChatMessageInput
  ): Promise<ChatMessage> {
    return this.chatMessagesService.createChatMessage(createChatMessageInput);
  }

  @ResolveField(() => User)
  sender(@Parent() chatMessage: ChatMessage): Observable<User> {
    return this.chatMessagesService.findUserById(chatMessage.senderId);
  }

  @ResolveField(() => User)
  receiver(@Parent() chatMessage: ChatMessage): Observable<User> {
    return this.chatMessagesService.findUserById(chatMessage.receiverId);
  }
}
