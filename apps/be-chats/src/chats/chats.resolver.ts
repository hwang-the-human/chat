import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ChatsService } from './chats.service';
import { CreateChatInput } from '@app/shared/be-chats/dto/create-chat.input';
import { Chat } from '@app/shared/be-chats/entities/chat.entity';
import { User } from '@app/shared/be-users/entities/user.entity';
import { Observable } from 'rxjs';

@Resolver(() => Chat)
export class ChatsResolver {
  constructor(private chatsService: ChatsService) {}

  @Query(() => [Chat])
  findAllChats(): Promise<Chat[]> {
    return this.chatsService.findAllChats();
  }

  @Query(() => [Chat])
  findUserChats(
    @Args('sender_id', { type: () => Int }) sender_id: number
  ): Promise<Chat[]> {
    return this.chatsService.findUserChats(sender_id);
  }

  @Mutation(() => Chat)
  createChat(
    @Args('createChatInput') createChatInput: CreateChatInput
  ): Promise<Chat> {
    return this.chatsService.createChat(createChatInput);
  }

  @ResolveField(() => User)
  sender(@Parent() chat: Chat): Observable<User> {
    return this.chatsService.findUserById(chat.senderId);
  }

  @ResolveField(() => User)
  receiver(@Parent() chat: Chat): Observable<User> {
    return this.chatsService.findUserById(chat.receiverId);
  }
}
