import { ObjectType, Field, Int } from '@nestjs/graphql';
import { MessageEntity } from '@app/shared/be-messages/entities/message.entity';

@ObjectType()
export class PaginationMessagesResponse {
  @Field(() => [MessageEntity])
  items: MessageEntity[];

  @Field(() => Int)
  totalItems: number;
}
