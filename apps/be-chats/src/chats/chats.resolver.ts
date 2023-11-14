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
import { CreateChatInput } from './dto/create-chat.input';
import { Chat } from '@app/shared/entities/chat.entity';
import { User } from '@app/shared/entities/user.entity';

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
  sender(@Parent() chat: Chat) {
    return this.chatsService.findUserById(chat.senderId);
  }

  @ResolveField(() => User)
  receiver(@Parent() chat: Chat) {
    return this.chatsService.findUserById(chat.receiverId);
  }
}
