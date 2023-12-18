import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class PaginationUsersOptionsInput {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;
}
