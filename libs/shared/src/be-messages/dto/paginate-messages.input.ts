import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class PaginationMessageOptionsInput {
  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
