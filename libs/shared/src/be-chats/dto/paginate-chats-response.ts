import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ChatEntity } from '@app/shared/be-chats/entities/chat.entity';

@ObjectType()
export class PaginationChatsResponse {
  @Field(() => [ChatEntity])
  items: ChatEntity[];

  @Field(() => Int)
  totalItems: number;
}
