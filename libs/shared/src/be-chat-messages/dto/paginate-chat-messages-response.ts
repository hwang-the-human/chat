import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ChatMessageEntity } from '@app/shared/be-chat-messages/entities/chat-message.entity';

@ObjectType()
export class PaginationChatMessagesResponse {
  @Field(() => [ChatMessageEntity])
  items: ChatMessageEntity[];

  @Field(() => Int)
  totalItems: number;
}
