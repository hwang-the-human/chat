import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class PaginationChatOptionsInput {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;
}
