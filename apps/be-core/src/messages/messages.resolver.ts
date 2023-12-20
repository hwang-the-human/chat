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

@Resolver(() => MessageEntity)
export class MessagesResolver {
  constructor(private chatMessagesService: MessagesService) {}

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
    return this.chatMessagesService.findMyMessages(
      senderId,
      receiverId,
      options
    );
  }

  @Mutation(() => MessageEntity)
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput
  ): Promise<MessageEntity> {
    return this.chatMessagesService.createMessage(createMessageInput);
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
