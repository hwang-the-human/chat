import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { MessageEntity } from '@app/shared/be-messages/entities/message.entity';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';
import { Observable } from 'rxjs';
import { PaginationMessagesResponse } from '@app/shared/be-messages/dto/paginate-messages-response';
import { PaginationMessageOptionsInput } from '@app/shared/be-messages/dto/paginate-messages.input';

@Resolver(() => MessageEntity)
export class MessagesResolver {
  constructor(private chatMessagesService: MessagesService) {}

  @Query(() => PaginationMessagesResponse)
  findMyMessages(
    @Args('senderId')
    senderId: string,
    // @Args('receiverId', { type: () => Int })
    // receiverId: number,
    @Args('options', {
      type: () => PaginationMessageOptionsInput,
      nullable: true,
    })
    options?: PaginationMessageOptionsInput
  ): Promise<PaginationMessagesResponse> {
    return this.chatMessagesService.findMyMessages(
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
