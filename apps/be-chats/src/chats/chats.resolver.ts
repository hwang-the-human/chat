import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChatsService } from './chats.service';
import { CreateChatInput } from './dto/create-chat.input';
import { Chat } from '@app/shared/entities/chat.entity';

@Resolver(() => Chat)
export class ChatsResolver {
  constructor(private chatsService: ChatsService) {}

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
}
