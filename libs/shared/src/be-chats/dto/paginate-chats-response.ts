import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ChatEntity } from '@app/shared/be-chats/entities/chat.entity';

@ObjectType()
export class PaginationChatResponse {
  @Field(() => [ChatEntity])
  items: ChatEntity[];

  @Field(() => Int)
  totalItems: number;
}
