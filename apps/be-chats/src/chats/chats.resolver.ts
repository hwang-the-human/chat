import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  ResolveReference,
} from '@nestjs/graphql';
import { ChatsService } from './chats.service';
import { CreateChatInput } from '@app/shared/be-chats/dto/create-chat.input';
import { ChatEntity } from '@app/shared/be-chats/entities/chat.entity';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';
import { Observable } from 'rxjs';
import { PaginationChatOptionsInput } from '@app/shared/be-chats/dto/paginate-chats.input';
import { PaginationChatResponse } from '@app/shared/be-chats/dto/paginate-chats-response';

@Resolver(() => ChatEntity)
export class ChatsResolver {
  constructor(private chatsService: ChatsService) {}

  @Query(() => [ChatEntity])
  findAllChats(): Promise<ChatEntity[]> {
    return this.chatsService.findAllChats();
  }

  @Query(() => PaginationChatResponse)
  findUserChats(
    @Args('senderId', { type: () => Int })
    senderId: number,
    @Args('options', { type: () => PaginationChatOptionsInput })
    options: PaginationChatOptionsInput
  ): Promise<PaginationChatResponse> {
    return this.chatsService.findUserChats(senderId, options);
  }

  @Mutation(() => ChatEntity)
  createChat(
    @Args('createChatInput', { type: () => CreateChatInput })
    createChatInput: CreateChatInput
  ): Promise<ChatEntity> {
    return this.chatsService.createChat(createChatInput);
  }

  @ResolveField(() => UserEntity)
  sender(@Parent() chat: ChatEntity): Observable<UserEntity> {
    return this.chatsService.findUserById(chat.senderId);
  }

  @ResolveField(() => UserEntity)
  receiver(@Parent() chat: ChatEntity): Observable<UserEntity> {
    return this.chatsService.findUserById(chat.receiverId);
  }
}
