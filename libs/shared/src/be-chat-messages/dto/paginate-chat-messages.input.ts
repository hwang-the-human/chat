import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class PaginationChatMessageOptionsInput {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;
}
